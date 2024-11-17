/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { LoadingScreen } from "../WebSection";

function AuthenticationRoute({ isLoading, isAuthenticated, children }) {
  if (isLoading === null || isLoading) {
    // Loading state or no data yet
    return (
      <div className="flex flex-col min-h-screen">
        <div className="min-h-screen md:p-8">
          <LoadingScreen />
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    // Return null while navigate performs the redirection
    return <Navigate to="/" replace />;
  }

  // User is authenticated and has the correct role
  return children;
}

export default AuthenticationRoute;
