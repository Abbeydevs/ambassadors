import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, PlusCircle, Edit, Eye } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteBlogPostButton } from "./components/delete-blog-button";

export default async function BlogPostsPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      categories: true,
    },
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Blog Management</h1>
        <Button asChild className="bg-blue-600 hover:bg-blue-700">
          <Link href="/dashboard/blog/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Post
          </Link>
        </Button>
      </div>

      <p className="text-lg text-slate-400">
        Write, edit, and manage all blog posts.
      </p>

      <Card className="bg-slate-900 border-slate-700 text-white">
        <CardHeader>
          <CardTitle>All Posts</CardTitle>
          <CardDescription>{posts.length} post(s) found.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700 hover:bg-slate-800/50">
                <TableHead>Title</TableHead>
                <TableHead className="hidden md:table-cell">
                  Categories
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden lg:table-cell">Views</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.length === 0 ? (
                <TableRow className="border-slate-700">
                  <TableCell colSpan={5} className="text-center text-slate-400">
                    No posts found.
                  </TableCell>
                </TableRow>
              ) : (
                posts.map((post) => (
                  <TableRow
                    key={post.id}
                    className="border-slate-700 hover:bg-slate-800/50"
                  >
                    <TableCell className="font-medium text-white">
                      {post.title}
                    </TableCell>

                    <TableCell className="hidden md:table-cell text-slate-300">
                      {post.categories.map((c) => c.name).join(", ") || "N/A"}
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant={post.published ? "default" : "secondary"}
                        className={
                          post.published
                            ? "bg-green-600/20 text-green-300 border-green-500/30"
                            : "bg-gray-600/20 text-gray-300 border-gray-500/30"
                        }
                      >
                        {post.published ? "Published" : "Draft"}
                      </Badge>
                    </TableCell>

                    <TableCell className="hidden lg:table-cell text-slate-300">
                      <div className="flex items-center gap-1.5">
                        <Eye className="h-4 w-4" /> {post.views}
                      </div>
                    </TableCell>

                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="hover:bg-slate-700"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="bg-slate-900 border-slate-700 text-white"
                        >
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/dashboard/blog/${post.id}/edit`}
                              className="flex items-center"
                            >
                              <Edit className="mr-2 h-4 w-4" /> Edit
                            </Link>
                          </DropdownMenuItem>
                          <DeleteBlogPostButton id={post.id} />
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
