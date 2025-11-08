import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { TalentForm } from "../components/talent-form";

export default async function AddTalentPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Button
          asChild
          variant="outline"
          size="icon"
          className="bg-slate-800 border-slate-700"
        >
          <Link href="/dashboard/talents">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold text-white">Add New Talent</h1>
      </div>

      <TalentForm categories={categories} />
    </div>
  );
}
