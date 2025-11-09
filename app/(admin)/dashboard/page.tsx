import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { Users, FileText, MessageSquare, Eye, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default async function DashboardPage() {
  const [
    talentCount,
    publishedPostCount,
    newInquiryCount,
    talentViews,
    recentInquiries,
    topTalents,
  ] = await prisma.$transaction([
    prisma.talent.count(),
    prisma.blogPost.count({ where: { published: true } }),
    prisma.inquiry.count({ where: { status: "new" } }),
    prisma.talent.aggregate({
      _sum: { views: true },
    }),
    prisma.inquiry.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      include: {
        talent: { select: { name: true } },
      },
    }),
    prisma.talent.findMany({
      orderBy: { views: "desc" },
      take: 5,
      select: { id: true, name: true, views: true, slug: true },
    }),
  ]);

  const stats = {
    totalTalents: talentCount,
    totalBlogPosts: publishedPostCount,
    newInquiries: newInquiryCount,
    totalViews: talentViews._sum.views || 0,
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-white">Dashboard</h1>
      <p className="text-lg text-slate-400">
        Welcome back, Admin. Here&apos;s a summary of your agency&apos;s
        activity.
      </p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-slate-900 border-slate-700 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">
              Total Talents
            </CardTitle>
            <Users className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTalents}</div>
            <p className="text-xs text-slate-500">Managed professionals</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-700 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">
              Blog Posts
            </CardTitle>
            <FileText className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalBlogPosts}</div>
            <p className="text-xs text-slate-500">Published articles</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-700 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">
              New Inquiries
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.newInquiries}</div>
            <p className="text-xs text-slate-500">Awaiting response</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-700 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">
              Total Profile Views
            </CardTitle>
            <Eye className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.totalViews.toLocaleString()}
            </div>
            <p className="text-xs text-slate-500">Across all talents</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-slate-900 border-slate-700 text-white">
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Recent Inquiries</CardTitle>
            <Button asChild variant="ghost" size="sm">
              <Link href="/dashboard/inquiries">
                View All <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {recentInquiries.length === 0 ? (
              <p className="text-slate-400">No new inquiries.</p>
            ) : (
              <div className="space-y-4">
                {recentInquiries.map((inquiry) => (
                  <div
                    key={inquiry.id}
                    className="flex items-start justify-between"
                  >
                    <div>
                      <h4 className="font-semibold">{inquiry.name}</h4>
                      <p className="text-sm text-slate-400">
                        {inquiry.talent
                          ? `Inquired about ${inquiry.talent.name}`
                          : "General Inquiry"}
                      </p>
                    </div>
                    <Badge
                      className={
                        inquiry.status === "new"
                          ? "bg-blue-600/20 text-blue-300 border-blue-500/30"
                          : "bg-gray-600/20 text-gray-300 border-gray-500/30"
                      }
                    >
                      {inquiry.status}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-700 text-white">
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Top Talents</CardTitle>
            <Button asChild variant="ghost" size="sm">
              <Link href="/dashboard/talents">
                View All <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {topTalents.length === 0 ? (
              <p className="text-slate-400">No talents found.</p>
            ) : (
              <div className="space-y-4">
                {topTalents.map((talent) => (
                  <div
                    key={talent.id}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <Link
                        href={`/dashboard/talents/${talent.id}/edit`}
                        className="font-semibold hover:text-blue-400"
                      >
                        {talent.name}
                      </Link>
                      <p className="text-sm text-slate-400">
                        /talents/{talent.slug}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <Eye className="h-4 w-4" />
                      {talent.views.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
