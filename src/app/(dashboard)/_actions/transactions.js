"use server";

import { CreateTransactionSchema } from "@/schema/transaction";

export async function CreateTransaction(form) {
  const parsedBody = CreateTransactionSchema.safeParse(form);

  if (!parsedBody.success) {
    throw new Error(parsedBody.error.message);
  }

}
