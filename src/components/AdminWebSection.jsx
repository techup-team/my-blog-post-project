import {
  Bell,
  FileText,
  FolderOpen,
  Key,
  LogOut,
  User,
  Globe,
} from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import { useAuth } from "@/contexts/authentication";

export function AdminSidebar() {
  const { logout } = useAuth();
  const location = useLocation();

  // Helper function to check if the current path starts with the base path
  const isActive = (basePath) => location.pathname.startsWith(basePath);

  return (
    <aside className="w-64 bg-white shadow-md">
      <div className="p-4">
        <h1 className="text-2xl font-bold">
          Thomson P<span className="text-green-400">.</span>
        </h1>
        <p className="text-sm text-orange-400">Admin panel</p>
      </div>
      <nav className="mt-6">
        <Link
          to="/admin/article-management"
          className={`flex items-center px-4 py-2 ${
            isActive("/admin/article-management")
              ? "bg-gray-200 text-gray-700"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <FileText className="mr-3 h-5 w-5" />
          Article management
        </Link>
        <Link
          to="/admin/category-management"
          className={`flex items-center px-4 py-2 ${
            isActive("/admin/category-management")
              ? "bg-gray-200 text-gray-700"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <FolderOpen className="mr-3 h-5 w-5" />
          Category management
        </Link>
        <Link
          to="/admin/profile"
          className={`flex items-center px-4 py-2 ${
            isActive("/admin/profile")
              ? "bg-gray-200 text-gray-700"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <User className="mr-3 h-5 w-5" />
          Profile
        </Link>
        <Link
          to="/admin/notification"
          className={`flex items-center px-4 py-2 ${
            isActive("/admin/notification")
              ? "bg-gray-200 text-gray-700"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <Bell className="mr-3 h-5 w-5" />
          Notification
        </Link>
        <Link
          to="/admin/reset-password"
          className={`flex items-center px-4 py-2 ${
            isActive("/admin/reset-password")
              ? "bg-gray-200 text-gray-700"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <Key className="mr-3 h-5 w-5" />
          Reset password
        </Link>
      </nav>
      <div className="absolute bottom-0 w-64 border-t border-gray-200 py-2">
        <Link
          to="/"
          className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100"
        >
          <Globe className="mr-3 h-5 w-5" />
          Go to the website
        </Link>
        <Link
          onClick={() => {
            logout();
          }}
          className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 cursor-pointer"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Log out
        </Link>
      </div>
    </aside>
  );
}
