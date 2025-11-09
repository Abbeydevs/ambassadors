"use client";

import { addImageToTalent } from "@/lib/action";
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { Image as PrismaImage } from "@prisma/client";

type UploaderProps = {
  talentId: string;
  onImageAdded: (image: PrismaImage) => void;
};

export function GalleryImageUploader({
  talentId,
  onImageAdded,
}: UploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    let uploadResult;
    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      uploadResult = await response.json();

      if (!uploadResult.success) {
        throw new Error(uploadResult.error || "Upload failed");
      }
    } catch (err) {
      toast.error((err as Error).message);
      setIsUploading(false);
      return;
    }

    try {
      const saveResult = await addImageToTalent(
        talentId,
        uploadResult.url,
        uploadResult.publicId
      );

      if (!saveResult.success || !saveResult.image) {
        throw new Error(saveResult.error || "Failed to save image");
      }

      toast.success("Image added to gallery!");

      onImageAdded(saveResult.image);
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div>
      <input
        title="Upload image gallery"
        type="file"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        disabled={isUploading}
      />
      <Button
        type="button"
        className="w-full"
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading}
      >
        {isUploading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Plus className="mr-2 h-4 w-4" />
        )}
        {isUploading ? "Uploading..." : "Add New Image"}
      </Button>
    </div>
  );
}
