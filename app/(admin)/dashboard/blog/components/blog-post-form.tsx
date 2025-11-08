"use client";

import type { BlogCategory, BlogPost } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { RichTextEditor } from "./editor";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { createBlogPost, updateBlogPost } from "@/lib/action";

type PostWithCategories = BlogPost & {
  categories: BlogCategory[];
};

type BlogPostFormProps = {
  categories: BlogCategory[];
  post?: PostWithCategories;
};

export function BlogPostForm({ categories, post }: BlogPostFormProps) {
  const isEditMode = !!post;

  const action = isEditMode
    ? updateBlogPost.bind(null, post.id)
    : createBlogPost;
  const [errorMessage, dispatch] = useActionState(action, undefined);

  const [content, setContent] = useState(
    post?.content || "<p>Start writing your post...</p>"
  );

  const postCategoryIds = new Set(post?.categories.map((c) => c.id) ?? []);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [errorMessage]);

  return (
    <form action={dispatch} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Card className="bg-slate-900 border-slate-700 text-white">
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Post Title</Label>
              <Input
                id="title"
                name="title"
                required
                placeholder="e.g., 10 Tips for Your Next Audition"
                className="bg-slate-800 border-slate-700 text-2xl font-bold h-12"
                defaultValue={post?.title}
              />
            </div>

            <input type="hidden" name="content" value={content} />

            <div className="space-y-2">
              <Label>Post Content</Label>
              <RichTextEditor content={content} onChange={setContent} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-700 text-white">
          <CardHeader>
            <CardTitle>Excerpt</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              id="excerpt"
              name="excerpt"
              placeholder="A short summary of the post..."
              className="bg-slate-800 border-slate-700"
              defaultValue={post?.excerpt ?? ""}
            />
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-1 space-y-6">
        <Card className="bg-slate-900 border-slate-700 text-white">
          <CardHeader>
            <CardTitle>Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="published"
                name="published"
                defaultChecked={post?.published ?? false}
              />
              <Label htmlFor="published">Publish Post</Label>
            </div>
            <SubmitButton isEditMode={isEditMode} />
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-700 text-white">
          <CardHeader>
            <CardTitle>Post Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="author">Author Name</Label>
              <Input
                id="author"
                name="author"
                defaultValue={post?.author ?? "Admin"}
                className="bg-slate-800 border-slate-700"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="featuredImage">Featured Image URL</Label>
              <Input
                id="featuredImage"
                name="featuredImage"
                placeholder="https://... (Temporary)"
                className="bg-slate-800 border-slate-700"
                defaultValue={post?.featuredImage ?? ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input
                id="tags"
                name="tags"
                placeholder="e.g., Acting, Career, Tips"
                className="bg-slate-800 border-slate-700"
                defaultValue={post?.tags.join(", ") ?? ""}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-700 text-white">
          <CardHeader>
            <CardTitle>Categories</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 max-h-60 overflow-y-auto">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center gap-2">
                <Checkbox
                  id={category.id}
                  name="categoryIds"
                  value={category.id}
                  className="border-slate-500"
                  defaultChecked={postCategoryIds.has(category.id)}
                />
                <Label htmlFor={category.id} className="font-normal">
                  {category.name}
                </Label>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </form>
  );
}

function SubmitButton({ isEditMode }: { isEditMode: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full bg-blue-600 hover:bg-blue-700"
    >
      {pending
        ? isEditMode
          ? "Saving Changes..."
          : "Creating Post..."
        : isEditMode
        ? "Save Changes"
        : "Create Post"}
    </Button>
  );
}
