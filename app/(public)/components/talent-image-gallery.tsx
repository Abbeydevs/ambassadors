"use client";

import { useState } from "react";
import { Image as PrismaImage } from "@prisma/client";
import NextImage from "next/image";
import { X, ArrowLeft, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type GalleryProps = {
  images: PrismaImage[];
};

export function TalentImageGallery({ images }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage === null) return;
    setSelectedImage((selectedImage + 1) % images.length);
  };

  const prevImage = () => {
    if (selectedImage === null) return;
    setSelectedImage((selectedImage - 1 + images.length) % images.length);
  };

  return (
    <Card className="bg-slate-900 border-slate-700 text-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Image Gallery</CardTitle>
      </CardHeader>
      <CardContent>
        {images.length === 0 ? (
          <p className="text-slate-400">No gallery images available.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div
                key={image.id}
                className="relative aspect-square cursor-pointer rounded-lg overflow-hidden group"
                onClick={() => openLightbox(index)}
              >
                <NextImage
                  src={image.url}
                  alt={image.caption || "Gallery image"}
                  layout="fill"
                  objectFit="cover"
                  className="bg-slate-800 transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        )}
      </CardContent>

      {/* --- Lightbox Modal --- */}
      {selectedImage !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <div className="relative max-w-4xl max-h-[90vh]">
            <NextImage
              src={images[selectedImage].url}
              alt={images[selectedImage].caption || "Selected image"}
              width={1920}
              height={1080}
              className="object-contain max-w-full max-h-[90vh] rounded-lg"
            />
          </div>

          <Button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2"
          >
            <X className="h-6 w-6" />
          </Button>

          <Button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/50 rounded-full p-2"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>

          <Button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/50 rounded-full p-2"
          >
            <ArrowRight className="h-6 w-6" />
          </Button>
        </div>
      )}
    </Card>
  );
}
