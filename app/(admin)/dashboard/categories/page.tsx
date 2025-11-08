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
import { CategoryForm } from "./components/category-form";
import { DeleteCategoryButton } from "./components/delete-button";

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-white">Talent Categories</h1>
      <p className="text-lg text-slate-400">
        Manage the categories for organizing talents (e.g., Actor, Musician).
      </p>

      {/* Grid for Form and List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* --- Column 1: Add New Category Form --- */}
        <div className="md:col-span-1">
          <Card className="bg-slate-900 border-slate-700 text-white">
            <CardHeader>
              <CardTitle>Add New Category</CardTitle>
              <CardDescription>Create a new category.</CardDescription>
            </CardHeader>
            <CardContent>
              <CategoryForm />
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card className="bg-slate-900 border-slate-700 text-white">
            <CardHeader>
              <CardTitle>Existing Categories</CardTitle>
              <CardDescription>
                {categories.length} categorie(s) found.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700 hover:bg-slate-800/50">
                    <TableHead>Name</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.length === 0 ? (
                    <TableRow className="border-slate-700">
                      <TableCell
                        colSpan={3}
                        className="text-center text-slate-400"
                      >
                        No categories found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    categories.map((category) => (
                      <TableRow
                        key={category.id}
                        className="border-slate-700 hover:bg-slate-800/50"
                      >
                        <TableCell className="font-medium text-white">
                          {category.name}
                        </TableCell>
                        <TableCell className="text-slate-400">
                          {category.slug}
                        </TableCell>
                        <TableCell className="text-right">
                          <DeleteCategoryButton id={category.id} />
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
