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
