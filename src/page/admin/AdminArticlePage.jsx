import { PenSquare, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import axios from "axios";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminArticleManagementPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]); // Store all fetched posts
  const [filteredPosts, setFilteredPosts] = useState([]); // Store filtered posts
  const [searchKeyword, setSearchKeyword] = useState(""); // For search input
  const [selectedCategory, setSelectedCategory] = useState(""); // For category filter
  const [selectedStatus, setSelectedStatus] = useState(""); // For status filter

  // Fetch all posts once
  useEffect(() => {
    setIsLoading(true);
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "https://blog-post-project-api-with-db.vercel.app/posts?limit=100"
        );
        setPosts(response.data.posts); // Store all fetched posts
        setFilteredPosts(response.data.posts); // Initially, display all posts
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Filter posts based on search keyword, category, and status
  useEffect(() => {
    let filtered = posts;

    // Filter by search keyword
    if (searchKeyword) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
          post.description
            .toLowerCase()
            .includes(searchKeyword.toLowerCase()) ||
          post.content.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    }

    // Filter by selected category
    if (selectedCategory) {
      filtered = filtered.filter((post) =>
        post.category.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    // Filter by selected status
    if (selectedStatus) {
      filtered = filtered.filter((post) =>
        post.status.toLowerCase().includes(selectedStatus.toLowerCase())
      );
    }

    setFilteredPosts(filtered); // Update the filtered posts
  }, [searchKeyword, selectedCategory, selectedStatus, posts]); // Re-filter whenever any of the filters change

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Article management</h2>
          <Button
            className="px-8 py-2 rounded-full"
            onClick={() => navigate("/admin/article-management/create")}
          >
            <PenSquare className="mr-2 h-4 w-4" /> Create article
          </Button>
        </div>

        {/* Filters */}
        <div className="flex space-x-4 mb-6">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Search..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)} // Update search keyword
              className="w-full py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground"
            />
          </div>

          <Select
            value={selectedStatus}
            onValueChange={(value) => setSelectedStatus(value)} // Update selected status
          >
            <SelectTrigger className="w-[180px] py-3 rounded-sm text-muted-foreground focus:ring-0 focus:ring-offset-0 focus:border-muted-foreground">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={selectedCategory}
            onValueChange={(value) => setSelectedCategory(value)} // Update selected category
          >
            <SelectTrigger className="w-[180px] py-3 rounded-sm text-muted-foreground focus:ring-0 focus:ring-offset-0 focus:border-muted-foreground">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cat">Cat</SelectItem>
              <SelectItem value="general">General</SelectItem>
              <SelectItem value="inspiration">Inspiration</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50%]">Article title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading
              ? // Skeleton loader rows
                Array(12)
                  .fill()
                  .map((_, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Skeleton className="h-6 w-[250px] bg-muted-foreground" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 w-[150px] bg-muted-foreground" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 w-[100px] bg-muted-foreground" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 w-[50px] bg-muted-foreground" />
                      </TableCell>
                    </TableRow>
                  ))
              : filteredPosts.map((article, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {article.title}
                    </TableCell>
                    <TableCell>{article.category}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex capitalize items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          article.status === "draft"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {article.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          navigate(
                            `/admin/article-management/edit/${article.id}`
                          );
                        }}
                      >
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
