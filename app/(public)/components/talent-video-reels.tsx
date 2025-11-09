import { Reel as PrismaReel } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ReelsProps = {
  reels: PrismaReel[];
};

export function TalentVideoReels({ reels }: ReelsProps) {
  return (
    <Card className="bg-slate-900 border-slate-700 text-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Video Reels</CardTitle>
      </CardHeader>
      <CardContent>
        {reels.length === 0 ? (
          <p className="text-slate-400">No video reels available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reels.map((reel) => (
              <div key={reel.id} className="space-y-3">
                <div className="relative aspect-video rounded-lg overflow-hidden bg-black border border-slate-700">
                  <video src={reel.url} controls className="w-full h-full">
                    Your browser does not support the video tag.
                  </video>
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {reel.title}
                </h3>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
