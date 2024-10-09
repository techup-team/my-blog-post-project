import authorImage from "../assets/author-image.jpeg";
import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { Linkedin, Github, Mail } from "lucide-react";

export function NavBar() {
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

export function HeroSection() {
  return (
    <main className="container md:px-8 px-4 py-8 lg:py-16 mx-auto">
      <div className="flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/3 mb-8 lg:mb-0 lg:pr-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Stay <br className="hidden lg:block" />
            Informed, <br />
            Stay Inspired,
          </h1>
          <p className="text-lg text-muted-foreground">
            Discover a World of Knowledge at Your Fingertips. Your Daily Dose of
            Inspiration and Information.
          </p>
        </div>
        <img
          src={authorImage}
          alt="Person with a cat"
          className="h-[530px] object-cover rounded-lg shadow-lg lg:w-1/3 mx-4 mb-8 lg:mb-0"
        />
        <div className="lg:w-1/3 lg:pl-8">
          <h2 className="text-xl font-semibold mb-2">-Author</h2>
          <h3 className="text-2xl font-bold mb-4">Thompson P.</h3>
          <p className="text-muted-foreground mb-4">
            I am a pet enthusiast and freelance writer who specializes in animal
            behavior and care. With a deep love for cats, I enjoy sharing
            insights on feline companionship and wellness.
          </p>
          <p className="text-muted-foreground">
            When I&apos;m not writing, I spend time volunteering at my local
            animal shelter, helping cats find loving homes.
          </p>
        </div>
      </div>
    </main>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#EFEEEB] px-8 py-8 md:py-14 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
        <span className="font-medium">Get in touch</span>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-muted-foreground">
            <Linkedin size={24} />
            <span className="sr-only">LinkedIn</span>
          </a>
          <a href="#" className="hover:text-muted-foreground">
            <Github size={24} />
            <span className="sr-only">GitHub</span>
          </a>
          <a href="#" className="hover:text-muted-foreground">
            <Mail size={24} />
            <span className="sr-only">Email</span>
          </a>
        </div>
      </div>
      <a href="/" className="hover:text-muted-foreground font-medium underline">
        Home page
      </a>
    </footer>
  );
}
