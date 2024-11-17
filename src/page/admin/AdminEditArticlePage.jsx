import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Use `useParams` for getting the postId from the URL
import { ImageIcon, Trash2 } from "lucide-react";
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

//this component is not finished yet
export default function AdminEditArticlePage() {
  const { state } = useAuth();
  const navigate = useNavigate();
  const { postId } = useParams(); // Get postId from the URL
  const [post, setPost] = useState({}); // Store the fetched post data

  // Fetch post data by ID
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `https://blog-post-project-api-with-db.vercel.app/posts/${postId}`
        );
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    };

    fetchPost();
  }, [postId]); // Re-fetch if postId changes

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPost((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCategoryChange = (value) => {
    setPost((prevData) => ({
      ...prevData,
      category: value,
    }));
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `https://blog-post-project-api-with-db.vercel.app/posts/${postId}`,
        post
      );
      alert("Post updated successfully!");
      navigate("/admin/article-management"); // Redirect after saving
    } catch (error) {
      console.error("Error updating post:", error);
      alert("Failed to update post");
    }
  };

  console.log(post);
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main content */}
      <main className="flex-1 p-8 bg-gray-50 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Edit article</h2>
          <div className="space-x-2">
            <Button className="px-8 py-2 rounded-full" variant="outline">
              Save as draft
            </Button>
            <Button
              className="px-8 py-2 rounded-full"
              onClick={handleSave} // Handle save logic
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
            <Select value={post.category} onValueChange={handleCategoryChange}>
              <SelectTrigger className="max-w-lg mt-1 py-3 rounded-sm text-muted-foreground focus:ring-0 focus:ring-offset-0 focus:border-muted-foreground">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Cat">Cat</SelectItem>
                <SelectItem value="General">General</SelectItem>
                <SelectItem value="Inspiration">Inspiration</SelectItem>
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
            <label htmlFor="introduction">Introduction (max 120 letters)</label>
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
        <button className="underline underline-offset-2 hover:text-muted-foreground text-sm font-medium flex items-center gap-1 mt-4">
          <Trash2 className="h-5 w-5" />
          Delete article
        </button>
      </main>
    </div>
  );
}
