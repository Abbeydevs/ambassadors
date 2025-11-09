import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
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
import { Eye, MoreHorizontal, PlusCircle, Edit } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteTalentButton } from "./components/delete-button";

export default async function TalentsPage() {
  const talents = await prisma.talent.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      categories: true,
    },
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Talent Management</h1>
        <Button asChild className="bg-blue-600 hover:bg-blue-700">
          <Link href="/dashboard/talents/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Talent
          </Link>
        </Button>
      </div>

      <p className="text-lg text-slate-400">
        Add, edit, and manage all talents on the website.
      </p>

      <Card className="bg-slate-900 border-slate-700 text-white">
        <CardHeader>
          <CardTitle>All Talents</CardTitle>
          <CardDescription>{talents.length} talent(s) found.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700 hover:bg-slate-800/50 text-white">
                <TableHead className="hidden w-20 sm:table-cell text-white">
                  Image
                </TableHead>
                <TableHead className="text-white">Name</TableHead>
                <TableHead className="hidden md:table-cell text-white">
                  Categories
                </TableHead>
                <TableHead className="text-white">Status</TableHead>
                <TableHead className="hidden lg:table-cell text-white">
                  Views
                </TableHead>
                <TableHead className="text-white">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {talents.length === 0 ? (
                <TableRow className="border-slate-700">
                  <TableCell colSpan={6} className="text-center text-slate-400">
                    No talents found.
                  </TableCell>
                </TableRow>
              ) : (
                talents.map((talent) => (
                  <TableRow
                    key={talent.id}
                    className="border-slate-700 hover:bg-slate-800/50"
                  >
                    <TableCell className="hidden sm:table-cell">
                      <div className="relative h-12 w-12 rounded-lg overflow-hidden">
                        <Image
                          src={talent.profileImage || "/placeholder-user.png"}
                          alt={talent.name}
                          layout="fill"
                          objectFit="cover"
                          className="bg-slate-800"
                        />
                      </div>
                    </TableCell>

                    <TableCell className="font-medium text-white">
                      {talent.name}
                    </TableCell>

                    <TableCell className="hidden md:table-cell text-slate-300">
                      {talent.categories.map((c) => c.name).join(", ") || "N/A"}
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant={talent.published ? "default" : "secondary"}
                        className={
                          talent.published
                            ? "bg-green-600/20 text-green-300 border-green-500/30"
                            : "bg-gray-600/20 text-gray-300 border-gray-500/30"
                        }
                      >
                        {talent.published ? "Published" : "Draft"}
                      </Badge>
                    </TableCell>

                    <TableCell className="hidden lg:table-cell text-slate-300">
                      <div className="flex items-center gap-1.5">
                        <Eye className="h-4 w-4" /> {talent.views}
                      </div>
                    </TableCell>

                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="hover:bg-slate-700"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="bg-slate-900 border-slate-700 text-white"
                        >
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/dashboard/talents/${talent.id}/edit`}
                              className="flex items-center"
                            >
                              <Edit className="mr-2 h-4 w-4" /> Edit
                            </Link>
                          </DropdownMenuItem>
                          <DeleteTalentButton id={talent.id} />
                        </DropdownMenuContent>
                      </DropdownMenu>
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
