import { PenSquare, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AdminSidebar } from "@/components/AdminWebSection";
import { useNavigate } from "react-router-dom";

const categories = [
  { name: "Cat" },
  { name: "General" },
  { name: "Inspiration" },
];

export default function AdminCategoryManagementPage() {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar />
      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Category management</h2>
          <Button
            className="px-8 py-2 rounded-full"
            onClick={() => navigate("/admin/category-management/create")}
          >
            <PenSquare className="mr-2 h-4 w-4" /> Create category
          </Button>
        </div>

        <div className="mb-6">
          <Input
            type="text"
            placeholder="Search..."
            className="w-full max-w-md py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground"
          />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-full">Category</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{category.name}</TableCell>
                <TableCell className="text-right flex">
                  <Button variant="ghost" size="sm">
                    <PenSquare className="h-4 w-4 hover:text-muted-foreground" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4 hover:text-muted-foreground" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
    </div>
  );
}
