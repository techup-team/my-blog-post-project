/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Use `useParams` for getting the postId from the URL
import { Trash2, X } from "lucide-react";
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
import axios from "axios"; // Make sure axios is installed
import { useAuth } from "@/contexts/authentication";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

//this component is not finished yet
export default function AdminEditArticlePage() {
  const { state } = useAuth();
  const navigate = useNavigate();
  const { postId } = useParams(); // Get postId from the URL
  const [post, setPost] = useState({
    id: null,
    image: "",
    category_id: null,
    title: "",
    description: "",
    date: null,
    content: "",
    status_id: null,
    likes_count: null,
    category: "",
    status: "",
  }); // Store the fetched post data
  const [isLoading, setIsLoading] = useState(null);
  const [isSaving, setIsSaving] = useState(null);
  const [categories, setCategories] = useState([]);
  const [imageFile, setImageFile] = useState({});

  // Fetch post data by ID
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        const responseCategories = await axios.get(
          "https://blog-post-project-api-with-db.vercel.app/categories"
        );
        setCategories(responseCategories.data);
        const response = await axios.get(
          `https://blog-post-project-api-with-db.vercel.app/posts/admin/${postId}`
        );
        setPost(response.data);
      } catch {
        toast.custom((t) => (
          <div className="bg-red-500 text-white p-4 rounded-sm flex justify-between items-start">
            <div>
              <h2 className="font-bold text-lg mb-1">
                Failed to fetch post data.
              </h2>
              <p className="text-sm">Please try again later.</p>
            </div>
            <button
              onClick={() => toast.dismiss(t)}
              className="text-white hover:text-gray-200"
            >
              <X size={20} />
            </button>
          </div>
        ));
        navigate("/admin/article-management");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [postId, navigate]); // Re-fetch if postId changes

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
      if (imageFile?.file) {
        // If the image has been changed, use FormData
        const formData = new FormData();
        formData.append("title", post.title);
        formData.append("category_id", post.category_id);
        formData.append("description", post.description);
        formData.append("content", post.content);
        formData.append("status_id", postStatusId);
        formData.append("imageFile", imageFile.file);

        await axios.put(`http://localhost:4001/posts/${postId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        // If the image is not changed, use the old method
        await axios.put(`http://localhost:4001/posts/${postId}`, {
          title: post.title,
          image: post.image, // Existing image URL
          category_id: post.category_id,
          description: post.description,
          content: post.content,
          status_id: postStatusId,
        });
      }

      // Success toast
      toast.custom((t) => (
        <div className="bg-green-500 text-white p-4 rounded-sm flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg mb-1">
              Updated article successfully
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
      // Error toast
      toast.custom((t) => (
        <div className="bg-red-500 text-white p-4 rounded-sm flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg mb-1">Failed to update article</h2>
            <p className="text-sm">
              Something went wrong while trying to update the article. Please
              try again later.
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

  const handleDelete = async (postId) => {
    try {
      navigate("/admin/article-management");
      await axios.delete(
        `https://blog-post-project-api-with-db.vercel.app/posts/${postId}`
      );
      toast.custom((t) => (
        <div className="bg-green-500 text-white p-4 rounded-sm flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg mb-1">
              Deleted article successfully
            </h2>
            <p className="text-sm">The post has been removed.</p>
          </div>
          <button
            onClick={() => toast.dismiss(t)}
            className="text-white hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
      ));
    } catch {
      toast.custom((t) => (
        <div className="bg-red-500 text-white p-4 rounded-sm flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg mb-1">Failed to delete article</h2>
            <p className="text-sm">
              Something went wrong. Please try again later.
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
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the selected file

    // Check if the file is an image
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];

    if (!file) {
      // No file selected
      return;
    }

    if (!allowedTypes.includes(file.type)) {
      toast.custom((t) => (
        <div className="bg-red-500 text-white p-4 rounded-sm flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg mb-1">Failed to upload file</h2>
            <p className="text-sm">
              Please upload a valid image file (JPEG, PNG, GIF, WebP).
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
      return; // Stop further processing if it's not a valid image
    }

    // Optionally check file size (e.g., max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      toast.custom((t) => (
        <div className="bg-red-500 text-white p-4 rounded-sm flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg mb-1">Failed to upload file</h2>
            <p className="text-sm">
              The file is too large. Please upload an image smaller than 5MB.
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
      return;
    }

    setImageFile({ file }); // Store the file object
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
            <h2 className="text-2xl font-semibold">Edit article</h2>
            <div className="space-x-2">
              <Button
                className="px-8 py-2 rounded-full"
                onClick={() => handleSave(1)}
                variant="outline"
                disabled={isSaving}
              >
                Save as draft
              </Button>
              <Button
                className="px-8 py-2 rounded-full"
                onClick={() => handleSave(2)} // Handle save logic
                disabled={isSaving}
              >
                Save
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
                {imageFile.file ? (
                  <img
                    src={URL.createObjectURL(imageFile.file)}
                    alt="Uploaded"
                    className="rounded-md object-cover max-w-lg h-80"
                  />
                ) : (
                  <img
                    src={post.image}
                    alt="Uploaded"
                    className="rounded-md object-cover max-w-lg h-80"
                  />
                )}
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
                    onChange={handleFileChange}
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
          <DeletePostDialog onDelete={() => handleDelete(postId)} />
        </main>
      )}
    </div>
  );
}

function SkeletonLoading() {
  return (
    <main className="flex-1 p-8 bg-gray-50 overflow-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Edit article</h2>
        <div className="space-x-2">
          <Button className="px-8 py-2 rounded-full" variant="outline" disabled>
            Save as draft
          </Button>
          <Button className="px-8 py-2 rounded-full" disabled>
            Save
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

function DeletePostDialog({ onDelete }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="underline underline-offset-2 hover:text-muted-foreground text-sm font-medium flex items-center gap-1 mt-4">
          <Trash2 className="h-5 w-5" />
          Delete article
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white rounded-md pt-16 pb-6 max-w-[22rem] sm:max-w-md flex flex-col items-center">
        <AlertDialogTitle className="text-3xl font-semibold pb-2 text-center">
          Delete Post
        </AlertDialogTitle>
        <AlertDialogDescription className="flex flex-row mb-2 justify-center font-medium text-center text-muted-foreground">
          Do you want to delete this post?
        </AlertDialogDescription>
        <div className="flex flex-row gap-4">
          <AlertDialogCancel className="bg-background px-10 py-6 rounded-full text-foreground border border-foreground hover:border-muted-foreground hover:text-muted-foreground transition-colors">
            Cancel
          </AlertDialogCancel>
          <Button
            onClick={onDelete}
            className="rounded-full text-white bg-foreground hover:bg-muted-foreground transition-colors py-6 text-lg px-10"
          >
            Delete
          </Button>
        </div>
        <AlertDialogCancel className="absolute right-4 top-2 sm:top-4 p-1 border-none">
          <X className="h-6 w-6" />
        </AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  );
}
