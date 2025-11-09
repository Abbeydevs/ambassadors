"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, X, Loader2 } from "lucide-react";
import Image from "next/image";

type ImageUploaderProps = {
  name: string;
  defaultValue?: string | null;
};

export function ImageUploader({ name, defaultValue }: ImageUploaderProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(defaultValue || null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB");
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file");
      return;
    }

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success && result.url) {
        setImageUrl(result.url);
      } else {
        setError(result.error || "Upload failed");
      }
    } catch (err) {
      setError("An error occurred during upload");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setImageUrl(null);
    setError(null);
  };

  return (
    <div className="space-y-4">
      <input type="hidden" name={name} value={imageUrl || ""} />

      {imageUrl ? (
        <div className="relative">
          <div className="relative w-full h-64 rounded-lg overflow-hidden bg-slate-800">
            <Image src={imageUrl} alt="Preview" fill className="object-cover" />
          </div>
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor={`file-${name}`}
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-slate-700 border-dashed rounded-lg cursor-pointer bg-slate-800 hover:bg-slate-700/50 transition-colors"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                {uploading ? (
                  <>
                    <Loader2 className="w-10 h-10 mb-3 text-slate-400 animate-spin" />
                    <p className="text-sm text-slate-400">Uploading...</p>
                  </>
                ) : (
                  <>
                    <Upload className="w-10 h-10 mb-3 text-slate-400" />
                    <p className="mb-2 text-sm text-slate-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-slate-500">
                      PNG, JPG, GIF up to 5MB
                    </p>
                  </>
                )}
              </div>
              <Input
                id={`file-${name}`}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
                disabled={uploading}
              />
            </label>
          </div>
          {error && (
            <p className="text-sm text-red-400 flex items-center gap-1">
              <X className="h-4 w-4" /> {error}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
