"use client";

import { deleteInquiry, updateInquiryStatus } from "@/lib/action";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Trash, CheckSquare, Star, Eye } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Inquiry } from "@prisma/client";

export function InquiryActions({ inquiry }: { inquiry: Inquiry }) {
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (status: string) => {
    startTransition(async () => {
      const result = await updateInquiryStatus(inquiry.id, status);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };

  const handleDelete = () => {
    if (!confirm("Are you sure you want to delete this inquiry?")) {
      return;
    }
    startTransition(async () => {
      const result = await deleteInquiry(inquiry.id);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="hover:bg-slate-700">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="bg-slate-900 border-slate-700 text-white"
        >
          <DialogTrigger asChild>
            <DropdownMenuItem
              className="flex items-center"
              onSelect={(e) => e.preventDefault()}
            >
              <Eye className="mr-2 h-4 w-4" /> View Details
            </DropdownMenuItem>
          </DialogTrigger>

          <DropdownMenuSeparator className="bg-slate-700" />

          {inquiry.status !== "contacted" && (
            <DropdownMenuItem
              className="flex items-center"
              onClick={() => handleStatusChange("contacted")}
              disabled={isPending}
            >
              <CheckSquare className="mr-2 h-4 w-4 text-green-400" /> Mark as
              Contacted
            </DropdownMenuItem>
          )}

          {inquiry.status !== "new" && (
            <DropdownMenuItem
              className="flex items-center"
              onClick={() => handleStatusChange("new")}
              disabled={isPending}
            >
              <Star className="mr-2 h-4 w-4 text-blue-400" /> Mark as New
            </DropdownMenuItem>
          )}

          <DropdownMenuSeparator className="bg-slate-700" />

          <DropdownMenuItem
            className="text-red-400 focus:bg-red-900/50 focus:text-red-400 flex items-center"
            onClick={handleDelete}
            disabled={isPending}
          >
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-lg">
        <DialogHeader>
          <DialogTitle>Inquiry from {inquiry.name}</DialogTitle>
          <DialogDescription>
            Received on{" "}
            {new Intl.DateTimeFormat("en-US", {
              dateStyle: "full",
              timeStyle: "short",
            }).format(new Date(inquiry.createdAt))}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4 text-sm">
          <div className="flex">
            <strong className="w-24 text-slate-400">Name:</strong>
            <span className="text-white">{inquiry.name}</span>
          </div>
          <div className="flex">
            <strong className="w-24 text-slate-400">Email:</strong>
            <span className="text-white">{inquiry.email}</span>
          </div>
          {inquiry.phone && (
            <div className="flex">
              <strong className="w-24 text-slate-400">Phone:</strong>
              <span className="text-white">{inquiry.phone}</span>
            </div>
          )}
          {inquiry.company && (
            <div className="flex">
              <strong className="w-24 text-slate-400">Company:</strong>
              <span className="text-white">{inquiry.company}</span>
            </div>
          )}

          <div className="pt-4 border-t border-slate-700">
            <strong className="block mb-2 text-slate-400">Message:</strong>
            <p className="text-white whitespace-pre-wrap">{inquiry.message}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
