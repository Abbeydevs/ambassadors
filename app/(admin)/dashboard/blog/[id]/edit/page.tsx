import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { BlogPostForm } from "../../components/blog-post-form";
import { notFound } from "next/navigation";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const post = await prisma.blogPost.findUnique({
    where: { id },
    include: {
      categories: true,
    },
  });

  const categories = await prisma.blogCategory.findMany({
    orderBy: { name: "asc" },
  });

  if (!post) {
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
          <Link href="/dashboard/blog">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold text-white">Edit Post</h1>
      </div>

      <BlogPostForm categories={categories} post={post} />
    </div>
  );
}
