"use client";

import { deleteImage } from "@/lib/action";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Image as PrismaImage } from "@prisma/client";
import NextImage from "next/image";
import { Button } from "@/components/ui/button";
import { Loader2, Trash } from "lucide-react";
import { GalleryImageUploader } from "./gallery-image-uploader";
import { useState, useTransition } from "react";
import { toast } from "sonner";

type ImageGalleryManagerProps = {
  talentId: string;
  images: PrismaImage[];
};

export function ImageGalleryManager({
  talentId,
  images,
}: ImageGalleryManagerProps) {
  const [isDeleting, startDeleteTransition] = useTransition();
  const [imagesState, setImagesState] = useState(images);

  const handleImageAdded = (newImage: PrismaImage) => {
    setImagesState((current) => [...current, newImage]);
  };

  const handleDelete = (image: PrismaImage) => {
    setImagesState((current) => current.filter((img) => img.id !== image.id));

    startDeleteTransition(async () => {
      const result = await deleteImage(image.id, image.publicId, talentId);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.error);
        setImagesState(images);
      }
    });
  };

  return (
    <Card className="bg-slate-900 border-slate-700 text-white">
      <CardHeader>
        <CardTitle>Image Gallery</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <GalleryImageUploader
          talentId={talentId}
          onImageAdded={handleImageAdded}
        />

        {imagesState.length === 0 ? (
          <p className="text-slate-400 text-center">No gallery images yet.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {imagesState.map((image) => (
              <div key={image.id} className="relative aspect-square">
                <NextImage
                  src={image.url}
                  alt="Gallery image"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg bg-slate-800"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-1 right-1 h-7 w-7"
                  onClick={() => handleDelete(image)}
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash className="h-4 w-4" />
                  )}
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
