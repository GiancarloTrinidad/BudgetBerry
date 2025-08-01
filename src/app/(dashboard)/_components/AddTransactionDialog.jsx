"use client"

import React from 'react'
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

function AddTransactionDialog({ trigger, type }) {
    const form = useForm({
        resolver: zodResolver(CreateTransactionSchema),
        defaultValues: {
            type,
            date: new Date(),
        }
    })

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
            <DialogTitle>
                Add a new Transaction
            </DialogTitle>
        </DialogHeader>
        <Form {...form}>
            <form className="space-y-4">
                {/* Transaction Description */}
                <FormField 
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input defaultValue={""} {...field} />
                            </FormControl>
                            <FormDescription>
                                Transaction description (optional)
                            </FormDescription>
                        </FormItem>
                    )}
                />

                {/* Transaction Amount */}
                <FormField 
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Amount</FormLabel>
                            <FormControl>
                                <Input defaultValue={0} type="number" {...field} />
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
                                    <CategoryPicker type={type} />
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
            </form>
        </Form>
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
                onClick={form.handleSubmit(onSubmit)}
                disabled={isPending}>
                {!isPending && "Create"}
                {isPending && <Loader2 className="animate-spin" />}
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddTransactionDialog
