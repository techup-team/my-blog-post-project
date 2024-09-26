import { Menu } from "lucide-react";

export default function NavBar() {
  return (
    <nav className="flex items-center justify-between py-4 px-4 sm:px-8 bg-background border-b border-muted">
      <a href="/" className="text-2xl font-bold">
        Thomson P<span className="text-green-400">.</span>
      </a>
      <div className="hidden md:flex space-x-4">
        <a
          href="/login"
          className="px-9 py-2 rounded-full text-foreground border border-foreground hover:border-muted-foreground hover:text-muted-foreground transition-colors"
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
      <button className="md:hidden">
        <Menu />
      </button>
    </nav>
  );
}
