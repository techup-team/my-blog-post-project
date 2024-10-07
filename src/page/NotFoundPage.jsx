import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { CircleAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-grow flex items-center justify-center">
        <div className="flex flex-col space-y-8 items-center p-12">
          <CircleAlert className="h-20 w-20 text-foreground" />
          <h1 className="mt-6 text-2xl font-bold">Page Not Found</h1>
          <button
            onClick={() => navigate("/")}
            className="px-8 py-4 bg-foreground text-white rounded-full hover:bg-muted-foreground transition-colors"
          >
            Go To Homepage
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
