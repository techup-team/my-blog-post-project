import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isErrorEmail, setIsErrorEmail] = useState(false);
  const [isErrorPassword, setIsErrorPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    let valid = true;

    if (!email.trim()) {
      setIsErrorEmail(true);
      valid = false;
    } else {
      setIsErrorEmail(false);
    }

    if (!password.trim()) {
      setIsErrorPassword(true);
      valid = false;
    } else {
      setIsErrorPassword(false);
    }

    if (valid) {
      // Submit the login form
      console.log("Logging in with:", { email, password });
      // Add logic for login submission (e.g., API call)

      // Navigate to a new page after login
      navigate("/");
    }
  };
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex justify-center items-center p-4 my-4 flex-grow">
        <div className="w-full max-w-2xl bg-[#EFEEEB] rounded-sm shadow-md px-3 sm:px-20 py-14">
          <p className="text-md text-orange-300 text-center mb-4">
            Admin panel
          </p>
          <h2 className="text-4xl font-semibold text-center mb-6 text-foreground">
            Log in
          </h2>
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="relative space-y-1">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-muted-foreground"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground ${
                  isErrorEmail ? "border-red-500" : ""
                }`}
              />
              {isErrorEmail && (
                <p className="text-red-500 text-xs absolute">
                  Please enter a valid email.
                </p>
              )}
            </div>
            <div className="relative space-y-1">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-muted-foreground"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground ${
                  isErrorPassword ? "border-red-500" : ""
                }`}
              />
              {isErrorPassword && (
                <p className="text-red-500 text-xs absolute">
                  Please enter your password.
                </p>
              )}
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-8 py-2 bg-foreground text-white rounded-full hover:bg-muted-foreground transition-colors"
              >
                Log in
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
