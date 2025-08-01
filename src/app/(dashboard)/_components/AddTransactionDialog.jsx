"use client"

import React, { useCallback, useEffect, useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useForm } from 'react-hook-form'
import { CreateTransactionSchema } from '../../../../schema/transaction'
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormDescription, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import CategoryPicker from './CategoryPicker'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CalendarIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import { Loader2 } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CreateTransaction } from '../_actions/transactions'
import { DateToUTCDate } from '@/lib/helpers'
import { toast } from 'sonner'

function AddTransactionDialog({ trigger, walletId }) {
    const form = useForm({
        resolver: zodResolver(CreateTransactionSchema),
        defaultValues: {
            description: "",
            amount: 0,
            date: new Date(),
            category: undefined,
            type: undefined,
            walletId: walletId
        }
    })

    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (walletId) {
            form.setValue("walletId", walletId, { shouldValidate: true });
        }
    }, [walletId, form]);

    const handleCategoryChange = useCallback(
        (category) => {
            form.setValue("category", category.label)
            form.setValue("type", category.type)
        },
        [form]
    )

    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationKey: ["create-transaction", walletId],
        mutationFn: CreateTransaction,
        onSuccess: () => {
            toast.success("Transaction created successfully!", {
                id: "create-transaction"
            })

            form.reset({
                description: "",
                amount: 0,
                date: new Date(),
                category: undefined,
                type: undefined,
                walletId: walletId
            })

            queryClient.invalidateQueries({
                queryKey: ["overview"]
            })

            setOpen((prev) => !prev)
        },
        onError: (error) => {
            toast.error("Failed to create transaction", {
                id: "create-transaction",
                description: error.message
            })
        }
    })

    const onSubmit = useCallback((values) => {
        toast.loading("Creating transaction...", {id: "create-transaction"})
            mutate({
                ...values,
                date: DateToUTCDate(values.date)
            })
    }, [mutate])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
            <DialogTitle>
                Add a new Transaction
            </DialogTitle>
        </DialogHeader>
        <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                {/* Description Field */}
                <FormField 
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormDescription>
                                Transaction description (optional)
                            </FormDescription>
                        </FormItem>
                    )}
                />

                {/* Amount Field */}
                <FormField 
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Amount</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} />
                            </FormControl>
                            <FormDescription>
                                Transaction amount (required)
                            </FormDescription>
                        </FormItem>
                    )}
                />

                <div className="flex items-center justify-between gap-2">
                    
                    {/* Category Field */}
                    <FormField 
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <FormControl>
                                    <CategoryPicker 
                                        value={field.value}
                                        onChange={(category) => {
                                            form.setValue("category", category.label);
                                            form.setValue("type", category.type);
                                        }}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Select a category for this transaction
                                </FormDescription>
                            </FormItem>
                        )}
                    />

                    {/* Date Field */}
                    <FormField 
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Transaction date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    className={cn(
                                                        "w-[200px] pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format (field.value, "PPP")
                                                    ) : (
                                                        <span>Choose a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                initialFocus />
                                        </PopoverContent>
                                    </Popover>
                                <FormDescription>
                                    Select a date for this transaction
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>                
                <DialogFooter>
                    <DialogClose asChild>
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => {
                                form.reset();
                            }}
                        >
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button
                        type="submit"
                        onClick={form.handleSubmit(onSubmit)}
                        disabled={isPending}>
                        {!isPending && "Create"}
                        {isPending && <Loader2 className="animate-spin" />}
                    </Button>
                </DialogFooter>
            </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default AddTransactionDialog
