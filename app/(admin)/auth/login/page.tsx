"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authenticate } from "@/lib/action";
import { LogIn } from "lucide-react";

import { useActionState } from "react";

export default function LoginPage() {
  const [errorMessage, dispatch] = useActionState(authenticate, undefined);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 p-4">
      <Card className="mx-auto w-full max-w-md bg-slate-900 text-white border-slate-700">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">
            Ambassadors Admin
          </CardTitle>
          <CardDescription className="text-slate-400">
            Welcome back. Please log in to continue.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={dispatch} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="admin@example.com"
                required
                className="bg-slate-800 border-slate-700 text-white focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="••••••••"
                required
                className="bg-slate-800 border-slate-700 text-white focus:ring-blue-500"
              />
            </div>

            {errorMessage && (
              <div
                className="flex items-center p-3 text-sm text-red-400 bg-red-900/20 border border-red-400/30 rounded-lg"
                aria-live="polite"
              >
                <p>{errorMessage}</p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
            >
              <LogIn className="mr-2 h-4 w-4" />
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
