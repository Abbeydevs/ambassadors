"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type TalentFiltersProps = {
  categories: Category[];
};

export function TalentFilters({ categories }: TalentFiltersProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleFilterChange = (type: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value && value !== "all") {
      params.set(type, value);
    } else {
      params.delete(type);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <Select
        onValueChange={(value) => handleFilterChange("category", value)}
        defaultValue={searchParams.get("category")?.toString() || "all"}
      >
        <SelectTrigger className="w-full bg-slate-900 border-slate-700">
          <SelectValue placeholder="Filter by Category" />
        </SelectTrigger>
        <SelectContent className="bg-slate-900 border-slate-700 text-white">
          <SelectItem value="all">All Categories</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.slug}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        onValueChange={(value) => handleFilterChange("sort", value)}
        defaultValue={searchParams.get("sort")?.toString() || "featured"}
      >
        <SelectTrigger className="w-full bg-slate-900 border-slate-700">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent className="bg-slate-900 border-slate-700 text-white">
          <SelectItem value="featured">Featured First</SelectItem>
          <SelectItem value="newest">Newest</SelectItem>
          <SelectItem value="name-asc">Name (A-Z)</SelectItem>
          <SelectItem value="name-desc">Name (Z-A)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
