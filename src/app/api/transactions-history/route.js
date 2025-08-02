import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(request) {
  const user = await currentUser();
  if (!user) {
    redirect("/");
  }

  const { searchParams } = new URL(request.url);
  const walletId = searchParams.get("walletId");

  if (!walletId) {
    return NextResponse.json({ error: "Missing walletId" }, { status: 400 });
  }

  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId: user.id,
        walletId,
      },
      orderBy: {
        date: "desc",
      },
    });

    return NextResponse.json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}