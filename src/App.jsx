import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./page/HomePage";
import ViewPostPage from "./page/ViewPostPage";
import { Toaster } from "@/components/ui/sonner";
import NotFoundPage from "./page/NotFoundPage";
import SignUpPage from "./page/SignUpPage";
import LoginPage from "./page/LoginPage";
import SignUpSuccessPage from "./page/SignUpSuccessPage";
import ProfilePage from "./page/ProfilePage";
import ResetPasswordPage from "./page/ResetPasswordPage";
import AdminArticleManagementPage from "./page/admin/AdminArticlePage";
import AdminLogin from "./page/admin/AdminLoginPage";
import AdminCategoryManagementPage from "./page/admin/AdminCategoryPage";
import AdminProfilePage from "./page/admin/AdminProfilePage";
import AdminResetPasswordPage from "./page/admin/AdminResetPasswordPage";
import AdminCreateArticlePage from "./page/admin/AdminCreateArticle";
import AdminNotificationPage from "./page/admin/AdminNotificationPage";
import AdminCreateCategoryPage from "./page/admin/AdminCreateCategoryPage";
import AdminEditCategoryPage from "./page/admin/AdminEditCategoryPage";
import AdminEditArticlePage from "./page/admin/AdminEditArticlePage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:postId" element={<ViewPostPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/sign-up/success" element={<SignUpSuccessPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          {/* Admin Section */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/article-management"
            element={<AdminArticleManagementPage />}
          />
          <Route
            path="/admin/article-management/create"
            element={<AdminCreateArticlePage />}
          />
          <Route
            path="/admin/article-management/edit/:postId"
            element={<AdminEditArticlePage />}
          />
          <Route
            path="/admin/category-management"
            element={<AdminCategoryManagementPage />}
          />
          <Route
            path="/admin/category-management/create"
            element={<AdminCreateCategoryPage />}
          />
          <Route
            path="/admin/category-management/edit/:categoryId"
            element={<AdminEditCategoryPage />}
          />
          <Route path="/admin/profile" element={<AdminProfilePage />} />
          <Route
            path="/admin/notification"
            element={<AdminNotificationPage />}
          />
          <Route
            path="/admin/reset-password"
            element={<AdminResetPasswordPage />}
          />
        </Routes>
      </Router>
      <Toaster
        toastOptions={{
          unstyled: true,
        }}
      />
    </div>
  );
}

export default App;
