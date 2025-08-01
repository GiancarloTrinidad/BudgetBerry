"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { CreateTransactionSchema } from "../../../../schema/transaction";
import { currentUser } from "@clerk/nextjs/server";

export async function CreateTransaction(form) {
  const parsedBody = CreateTransactionSchema.safeParse(form)

  if (!parsedBody.success) {
    throw new Error(parsedBody.error.message)
  }

  const user = await currentUser()
  if (!user) {
    redirect("/")
  }

  const { amount, category, date, description, type } = parsedBody.data
  const categoryRow = await prisma.category.findFirst({
    where: {
      userId: user.id,
      name: category
    }
  })

  if (!categoryRow) {
    throw new Error("category not found")
  }

  const [incomeSum, expenseSum] = await Promise.all([
    prisma.transaction.aggregate({
      where: {userId: user.id, type: "income"},
      _sum: {amount: true}
    }),
    prisma.transaction.aggregate({
      where: {userId: user.id, type: "expense"},
      _sum: {amount: true}
    }),
  ])

  const totalAmount = (incomeSum._sum.amount || 0) - (expenseSum._sum.amount || 0)

  await prisma.$transaction([
    prisma.transaction.create({
      data: {
        userId: user.id,
        amount,
        date,
        description: description || "",
        type,
        category: categoryRow.name
      }
    }),

    // Update Wallet
    prisma.wallet.upsert({
      where: {
        total_budget_userId: {
          userId: user.id,
          // totalAmount: ,
          // budget: 
        }
      },
      create: {
        userId: user.id,
        totalAmount,
        budget: 0,
        expense: type === "expense" ? amount : 0,
        income: type === "income" ? amount : 0
      },
      update: {
        totalAmount,
        expense: {
          increment: type === "expense" ? amount : 0,
        },
        income: {
          increment: type === "income" ? amount : 0
        }
      }
    })
  ])
}
