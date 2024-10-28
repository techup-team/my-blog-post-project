import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AdminSidebar } from "@/components/AdminWebSection";

export default function AdminNotificationPage() {
  const notifications = [
    {
      id: 1,
      type: "comment",
      user: {
        name: "Jacob Lash",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      article: "The Fascinating World of Cats: Why We Love Our Furry Friends",
      content:
        "I loved this article! It really explains why my cat is so independent yet loving. The purring section was super interesting.",
      time: "4 hours ago",
    },
    {
      id: 2,
      type: "like",
      user: {
        name: "Jacob Lash",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      article: "The Fascinating World of Cats: Why We Love Our Furry Friends",
      content: "",
      time: "4 hours ago",
    },
  ];
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar />
      {/* Main content */}
      <main className="flex-1 p-8 bg-gray-50 overflow-hidden">
        <h2 className="text-2xl font-semibold mb-6">Notification</h2>

        <div className="space-y-4">
          {notifications.map((notification) => (
            <div key={notification.id}>
              <div className="p-4 rounded-lg flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <Avatar className="w-10 h-10">
                    <AvatarImage
                      src={notification.user.avatar}
                      alt={notification.user.name}
                    />
                    <AvatarFallback>
                      {notification.user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-sm font-bold inline">
                      {notification.user.name}
                    </h3>
                    <p className="text-sm font-normal inline">
                      {notification.type === "comment"
                        ? " commented on "
                        : " liked "}
                      your article: {notification.article}
                    </p>
                    {notification.type === "comment" && (
                      <p className="mt-1 text-sm text-gray-500">
                        {notification.content}
                      </p>
                    )}
                    <p className="mt-1 text-xs text-orange-400">
                      {notification.time}
                    </p>
                  </div>
                </div>
                <button className="underline underline-offset-2 hover:text-muted-foreground text-sm font-medium">
                  View
                </button>
              </div>
              <hr className="border-t border-gray-200 my-4" />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
