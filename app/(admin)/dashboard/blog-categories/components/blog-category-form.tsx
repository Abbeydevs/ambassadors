"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createBlogCategory } from "@/lib/action";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

export function BlogCategoryForm() {
  const [errorMessage, dispatch] = useActionState(
    createBlogCategory,
    undefined
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (errorMessage && !errorMessage.includes("successfully")) {
      toast.error(errorMessage);
    } else if (errorMessage?.includes("successfully")) {
      toast.success("Blog category created!");
      formRef.current?.reset();
    }
  }, [errorMessage]);

  return (
    <form ref={formRef} action={dispatch} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Category Name</Label>
        <Input
          id="name"
          name="name"
          required
          className="bg-slate-800 border-slate-700 text-white focus:ring-blue-500"
        />
      </div>
      {errorMessage && !errorMessage.includes("successfully") && (
        <p className="text-sm text-red-400">{errorMessage}</p>
      )}
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full bg-blue-600 hover:bg-blue-700"
    >
      {pending ? "Creating..." : "Create Category"}
    </Button>
  );
}
