"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BlogCategory } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type BlogFiltersProps = {
  categories: BlogCategory[];
};

export function BlogFilters({ categories }: BlogFiltersProps) {
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
        defaultValue={searchParams.get("sort")?.toString() || "newest"}
      >
        <SelectTrigger className="w-full bg-slate-900 border-slate-700">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent className="bg-slate-900 border-slate-700 text-white">
          <SelectItem value="newest">Newest</SelectItem>
          <SelectItem value="oldest">Oldest</SelectItem>
          <SelectItem value="title-asc">Title (A-Z)</SelectItem>
          <SelectItem value="title-desc">Title (Z-A)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
