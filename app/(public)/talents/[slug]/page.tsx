import { prisma } from "@/lib/prisma";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Mail, Phone, MapPin, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { InquiryForm } from "../../components/inquiry-form";
import { TalentImageGallery } from "../../components/talent-image-gallery";
import { TalentVideoReels } from "../../components/talent-video-reels";
import { ViewIncrementer } from "../../components/view-incrementer";
import { incrementTalentView } from "@/lib/action";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const talent = await prisma.talent.findUnique({
    where: { slug: params.slug },
  });

  if (!talent) {
    return {
      title: "Talent Not Found",
      description: "This talent profile could not be found.",
    };
  }

  return {
    title: `${talent.name} - Talent Profile`,
    description: talent.bio.substring(0, 160),
    openGraph: {
      title: talent.name,
      description: talent.bio.substring(0, 160),
      images: [talent.profileImage],
    },
  };
}

export default async function TalentProfilePage({
  params,
}: {
  params: { slug: string };
}) {
  const talent = await prisma.talent.findUnique({
    where: {
      slug: params.slug,
      published: true,
    },
    include: {
      categories: true,
      images: { orderBy: { order: "asc" } },
      reels: { orderBy: { order: "asc" } },
    },
  });

  if (!talent) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <main>
        <ViewIncrementer
          incrementAction={incrementTalentView}
          entityId={talent.id}
        />
        <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-24 bg-slate-900 overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-blue-950/50 via-slate-900 to-slate-900" />
          <Image
            src={talent.profileImage}
            alt={talent.name}
            layout="fill"
            objectFit="cover"
            className="absolute inset-0 opacity-10 blur-md scale-110"
          />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-1">
                <div className="relative aspect-3/4 rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/20 border-2 border-blue-500/30">
                  <Image
                    src={talent.profileImage}
                    alt={talent.name}
                    layout="fill"
                    objectFit="cover"
                    priority
                  />
                </div>
              </div>

              <div className="md:col-span-2 space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white">
                  {talent.name}
                </h1>
                <div className="flex flex-wrap gap-2">
                  {talent.categories.map((category) => (
                    <Badge
                      key={category.id}
                      className="bg-blue-600/20 text-blue-300 border-blue-500/30"
                    >
                      {category.name}
                    </Badge>
                  ))}
                </div>
                <p className="text-lg text-slate-300 max-w-2xl">{talent.bio}</p>
                <div className="flex flex-wrap gap-4 pt-4">
                  {talent.location && (
                    <div className="flex items-center gap-2 text-slate-400">
                      <MapPin className="h-4 w-4 text-blue-400" />
                      {talent.location}
                    </div>
                  )}
                  {talent.email && (
                    <div className="flex items-center gap-2 text-slate-400">
                      <Mail className="h-4 w-4 text-blue-400" />
                      {talent.email}
                    </div>
                  )}
                  {talent.phone && (
                    <div className="flex items-center gap-2 text-slate-400">
                      <Phone className="h-4 w-4 text-blue-400" />
                      {talent.phone}
                    </div>
                  )}
                </div>
                {/* Social links will go here later */}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              <div className="lg:col-span-2 space-y-12">
                <Card className="bg-slate-900 border-slate-700 text-white">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                      {talent.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="outline"
                          className="bg-slate-800 border-slate-700 text-slate-300"
                        >
                          <Check className="h-3 w-3 mr-1.5 text-green-400" />
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {talent.experience && (
                  <Card className="bg-slate-900 border-slate-700 text-white">
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-bold mb-4">Experience</h2>
                      <div className="text-slate-300 space-y-4">
                        {talent.experience}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {talent.awards && (
                  <Card className="bg-slate-900 border-slate-700 text-white">
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-bold mb-4">Awards</h2>
                      <div className="text-slate-300 space-y-4">
                        {talent.awards}
                      </div>
                    </CardContent>
                  </Card>
                )}

                <TalentImageGallery images={talent.images} />

                <TalentVideoReels reels={talent.reels} />
              </div>

              <InquiryForm talentId={talent.id} talentName={talent.name} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
