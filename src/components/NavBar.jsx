import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function NavBar() {
  return (
    <nav className="flex items-center justify-between py-4 px-4 md:px-8 bg-background border-b border-muted">
      <a href="/" className="text-2xl font-bold">
        Thomson P<span className="text-green-400">.</span>
      </a>
      <div className="hidden sm:flex space-x-4">
        <a
          href="/login"
          className="px-8 py-2 rounded-full text-foreground border border-foreground hover:border-muted-foreground hover:text-muted-foreground transition-colors"
        >
          Log in
        </a>
        <a
          href="/signup"
          className="px-8 py-2 bg-foreground text-white rounded-full hover:bg-muted-foreground transition-colors"
        >
          Sign up
        </a>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger className="sm:hidden focus:outline-none">
          <Menu />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="sm:hidden w-screen rounded-none mt-4 flex flex-col gap-6 py-10 px-6">
          <a
            href="/login"
            className="px-8 py-4 rounded-full text-center text-foreground border border-foreground hover:border-muted-foreground hover:text-muted-foreground transition-colors"
          >
            Log in
          </a>
          <a
            href="/signup"
            className="px-8 py-4 bg-foreground text-center text-white rounded-full hover:bg-muted-foreground transition-colors"
          >
            Sign up
          </a>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}
