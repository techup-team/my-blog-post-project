import { ImageIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AdminSidebar } from "@/components/AdminWebSection";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/authentication";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export default function AdminCreateArticlePage() {
  const { state } = useAuth();
  const navigate = useNavigate();
  const [post, setPost] = useState({
    image: "",
    category_id: null,
    title: "",
    description: "",
    date: null,
    content: "",
    status_id: null,
  }); // Store the fetched post data
  const [isLoading, setIsLoading] = useState(null);
  const [isSaving, setIsSaving] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const responseCategories = await axios.get(
          "https://blog-post-project-api-with-db.vercel.app/categories"
        );
        setCategories(responseCategories.data);
      } catch (error) {
        console.error("Error fetching categories data:", error);
        navigate("*");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, [navigate]); // Re-fetch if postId changes

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPost((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCategoryChange = (value) => {
    const selectedCategory = categories.find((cat) => cat.name === value);
    setPost((prevData) => ({
      ...prevData,
      category: value, // The category name
      category_id: selectedCategory?.id || null, // Update the category_id
    }));
  };

  const handleSave = async (postStatusId) => {
    setIsSaving(true);
    try {
      await axios.post(
        `https://blog-post-project-api-with-db.vercel.app/posts`,
        {
          title: post.title,
          image:
            "https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449771/my-blog-post/g8qpepvgnz6gioylyhrz.jpg", // will implement file uploading later
          category_id: post.category_id,
          description: post.description,
          content: post.content,
          status_id: postStatusId, //  1 = draft, 2 = published
        }
      );

      toast.custom((t) => (
        <div className="bg-green-500 text-white p-4 rounded-sm flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg mb-1">
              Created article successfully
            </h2>
            <p className="text-sm">
              {postStatusId === 1
                ? "Your article has been successfully published."
                : postStatusId === 2
                ? "Your article has been successfully saved as draft."
                : ""}
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
      navigate("/admin/article-management"); // Redirect after saving
    } catch {
      toast.custom((t) => (
        <div className="bg-red-500 text-white p-4 rounded-sm flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg mb-1">Failed to create article</h2>
            <p className="text-sm">
              Something went wrong while trying to update article. Please try
              again later.
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
      {isLoading ? (
        <SkeletonLoading />
      ) : (
        <main className="flex-1 p-8 bg-gray-50 overflow-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Create article</h2>
            <div className="space-x-2">
              <Button
                className="px-8 py-2 rounded-full"
                variant="outline"
                disabled={isSaving}
                onClick={() => handleSave(1)}
              >
                Save as draft
              </Button>
              <Button
                className="px-8 py-2 rounded-full"
                disabled={isSaving}
                onClick={() => handleSave(2)}
              >
                Save and publish
              </Button>
            </div>
          </div>

          <form className="space-y-7 max-w-4xl">
            <div>
              <label
                htmlFor="thumbnail"
                className="block text-gray-700 font-medium mb-2"
              >
                Thumbnail image
              </label>
              <div className="flex items-end space-x-4">
                <div className="flex justify-center items-center w-full max-w-lg h-64 px-6 py-20 border-2 border-gray-300 border-dashed rounded-md bg-gray-50">
                  <div className="text-center space-y-2">
                    <ImageIcon className="mx-auto h-8 w-8 text-gray-400" />
                  </div>
                </div>
                <label
                  htmlFor="file-upload"
                  className="px-8 py-2 bg-background rounded-full text-foreground border border-foreground hover:border-muted-foreground hover:text-muted-foreground transition-colors cursor-pointer"
                >
                  <span>Upload thumbnail image</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                  />
                </label>
              </div>
            </div>

            <div>
              <label htmlFor="category">Category</label>
              <Select
                value={post.category}
                onValueChange={(value) => {
                  handleCategoryChange(value);
                }}
              >
                <SelectTrigger className="max-w-lg mt-1 py-3 rounded-sm text-muted-foreground focus:ring-0 focus:ring-offset-0 focus:border-muted-foreground">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.name}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="author">Author name</label>
              <Input
                id="author"
                name="author"
                value={state.user.name}
                className="mt-1 max-w-lg"
                disabled
              />
            </div>

            <div>
              <label htmlFor="title">Title</label>
              <Input
                id="title"
                name="title"
                placeholder="Article title"
                value={post.title} // Prefill with the fetched title
                onChange={handleInputChange}
                className="mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground"
              />
            </div>

            <div>
              <label htmlFor="introduction">
                Introduction (max 120 letters)
              </label>
              <Textarea
                id="introduction"
                name="description"
                placeholder="Introduction"
                rows={3}
                value={post.description} // Prefill with the fetched description
                onChange={handleInputChange}
                className="mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground"
                maxLength={120}
              />
            </div>

            <div>
              <label htmlFor="content">Content</label>
              <Textarea
                id="content"
                name="content"
                placeholder="Content"
                rows={20}
                value={post.content} // Prefill with the fetched content
                onChange={handleInputChange}
                className="mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground"
              />
            </div>
          </form>
        </main>
      )}
    </div>
  );
}

function SkeletonLoading() {
  return (
    <main className="flex-1 p-8 bg-gray-50 overflow-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Create article</h2>
        <div className="space-x-2">
          <Button className="px-8 py-2 rounded-full" variant="outline" disabled>
            Save as draft
          </Button>
          <Button className="px-8 py-2 rounded-full" disabled>
            Save and publish
          </Button>
        </div>
      </div>

      <div className="space-y-7 max-w-4xl">
        <div>
          <Skeleton className="h-4 w-32 mb-2 bg-[#EFEEEB]" />
          <div className="flex items-end space-x-4">
            <Skeleton className="h-64 w-full max-w-lg bg-[#EFEEEB]" />
            <Skeleton className="h-10 w-48 bg-[#EFEEEB]" />
          </div>
        </div>

        <div>
          <Skeleton className="h-4 w-24 mb-2 bg-[#EFEEEB]" />
          <Skeleton className="h-10 w-full max-w-lg bg-[#EFEEEB]" />
        </div>

        <div>
          <Skeleton className="h-4 w-32 mb-2 bg-[#EFEEEB]" />
          <Skeleton className="h-10 w-full max-w-lg bg-[#EFEEEB]" />
        </div>

        <div>
          <Skeleton className="h-4 w-16 mb-2 bg-[#EFEEEB]" />
          <Skeleton className="h-10 w-full bg-[#EFEEEB]" />
        </div>

        <div>
          <Skeleton className="h-4 w-64 mb-2 bg-[#EFEEEB]" />
          <Skeleton className="h-24 w-full bg-[#EFEEEB]" />
        </div>

        <div>
          <Skeleton className="h-4 w-24 mb-2 bg-[#EFEEEB]" />
          <Skeleton className="h-80 w-full bg-[#EFEEEB]" />
        </div>
      </div>

      <Skeleton className="h-6 w-32 mt-4 bg-[#EFEEEB]" />
    </main>
  );
}
