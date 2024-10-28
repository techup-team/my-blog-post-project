import { useState } from "react";
import { NavBar, Footer } from "@/components/WebSection";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Lock } from "lucide-react";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [name, setName] = useState("Moodeng ja");
  const [username, setUsername] = useState("moodeng.cute");
  const [email, setEmail] = useState("moodeng.cute@gmail.com");

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="min-h-screen md:p-8">
        <div className="max-w-4xl mx-auto overflow-hidden">
          {/* Desktop Header (hidden on mobile) */}
          <div className="hidden md:flex items-center p-6">
            <Avatar className="h-14 w-14">
              <AvatarImage
                src="/placeholder.svg?height=48&width=48"
                alt="Moodeng ja"
              />
              <AvatarFallback>
                <User />
              </AvatarFallback>
            </Avatar>
            <div className="ml-4">
              <h1 className="text-2xl font-bold">Moodeng ja</h1>
            </div>
          </div>

          {/* Mobile Header */}
          <div className="md:hidden p-4">
            <div className="flex justify-start gap-12 items-center mb-4">
              <div className="flex items-center space-x-2 text-foreground font-medium cursor-default">
                <User className="h-5 w-5 mb-1" />
                <span>Profile</span>
              </div>
              <a
                onClick={() => {
                  navigate("/reset-password");
                }}
                className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
              >
                <Lock className="h-5 w-5 mb-1" />
                Reset password
              </a>
            </div>
            <div className="flex items-center">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src="/placeholder.svg?height=40&width=40"
                  alt="Moodeng ja"
                />
                <AvatarFallback>MJ</AvatarFallback>
              </Avatar>
              <h2 className="ml-3 text-xl font-semibold">Moodeng ja</h2>
            </div>
          </div>

          <div className="flex flex-col md:flex-row">
            {/* Desktop Sidebar (hidden on mobile) */}
            <aside className="hidden md:block w-64 p-6">
              <nav>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-foreground font-medium cursor-default">
                    <User className="h-5 w-5 mb-1" />
                    <span>Profile</span>
                  </div>
                  <a
                    onClick={() => {
                      navigate("/reset-password");
                    }}
                    className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
                  >
                    <Lock className="h-5 w-5 mb-1" />
                    Reset password
                  </a>
                </div>
              </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 bg-[#EFEEEB] md:m-2 md:shadow-md md:rounded-lg">
              <div className="flex flex-col md:flex-row items-center justify-start md:gap-6 mb-6">
                <Avatar className="h-28 w-28 mb-5">
                  <AvatarImage
                    src="/placeholder.svg?height=96&width=96"
                    alt="Profile"
                  />
                  <AvatarFallback>
                    <User className="h-8 w-8" />
                  </AvatarFallback>
                </Avatar>
                <button className="bg-background px-8 py-2 rounded-full text-foreground border border-foreground hover:border-muted-foreground hover:text-muted-foreground transition-colors">
                  Upload profile picture
                </button>
              </div>

              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Name
                  </label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground`}
                  />
                </div>
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Username
                  </label>
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={`mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground`}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled
                    className="bg-gray-100"
                  />
                </div>
                <button
                  type="submit"
                  className="px-8 py-2 mt-2 bg-foreground text-white rounded-full hover:bg-muted-foreground transition-colors"
                >
                  Save
                </button>
              </form>
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
