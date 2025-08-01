"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { CreateTransactionSchema } from "../../../../schema/transaction";
import { currentUser } from "@clerk/nextjs/server";

export async function CreateTransaction(form) {
    const parsedBody = CreateTransactionSchema.safeParse(form);

    if (!parsedBody.success) {
        throw new Error(parsedBody.error.message);
    }

    const user = await currentUser();
    if (!user) {
        redirect("/");
    }

    const { amount, category, date, description, type, walletId } = parsedBody.data;

    if (!walletId) {
        throw new Error("Wallet ID is missing from the transaction data.");
    }

    await prisma.$transaction(async (tx) => {
        await tx.transaction.create({
            data: {
                userId: user.id,
                amount,
                date,
                description: description || "",
                type,
                category: category,
                wallet: {
                    connect: {
                        id: walletId
                    }
                }
            }
        });

        await tx.wallet.update({
            where: {
                id: walletId,
            },
            data: {
                totalAmount: {
                    increment: type === 'income' ? amount : -amount,
                },
                expense: {
                    increment: type === "expense" ? amount : 0,
                },
                income: {
                    increment: type === "income" ? amount : 0,
                }
            }
        });
    });
}
