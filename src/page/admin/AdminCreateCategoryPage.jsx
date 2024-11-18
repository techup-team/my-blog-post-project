import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AdminSidebar } from "@/components/AdminWebSection";
import axios from "axios";
import { toast } from "sonner";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminCreateCategoryPage() {
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState(""); // To hold category name input
  const [isSaving, setIsSaving] = useState(false); // To manage saving state
  const [errorMessage, setErrorMessage] = useState("");

  const handleSave = async () => {
    if (!categoryName) {
      // Handle validation for empty category name
      setErrorMessage("Category name is required.");
      return;
    }

    setIsSaving(true);

    try {
      // Send POST request to create the category
      await axios.post(
        "https://blog-post-project-api-with-db.vercel.app/categories",
        {
          name: categoryName,
        }
      );

      // Show success toast
      toast.custom((t) => (
        <div className="bg-green-500 text-white p-4 rounded-sm flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg mb-1">
              Created category successfully
            </h2>
            <p className="text-sm">
              Your category has been successfully created.
            </p>
          </div>
          <button
            onClick={() => toast.dismiss(t)}
            className="text-white hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
      ));

      // Optionally reset the form and show a success message
      setCategoryName(""); // Clear the input after saving
      navigate("/admin/category-management");
    } catch {
      toast.custom((t) => (
        <div className="bg-red-500 text-white p-4 rounded-sm flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg mb-1">
              Failed to create category
            </h2>
            <p className="text-sm">
              Something went wrong while creating the category. Please try again
              later.
            </p>
          </div>
          <button
            onClick={() => toast.dismiss(t)}
            className="text-white hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
      ));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar />
      {/* Main content */}
      <main className="flex-1 p-8 bg-gray-50 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Create Category</h2>
          <Button
            className="px-8 py-2 rounded-full"
            onClick={handleSave} // Trigger the save function when clicked
            disabled={isSaving} // Disable button while saving
          >
            Save
          </Button>
        </div>
        <div className="space-y-7 max-w-md">
          <div className="relative space-y-1">
            <label
              htmlFor="category-name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category Name
            </label>
            <Input
              id="category-name"
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)} // Bind input value to state
              placeholder="Category name"
              className={`mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground ${
                errorMessage ? "border-red-500" : ""
              }`}
            />
            {errorMessage && (
              <p className="text-red-500 text-xs absolute">{errorMessage}</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
