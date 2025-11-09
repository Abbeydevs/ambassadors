"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Category, Talent } from "@prisma/client";
import { useFormStatus } from "react-dom";
import { useActionState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createTalent, updateTalent } from "@/lib/action";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { ImageUploader } from "@/app/(admin)/components/image-uploader";

type TalentWithCategories = Talent & {
  categories: Category[];
};

type TalentFormProps = {
  categories: Category[];
  talent?: TalentWithCategories;
};

export function TalentForm({ categories, talent }: TalentFormProps) {
  const router = useRouter();

  const isEditMode = !!talent;

  const action = isEditMode ? updateTalent.bind(null, talent.id) : createTalent;

  const [errorMessage, dispatch] = useActionState(action, undefined);

  const talentCategoryIds = new Set(talent?.categories.map((c) => c.id) ?? []);

  useEffect(() => {
    if (errorMessage === undefined) {
      return;
    }
    if (errorMessage && errorMessage.includes("Failed")) {
      toast.error(errorMessage);
      console.error(errorMessage);
    }
  }, [errorMessage, router]);

  return (
    <form
      key={errorMessage}
      action={dispatch}
      className="grid grid-cols-1 lg:grid-cols-3 gap-6"
    >
      <div className="lg:col-span-2 space-y-6">
        <Card className="bg-slate-900 border-slate-700 text-white">
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Talent Name</Label>
              <Input
                id="name"
                name="name"
                required
                placeholder="e.g., Sarah Johnson"
                className="bg-slate-800 border-slate-700"
                defaultValue={talent?.name}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Biography</Label>
              <Textarea
                id="bio"
                name="bio"
                required
                placeholder="Tell us about the talent..."
                className="bg-slate-800 border-slate-700 min-h-[150px]"
                defaultValue={talent?.bio}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-700 text-white">
          <CardHeader>
            <CardTitle>Talent Details</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                name="age"
                type="number"
                placeholder="e.g., 28"
                className="bg-slate-800 border-slate-700"
                defaultValue={talent?.age ?? ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">Height</Label>
              <Input
                id="height"
                name="height"
                placeholder="e.g., 5' 10&quot;"
                className="bg-slate-800 border-slate-700"
                defaultValue={talent?.height ?? ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                placeholder="e.g., Lagos, Nigeria"
                className="bg-slate-800 border-slate-700"
                defaultValue={talent?.location ?? ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="skills">Skills (comma-separated)</Label>
              <Input
                id="skills"
                name="skills"
                placeholder="e.g., Acting, Singing, Stunts"
                className="bg-slate-800 border-slate-700"
                defaultValue={talent?.skills.join(", ") ?? ""}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-700 text-white">
          <CardHeader>
            <CardTitle>Contact Info (Optional)</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="e.g., sarah@example.com"
                className="bg-slate-800 border-slate-700"
                defaultValue={talent?.email ?? ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                placeholder="e.g., +234..."
                className="bg-slate-800 border-slate-700"
                defaultValue={talent?.phone ?? ""}
              />
            </div>
          </CardContent>
        </Card>

        {errorMessage && (
          <div className="p-4 bg-red-900/20 border border-red-400/30 rounded-lg text-red-400">
            <p>{errorMessage}</p>
          </div>
        )}
      </div>

      <div className="lg:col-span-1 space-y-6">
        <Card className="bg-slate-900 border-slate-700 text-white">
          <CardHeader>
            <CardTitle>Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <SubmitButton isEditMode={isEditMode} />
          </CardContent>
          <CardFooter>
            <div className="flex items-center space-x-2 mb-4">
              <Switch
                id="featured"
                name="featured"
                defaultChecked={talent?.featured ?? false}
              />
              <Label htmlFor="featured">Feature on homepage</Label>
            </div>
          </CardFooter>
        </Card>

        <Card className="bg-slate-900 border-slate-700 text-white">
          <CardHeader>
            <CardTitle>Profile Image</CardTitle>
          </CardHeader>
          <CardContent>
            <ImageUploader
              name="profileImage"
              defaultValue={talent?.profileImage}
            />
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-700 text-white">
          <CardHeader>
            <CardTitle>Categories</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {categories.length === 0 ? (
              <p className="text-slate-400 text-sm">
                No categories found. Please add some in the
                &quot;Categories&quot; section.
              </p>
            ) : (
              categories.map((category) => (
                <div key={category.id} className="flex items-center gap-2">
                  <Checkbox
                    id={category.id}
                    name="categoryIds"
                    value={category.id}
                    className="border-slate-500"
                    defaultChecked={talentCategoryIds.has(category.id)}
                  />
                  <Label htmlFor={category.id} className="font-normal">
                    {category.name}
                  </Label>
                </div>
              ))
            )}
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
          ? "Updating Talent..."
          : "Creating Talent..."
        : isEditMode
        ? "Save Changes"
        : "Create Talent"}
    </Button>
  );
}
