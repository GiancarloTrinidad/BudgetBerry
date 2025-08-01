"use server";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

// A server action to create two initial wallets for a new user
export async function CreateInitialWallets() {
    const user = await currentUser();
    if (!user) {
        redirect("/");
    }

    // Check if the user already has wallets
    const existingWallets = await prisma.wallet.findMany({
        where: { userId: user.id },
    });

    if (existingWallets.length === 0) {
        // Create two default wallets if none exist
        await prisma.wallet.createMany({
            data: [
                {
                    userId: user.id,
                    name: "Primary Wallet",
                    totalAmount: 0,
                    budget: 0,
                    expense: 0,
                    income: 0,
                },
                {
                    userId: user.id,
                    name: "Savings",
                    totalAmount: 0,
                    budget: 0,
                    expense: 0,
                    income: 0,
                },
            ],
        });
    }
}

// A server action to get all wallets for the current user
export async function getWallets() {
    const user = await currentUser();
    if (!user) {
        redirect("/");
    }

    return await prisma.wallet.findMany({
        where: { userId: user.id },
    });
}
