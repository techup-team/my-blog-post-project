import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-between py-4 px-4 md:px-8 bg-background border-b border-muted">
      <button onClick={() => navigate("/")} className="text-2xl font-bold">
        Thomson P<span className="text-green-400">.</span>
      </button>
      <div className="hidden sm:flex space-x-4">
        <button
          onClick={() => navigate("/login")}
          className="px-8 py-2 rounded-full text-foreground border border-foreground hover:border-muted-foreground hover:text-muted-foreground transition-colors"
        >
          Log in
        </button>
        <button
          onClick={() => navigate("/signup")}
          className="px-8 py-2 bg-foreground text-white rounded-full hover:bg-muted-foreground transition-colors"
        >
          Sign up
        </button>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger className="sm:hidden focus:outline-none">
          <Menu />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="sm:hidden w-screen rounded-none mt-4 flex flex-col gap-6 py-10 px-6">
          <button
            onClick={() => navigate("/login")}
            className="px-8 py-4 rounded-full text-center text-foreground border border-foreground hover:border-muted-foreground hover:text-muted-foreground transition-colors"
          >
            Log in
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="px-8 py-4 bg-foreground text-center text-white rounded-full hover:bg-muted-foreground transition-colors"
          >
            Sign up
          </button>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}
