"use client";

import { addReelToTalent, deleteReel } from "@/lib/action";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Reel as PrismaReel } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Plus, Trash, Video } from "lucide-react";
import { useState, useTransition, useRef } from "react";
import { toast } from "sonner";

type ReelManagerProps = {
  talentId: string;
  reels: PrismaReel[];
};

export function VideoReelManager({ talentId, reels }: ReelManagerProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, startDeleteTransition] = useTransition();
  const [reelTitle, setReelTitle] = useState("");
  const [optimisticReels, setOptimisticReels] = useState(reels);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!reelTitle.trim()) {
      toast.error("Please enter a title for the reel first.");
      return;
    }

    setIsUploading(true);
    let uploadResult;

    try {
      const formData = new FormData();
      formData.append("file", file);
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
      const saveResult = await addReelToTalent(
        talentId,
        reelTitle,
        uploadResult.url,
        uploadResult.publicId
      );

      if (!saveResult.success || !saveResult.reel) {
        throw new Error(saveResult.error || "Failed to save reel");
      }

      setOptimisticReels((current) => [...current, saveResult.reel!]);
      toast.success("Reel added successfully!");
      setReelTitle("");
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDelete = (reel: PrismaReel) => {
    setOptimisticReels((current) => current.filter((r) => r.id !== reel.id));

    startDeleteTransition(async () => {
      const result = await deleteReel(reel.id, reel.publicId, talentId);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.error);
        setOptimisticReels(reels);
      }
    });
  };

  return (
    <Card className="bg-slate-900 border-slate-700 text-white">
      <CardHeader>
        <CardTitle>Video Reels</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Enter reel title..."
            className="bg-slate-800 border-slate-700"
            value={reelTitle}
            onChange={(e) => setReelTitle(e.target.value)}
            disabled={isUploading}
          />
          <input
            title="upload reel"
            type="file"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="video/*"
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
            {isUploading ? "Uploading Video..." : "Upload Video Reel"}
          </Button>
        </div>

        <div className="space-y-4">
          {optimisticReels.length === 0 ? (
            <p className="text-slate-400 text-center">No video reels yet.</p>
          ) : (
            optimisticReels.map((reel) => (
              <div
                key={reel.id}
                className="flex items-center justify-between gap-4 rounded-lg bg-slate-800 p-3"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <Video className="h-5 w-5 text-blue-400 shrink-0" />
                  <p className="truncate font-medium">{reel.title}</p>
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="h-8 w-8 shrink-0"
                  onClick={() => handleDelete(reel)}
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash className="h-4 w-4" />
                  )}
                </Button>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
