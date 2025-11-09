"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Menu, UserCircle } from "lucide-react";
import { useState } from "react";
import { AdminSidebarNav } from "./sidebar-nav";
import { signOut } from "next-auth/react";

export function AdminHeader({
  sessionUser,
}: {
  sessionUser: { name?: string | null; email?: string | null };
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-slate-700 bg-slate-900 px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 sm:py-4">
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild>
          <Button
            size="icon"
            variant="outline"
            className="sm:hidden bg-slate-800 border-slate-700"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="sm:max-w-xs bg-slate-950 border-slate-800 text-white"
        >
          <div className="flex items-center gap-2 h-14 px-4 border-b border-slate-700 mb-4">
            <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center font-bold text-white text-lg">
              A
            </div>
            <span className="text-xl font-bold text-white">Ambassadors</span>
          </div>
          <AdminSidebarNav onLinkClick={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>

      <div className="flex-1"></div>

      <div className="ml-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="overflow-hidden rounded-full bg-slate-800 border-slate-700"
            >
              <UserCircle className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-slate-900 border-slate-700 text-white"
          >
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {sessionUser?.name ?? "Admin"}
                </p>
                <p className="text-xs leading-none text-slate-400">
                  {sessionUser?.email ?? "No email"}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-700" />
            <DropdownMenuItem
              className="flex items-center w-full px-2 py-1.5 text-sm rounded-sm hover:bg-slate-800 cursor-pointer"
              onSelect={(e) => e.preventDefault()}
              onClick={() => signOut({ redirectTo: "/auth/login" })}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
