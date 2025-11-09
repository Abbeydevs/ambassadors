import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { TalentForm } from "../../components/talent-form";
import { ImageGalleryManager } from "../../components/image-gallery-manager";
import { VideoReelManager } from "../../components/video-reel-manager";

export default async function EditTalentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const talent = await prisma.talent.findUnique({
    where: { id },
    include: {
      categories: true,
      images: { orderBy: { order: "asc" } },
      reels: { orderBy: { order: "asc" } },
    },
  });

  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  if (!talent) {
    notFound();
  }

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
        <h1 className="text-3xl font-bold text-white">Edit: {talent.name}</h1>
      </div>

      <TalentForm categories={categories} talent={talent} />

      <ImageGalleryManager talentId={talent.id} images={talent.images} />

      <VideoReelManager talentId={talent.id} reels={talent.reels} />
    </div>
  );
}
