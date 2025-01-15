import { Route, Routes } from "react-router-dom";
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
import AdminCategoryManagementPage from "./page/admin/AdminCategoryPage";
import AdminProfilePage from "./page/admin/AdminProfilePage";
import AdminResetPasswordPage from "./page/admin/AdminResetPasswordPage";
import AdminCreateArticlePage from "./page/admin/AdminCreateArticle";
import AdminCreateCategoryPage from "./page/admin/AdminCreateCategoryPage";
import AdminEditCategoryPage from "./page/admin/AdminEditCategoryPage";
import AdminEditArticlePage from "./page/admin/AdminEditArticlePage";
// import AdminNotificationPage from "./page/admin/AdminNotificationPage";
import { useAuth } from "@/contexts/authentication"; // Import useAuth to check auth state
import jwtInterceptor from "./utils/jwtIntercepter.js";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AuthenticationRoute from "./components/auth/AuthenticationRoute";

jwtInterceptor();

function App() {
  const { isAuthenticated, state } = useAuth();

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/post/:postId" element={<ViewPostPage />} />
        <Route path="*" element={<NotFoundPage />} />

        {/* Authentication Section */}
        <Route
          path="/sign-up"
          element={
            <AuthenticationRoute
              isLoading={state.getUserLoading}
              isAuthenticated={isAuthenticated}
            >
              <SignUpPage />
            </AuthenticationRoute>
          }
        />
        <Route
          path="/sign-up/success"
          element={
            <AuthenticationRoute
              isLoading={state.getUserLoading}
              isAuthenticated={isAuthenticated}
            >
              <SignUpSuccessPage />
            </AuthenticationRoute>
          }
        />
        <Route
          path="/login"
          element={
            <AuthenticationRoute
              isLoading={state.getUserLoading}
              isAuthenticated={isAuthenticated}
            >
              <LoginPage />
            </AuthenticationRoute>
          }
        />

        {/* User Section */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute
              isLoading={state.getUserLoading}
              isAuthenticated={isAuthenticated}
              userRole={state.user?.role}
              requiredRole="user"
            >
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reset-password"
          element={
            <ProtectedRoute
              isLoading={state.getUserLoading}
              isAuthenticated={isAuthenticated}
              userRole={state.user?.role}
              requiredRole="user"
            >
              <ResetPasswordPage />
            </ProtectedRoute>
          }
        />

        {/* Admin Section */}
        <Route
          path="/admin/article-management"
          element={
            <ProtectedRoute
              isLoading={state.getUserLoading}
              isAuthenticated={isAuthenticated}
              userRole={state.user?.role}
              requiredRole="admin"
            >
              <AdminArticleManagementPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/article-management/create"
          element={
            <ProtectedRoute
              isLoading={state.getUserLoading}
              isAuthenticated={isAuthenticated}
              userRole={state.user?.role}
              requiredRole="admin"
            >
              <AdminCreateArticlePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/article-management/edit/:postId"
          element={
            <ProtectedRoute
              isLoading={state.getUserLoading}
              isAuthenticated={isAuthenticated}
              userRole={state.user?.role}
              requiredRole="admin"
            >
              <AdminEditArticlePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/category-management"
          element={
            <ProtectedRoute
              isLoading={state.getUserLoading}
              isAuthenticated={isAuthenticated}
              userRole={state.user?.role}
              requiredRole="admin"
            >
              <AdminCategoryManagementPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/category-management/create"
          element={
            <ProtectedRoute
              isLoading={state.getUserLoading}
              isAuthenticated={isAuthenticated}
              userRole={state.user?.role}
              requiredRole="admin"
            >
              <AdminCreateCategoryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/category-management/edit/:categoryId"
          element={
            <ProtectedRoute
              isLoading={state.getUserLoading}
              isAuthenticated={isAuthenticated}
              userRole={state.user?.role}
              requiredRole="admin"
            >
              <AdminEditCategoryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/profile"
          element={
            <ProtectedRoute
              isLoading={state.getUserLoading}
              isAuthenticated={isAuthenticated}
              userRole={state.user?.role}
              requiredRole="admin"
            >
              <AdminProfilePage />
            </ProtectedRoute>
          }
        />
        {/* Optional Requirement */}
        {/* <Route
          path="/admin/notification"
          element={
            <ProtectedRoute
              isLoading={state.getUserLoading}
              isAuthenticated={isAuthenticated}
              userRole={state.user?.role}
              requiredRole="admin"
            >
              <AdminNotificationPage />
            </ProtectedRoute>
          }
        /> */}
        <Route
          path="/admin/reset-password"
          element={
            <ProtectedRoute
              isLoading={state.getUserLoading}
              isAuthenticated={isAuthenticated}
              userRole={state.user?.role}
              requiredRole="admin"
            >
              <AdminResetPasswordPage />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Toaster
        toastOptions={{
          unstyled: true,
        }}
      />
    </div>
  );
}

export default App;
