import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { AdminSidebar } from "@/components/AdminWebSection";

export default function AdminEditCategoryPage() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar />
      {/* Main content */}
      <main className="flex-1 p-8 bg-gray-50 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Edit Category</h2>
          <Button className="px-8 py-2 rounded-full">Save</Button>
        </div>
        <div className="space-y-7 max-w-md">
          <div className="relative">
            <label
              htmlFor="current-password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category Name
            </label>
            <Input
              id="current-password"
              type="password"
              placeholder="Category name"
              className="mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground"
            />
          </div>
        </div>
        <button className="underline underline-offset-2 hover:text-muted-foreground text-sm font-medium flex items-center gap-1 mt-6">
          <Trash2 className="h-5 w-5" />
          Delete Category
        </button>
      </main>
    </div>
  );
}
