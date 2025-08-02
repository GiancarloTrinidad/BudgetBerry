"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios"; // <--- uncomment this

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

function TransactionTable({ walletId }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["transactions", walletId],
    queryFn: async () => {
      const res = await axios.get(`/api/transactions-history?walletId=${walletId}`);
      return res.data;
    },
    enabled: !!walletId,
  });

  if (isLoading) {
    return <p className="mt-6 text-muted-foreground">Loading transactions...</p>;
  }

  if (isError) {
    return <p className="mt-6 ml-24 text-destructive">Failed to load transactions.</p>;
  }

  if (!data || data.length === 0) {
    return <p className="mt-6 ml-24 text-muted-foreground">No transactions found for this wallet.</p>;
  }

  return (
    <div className="mt-6 rounded-md border ml-20">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((txn) => (
            <TableRow key={txn.id}>
              <TableCell>{new Date(txn.date).toLocaleDateString()}</TableCell>
              <TableCell>₱{txn.amount.toFixed(2)}</TableCell>
              <TableCell>{txn.description}</TableCell>
              <TableCell>{txn.category}</TableCell>
              <TableCell>{txn.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default TransactionTable;
