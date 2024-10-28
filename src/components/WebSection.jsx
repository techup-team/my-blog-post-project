import authorImage from "../assets/author-image.jpeg";
import { Menu } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import {
  Linkedin,
  Github,
  Mail,
  ChevronDown,
  User,
  Key,
  LogOut,
} from "lucide-react";

export function NavBar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with actual login state

  return (
    <nav className="flex items-center justify-between py-4 px-4 md:px-8 bg-background border-b border-muted">
      <button onClick={() => navigate("/")} className="text-2xl font-bold">
        Thomson P<span className="text-green-400">.</span>
      </button>
      {!isLoggedIn ? (
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
      ) : (
        <div className="hidden sm:flex items-center space-x-4">
          {/* Optional Requirement (Notification) */}
          {/* <button className="ml-auto p-3.5 rounded-full border border-[#EFEEEB] bg-muted focus:outline-none focus:ring-2 focus:ring-offset-2 text-foreground hover:bg-[#EFEEEB] hover:text-muted-foreground cursor-pointer transition-colors">
            <Bell className="h-4 w-4" />
          </button> */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center space-x-2 rounded-md text-sm font-medium text-foreground hover:text-muted-foreground focus:outline-none">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src="/placeholder.svg?height=8&width=8"
                    alt="Profile"
                  />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <span>Moodeng ja</span>
                <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 bg-background rounded-sm shadow-sm p-1"
            >
              <DropdownMenuItem
                onClick={() => navigate("/profile")}
                className="text-sm text-foreground hover:bg-[#EFEEEB] hover:text-muted-foreground hover:rounded-sm cursor-pointer"
              >
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => navigate("/reset-password")}
                className="text-sm text-foreground hover:bg-[#EFEEEB] hover:text-muted-foreground hover:rounded-sm cursor-pointer"
              >
                <Key className="mr-2 h-4 w-4" />
                <span>Reset password</span>
              </DropdownMenuItem>
              <div className="border-t border-muted m-1"></div>
              <DropdownMenuItem
                onClick={() => setIsLoggedIn(false)}
                className="text-sm text-foreground hover:bg-[#EFEEEB] hover:text-muted-foreground hover:rounded-sm cursor-pointer"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger className="sm:hidden focus:outline-none">
          <Menu />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="sm:hidden w-screen rounded-none mt-4 flex flex-col gap-6 py-6 px-6">
          {!isLoggedIn ? (
            <>
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
            </>
          ) : (
            <div className="sm:hidden">
              <div className="space-y-2">
                <div className="flex items-center py-2">
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      src="/placeholder.svg?height=8&width=8"
                      alt="Profile"
                    />
                    <AvatarFallback>
                      <User className="h-6 w-6" />
                    </AvatarFallback>
                  </Avatar>
                  <span className="ml-3 text-base font-medium text-foreground">
                    Moodeng ja
                  </span>
                  {/* Optional Requirement (Notification) */}
                  {/* <button className="ml-auto p-3.5 rounded-full border border-[#EFEEEB] bg-muted focus:outline-none focus:ring-2 focus:ring-offset-2 text-foreground hover:bg-[#EFEEEB] hover:text-muted-foreground cursor-pointer transition-colors">
                    <Bell className="h-4 w-4" />
                  </button> */}
                </div>
                <a
                  href="#"
                  className="flex items-center justify-between px-4 py-2 text-base font-medium text-foreground hover:bg-[#EFEEEB] hover:text-muted-foreground rounded-sm cursor-pointer transition-colors"
                >
                  <div className="flex items-center">
                    <User className="mr-4 h-5 w-5 " />
                    Profile
                  </div>
                </a>
                <a
                  href="#"
                  className="flex items-center justify-between px-4 py-2 text-base font-medium text-foreground hover:bg-[#EFEEEB] hover:text-muted-foreground rounded-sm cursor-pointer transition-colors"
                >
                  <div className="flex items-center">
                    <Key className="mr-4 h-5 w-5" />
                    Reset password
                  </div>
                </a>
                <div className="border-t border-muted"></div>
                <a
                  href="#"
                  className="flex items-center px-4 py-2 text-base font-medium text-foreground hover:bg-[#EFEEEB] hover:text-muted-foreground rounded-sm cursor-pointer transition-colors"
                >
                  <LogOut className="mr-4 h-5 w-5" />
                  Log out
                </a>
              </div>
            </div>
          )}
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
