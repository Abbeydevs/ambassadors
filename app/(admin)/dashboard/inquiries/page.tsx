import { prisma } from "@/lib/prisma";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { InquiryActions } from "./components/inquiry-actions";

export default async function InquiriesPage() {
  const inquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      talent: true,
    },
  });

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }).format(date);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Inquiries</h1>
      </div>

      <p className="text-lg text-slate-400">
        Review and manage all incoming talent and contact inquiries.
      </p>

      <Card className="bg-slate-900 border-slate-700 text-white">
        <CardHeader>
          <CardTitle>All Inquiries</CardTitle>
          <CardDescription>{inquiries.length} total inquiries.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700 hover:bg-slate-800/50">
                <TableHead>Status</TableHead>
                <TableHead>From</TableHead>
                <TableHead className="hidden md:table-cell">Talent</TableHead>
                <TableHead className="hidden lg:table-cell">Received</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inquiries.length === 0 ? (
                <TableRow className="border-slate-700">
                  <TableCell colSpan={5} className="text-center text-slate-400">
                    No inquiries found.
                  </TableCell>
                </TableRow>
              ) : (
                inquiries.map((inquiry) => (
                  <TableRow
                    key={inquiry.id}
                    className="border-slate-700 hover:bg-slate-800/50"
                  >
                    <TableCell>
                      <Badge
                        className={
                          inquiry.status === "new"
                            ? "bg-blue-600/20 text-blue-300 border-blue-500/30"
                            : inquiry.status === "contacted"
                            ? "bg-green-600/20 text-green-300 border-green-500/30"
                            : "bg-gray-600/20 text-gray-300 border-gray-500/30"
                        }
                      >
                        {inquiry.status}
                      </Badge>
                    </TableCell>

                    <TableCell className="font-medium text-white">
                      {inquiry.name}
                      <span className="block text-xs text-slate-400">
                        {inquiry.email}
                      </span>
                    </TableCell>

                    <TableCell className="hidden md:table-cell text-slate-300">
                      {inquiry.talent ? (
                        <Link
                          href={`/dashboard/talents/${inquiry.talent.id}/edit`}
                          className="hover:text-blue-400"
                        >
                          {inquiry.talent.name}
                        </Link>
                      ) : (
                        <span className="text-slate-500">General Inquiry</span>
                      )}
                    </TableCell>

                    <TableCell className="hidden lg:table-cell text-slate-400">
                      {formatDate(inquiry.createdAt)}
                    </TableCell>

                    <TableCell>
                      <InquiryActions inquiry={inquiry} />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
