import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AdminSidebar } from "@/components/AdminWebSection";

export default function AdminProfilePage() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar />
      {/* Main content */}
      <main className="flex-1 p-8 bg-gray-50 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Profile</h2>
          <Button className="px-8 py-2 rounded-full">Save</Button>
        </div>

        <div>
          <div className="flex items-center mb-6">
            <Avatar className="w-24 h-24 mr-4">
              <AvatarImage
                src="/placeholder.svg?height=96&width=96"
                alt="Profile picture"
              />
              <AvatarFallback>TP</AvatarFallback>
            </Avatar>
            <Button variant="outline">Upload profile picture</Button>
          </div>

          <form className="space-y-7 max-w-2xl">
            <div>
              <label htmlFor="name">Name</label>
              <Input
                id="name"
                defaultValue="Thompson P."
                className="mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground"
              />
            </div>
            <div>
              <label htmlFor="username">Username</label>
              <Input
                id="username"
                defaultValue="thompson"
                className="mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground"
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <Input
                id="email"
                type="email"
                defaultValue="thompson.p@gmail.com"
                className="mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground"
              />
            </div>
            <div>
              <label htmlFor="bio">Bio (max 120 letters)</label>
              <Textarea
                id="bio"
                defaultValue="I am a pet enthusiast and freelance writer who specializes in animal behavior and care. With a deep love for cats, I enjoy sharing insights on feline companionship and wellness.

When I'm not writing, I spends time volunteering at my local animal shelter, helping cats find loving homes."
                rows={10}
                className="mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground"
              />
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
