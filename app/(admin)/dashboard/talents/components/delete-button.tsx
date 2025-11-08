"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { deleteTalent } from "@/lib/action";
import { Trash } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

export function DeleteTalentButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm("Are you sure you want to delete this talent?")) {
      return;
    }

    startTransition(async () => {
      const result = await deleteTalent(id);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <DropdownMenuItem
      className="text-red-400 focus:bg-red-900/50 focus:text-red-400 flex items-center"
      onClick={handleDelete}
      disabled={isPending}
      onSelect={(e) => e.preventDefault()}
    >
      <Trash className="mr-2 h-4 w-4" />
      <span>{isPending ? "Deleting..." : "Delete"}</span>
    </DropdownMenuItem>
  );
}
