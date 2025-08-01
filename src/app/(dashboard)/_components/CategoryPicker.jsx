'use client';

import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandGroup,
  CommandList,
  CommandItem
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import {
  ShoppingCart,
  Utensils,
  Pill,
  Send,
  Plug,
  Banknote,
  HandCoins,
  DollarSign,
  Heart,
  ChevronsUpDown
} from 'lucide-react';
import { cn } from '@/lib/utils';

const expenseCategories = [
  { label: 'Groceries', icon: <ShoppingCart className="w-4 h-4 mr-2" />, type: 'expense' },
  { label: 'Food and Drinks', icon: <Utensils className="w-4 h-4 mr-2" />, type: 'expense' },
  { label: 'Medicine', icon: <Pill className="w-4 h-4 mr-2" />, type: 'expense' },
  { label: 'Fun Money', icon: <Heart className="w-4 h-4 mr-2" />, type: 'expense' },
  { label: 'Send Money', icon: <Send className="w-4 h-4 mr-2" />, type: 'expense' },
  { label: 'Utilities', icon: <Plug className="w-4 h-4 mr-2" />, type: 'expense' }
];

const incomeCategories = [
  { label: 'Incoming Transfer', icon: <Banknote className="w-4 h-4 mr-2" />, type: 'income' },
  { label: 'Loan', icon: <HandCoins className="w-4 h-4 mr-2" />, type: 'income' },
  { label: 'Other Income', icon: <DollarSign className="w-4 h-4 mr-2" />, type: 'income' }
];

const allCategories = [...expenseCategories, ...incomeCategories];

function CategoryPicker({ value, onChange }) {
  const [open, setOpen] = useState(false);
  // const [value, setValue] = useState('');

  // useEffect(() => {
  //   if (!value) return;
  //   // If value changes, call onChange callback
  //   onChange(value)
  // }, [onChange, value])

    // Find the selected category object using the 'value' prop
  const selectedCategory = allCategories.find((cat) => cat.label === value);

  const handleSelect = useCallback((category) => {
    onChange(category)
    setOpen(false)
  }, [onChange])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-[220px] justify-between",
            !selectedCategory && "text-muted-foreground"
          )}
        >
          {selectedCategory ? (
            <CategoryRow category={selectedCategory} />
          ) : (
            'Select category'
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[220px] p-0">
        <Command onSubmit={(e) => e.preventDefault()}>
          <CommandInput placeholder="Search category..." />
          <CommandEmpty>
            <p>Category not found</p>
          </CommandEmpty>

          <CommandGroup heading="Expenses">
            <CommandList>
              {expenseCategories.map((item) => (
                <CommandItem
                  key={item.label}
                  value={item.label}
                  onSelect={() => handleSelect(item)}
                  className="flex items-center"
                >
                  {item.icon}
                  {item.label}
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>

          <CommandGroup heading="Incomes">
            <CommandList>
              {incomeCategories.map((item) => (
                <CommandItem
                  key={item.label}
                  value={item.label}
                  onSelect={() => handleSelect(item)}
                  className="flex items-center"
                >
                  {item.icon}
                  {item.label}
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default CategoryPicker;

function CategoryRow({ category }) {
  return (
    <div className="flex items-center gap-2">
      {category.icon}
      <span>{category.label}</span>
    </div>
  );
}
