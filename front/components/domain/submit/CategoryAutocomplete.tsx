"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { chosungIncludes } from "@/lib/chosung";

// 초성 검색이 가능한 카테고리 선택 컴포넌트입니다.
const CATEGORIES = [
  { value: "cosmetics", label: "화장품" },
  { value: "electronics", label: "전자기기" },
  { value: "fashion", label: "패션/의류" },
  { value: "food", label: "식품" },
  { value: "furniture", label: "가구/인테리어" },
  { value: "health", label: "건강/의료" },
  { value: "travel", label: "여행/레저" },
  { value: "education", label: "교육" },
];

interface CategoryAutocompleteProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function CategoryAutocomplete({ value, onValueChange }: CategoryAutocompleteProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const filteredCategories = React.useMemo(() => {
    if (!search) return CATEGORIES;
    return CATEGORIES.filter((category) =>
      chosungIncludes(category.label, search)
    );
  }, [search]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? CATEGORIES.find((category) => category.value === value)?.label
            : "카테고리를 선택하세요..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command>
          <CommandInput
            placeholder="카테고리 검색 (초성 가능)..."
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
            <CommandGroup>
              {filteredCategories.map((category) => (
                <CommandItem
                  key={category.value}
                  value={category.label} // 검색을 위해 label을 사용합니다.
                  onSelect={() => {
                    onValueChange(category.value === value ? "" : category.value);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === category.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {category.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
