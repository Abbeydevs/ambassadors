// app/(public)/components/inquiry-form.tsx
"use client";

import { submitInquiry } from "@/lib/action";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

type InquiryFormProps = {
  talentId: string;
  talentName: string;
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full bg-blue-600 hover:bg-blue-700"
    >
      {pending ? "Sending..." : "Send Inquiry"}
    </Button>
  );
}

export function InquiryForm({ talentId, talentName }: InquiryFormProps) {
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
      <Card className="bg-slate-900 border-slate-700 text-white">
        <CardContent className="p-6 text-center space-y-4">
          <div className="text-green-400">
            <svg
              className="w-16 h-16 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold">Thank You!</h2>
          <p className="text-slate-300">
            Your inquiry about {talentName} has been sent. We will get back to
            you shortly.
          </p>
          <Button
            onClick={() => setIsSuccess(false)}
            variant="outline"
            className="bg-slate-800 border-slate-700"
          >
            Send Another Inquiry
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-slate-900 border-slate-700 text-white">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Hire {talentName}
        </h2>
        <form ref={formRef} action={dispatch} className="space-y-4">
          <input type="hidden" name="talentId" value={talentId} />

          <div className="space-y-2">
            <Label htmlFor="name">Your Name</Label>
            <Input
              id="name"
              name="name"
              required
              className="bg-slate-800 border-slate-700"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Your Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              className="bg-slate-800 border-slate-700"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Company (Optional)</Label>
            <Input
              id="company"
              name="company"
              className="bg-slate-800 border-slate-700"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              required
              className="bg-slate-800 border-slate-700"
            />
          </div>
          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
}
