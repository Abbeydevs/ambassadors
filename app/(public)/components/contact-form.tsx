"use client";

import { submitInquiry } from "@/lib/action";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6"
    >
      {pending ? "Sending..." : "Send Message"}
    </Button>
  );
}

export function ContactForm() {
  const [state, dispatch] = useActionState(submitInquiry, undefined);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (state?.includes("Success")) {
      toast.success(state);
      formRef.current?.reset();
      setIsSuccess(true);
    } else if (state) {
      toast.error(state);
      setIsSuccess(false);
    }
  }, [state]);

  if (isSuccess) {
    return (
      <div className="text-center space-y-4 p-8 border border-green-500/30 bg-green-900/20 rounded-lg">
        <CheckCircle2 className="w-16 h-16 mx-auto text-green-400" />
        <h2 className="text-3xl font-bold">Thank You!</h2>
        <p className="text-slate-300 text-lg">
          Your message has been sent. We will get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} action={dispatch} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Your Name</Label>
          <Input
            id="name"
            name="name"
            required
            className="bg-slate-800 border-slate-700 h-12"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Your Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            className="bg-slate-800 border-slate-700 h-12"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone (Optional)</Label>
        <Input
          id="phone"
          name="phone"
          className="bg-slate-800 border-slate-700 h-12"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          required
          className="bg-slate-800 border-slate-700 min-h-[150px]"
        />
      </div>
      <SubmitButton />
    </form>
  );
}
