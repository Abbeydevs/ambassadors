"use client";

import { Button } from "@/components/ui/button";
import { deleteBlogCategory } from "@/lib/action";
import { Trash } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

export function DeleteBlogCategoryButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm("Are you sure you want to delete this blog category?")) {
      return;
    }

    startTransition(async () => {
      const result = await deleteBlogCategory(id);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleDelete}
      disabled={isPending}
      className="text-red-400 hover:text-red-400 hover:bg-red-900/50"
    >
      <Trash className="h-4 w-4" />
    </Button>
  );
}
