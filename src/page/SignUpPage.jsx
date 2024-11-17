import { useState } from "react";
import { NavBar, Footer } from "@/components/WebSection";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/authentication";
import { toast } from "sonner";
import { X, Loader2 } from "lucide-react";

export default function SignUpPage() {
  const { register, state } = useAuth();
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const validateInputs = () => {
    const errors = {};

    // Validate name
    if (!formValues.name.trim()) {
      errors.name = "Name is required.";
    } else if (!/^[a-zA-Z\s]+$/.test(formValues.name)) {
      errors.name = "Name must contain only letters and spaces.";
    } else if (formValues.name.length < 3) {
      errors.name = "Name must be at least 3 characters long.";
    }

    // Validate username
    if (!formValues.username.trim()) {
      errors.username = "Username is required.";
    } else if (!/^[a-zA-Z0-9._-]+$/.test(formValues.username)) {
      errors.username =
        "Username can only contain letters, numbers, dots, underscores, and dashes.";
    } else if (formValues.username.length < 5) {
      errors.username = "Username must be at least 5 characters long.";
    } else if (formValues.username.length > 15) {
      errors.username = "Username cannot exceed 15 characters.";
    }

    // Validate email
    if (!formValues.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
      errors.email = "Please enter a valid email address.";
    }

    // Validate password
    if (!formValues.password.trim()) {
      errors.password = "Password is required.";
    } else if (!/(?=.*[a-zA-Z])(?=.*[0-9])/.test(formValues.password)) {
      errors.password = "Password must contain letters and numbers.";
    } else if (formValues.password.length < 8) {
      errors.password = "Password must be at least 8 characters long.";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateInputs();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      const result = await register(formValues);
      if (result?.error) {
        let suggestionMessage = "";

        // Check for email or username-related issues
        if (result.error.toLowerCase().includes("email")) {
          suggestionMessage = "Try using a different email address.";
        } else if (result.error.toLowerCase().includes("username")) {
          suggestionMessage = "Try using a different username.";
        }

        return toast.custom((t) => (
          <div className="bg-red-500 text-white p-4 rounded-sm flex justify-between items-start">
            <div>
              <h2 className="font-bold text-lg mb-1">{result.error}</h2>
              <p className="text-sm">
                {suggestionMessage && (
                  <span className="block mt-2 text-sm">
                    {suggestionMessage}
                  </span>
                )}
              </p>
            </div>
            <button
              onClick={() => toast.dismiss(t)}
              className="text-white hover:text-gray-200"
            >
              <X size={20} />
            </button>
          </div>
        ));
      }
    }
  };

  const handleChange = (key, value) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex justify-center items-center p-4 my-6 flex-grow">
        <div className="w-full max-w-2xl bg-[#EFEEEB] rounded-sm shadow-md px-3 sm:px-20 py-14">
          <h2 className="text-4xl font-semibold text-center mb-6 text-foreground">
            Sign up
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="relative space-y-1">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-muted-foreground"
              >
                Name
              </label>
              <Input
                id="name"
                placeholder="Full name"
                value={formValues.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className={`mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground ${
                  formErrors.name ? "border-red-500" : ""
                }`}
                disabled={state.loading}
              />
              {formErrors.name && (
                <p className="text-red-500 text-xs absolute">
                  {formErrors.name}
                </p>
              )}
            </div>
            <div className="relative space-y-1">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-muted-foreground"
              >
                Username
              </label>
              <Input
                id="username"
                placeholder="Username"
                value={formValues.username}
                onChange={(e) => handleChange("username", e.target.value)}
                className={`mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground ${
                  formErrors.username ? "border-red-500" : ""
                }`}
                disabled={state.loading}
              />
              {formErrors.username && (
                <p className="text-red-500 text-xs absolute">
                  {formErrors.username}
                </p>
              )}
            </div>
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
                value={formValues.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className={`mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground ${
                  formErrors.email ? "border-red-500" : ""
                }`}
                disabled={state.loading}
              />
              {formErrors.email && (
                <p className="text-red-500 text-xs absolute">
                  {formErrors.email}
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
                value={formValues.password}
                onChange={(e) => handleChange("password", e.target.value)}
                className={`mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground ${
                  formErrors.password ? "border-red-500" : ""
                }`}
                disabled={state.loading}
              />
              {formErrors.password && (
                <p className="text-red-500 text-xs absolute">
                  {formErrors.password}
                </p>
              )}
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-8 py-2 bg-foreground text-white rounded-full hover:bg-muted-foreground transition-colors flex items-center gap-1"
                disabled={state.loading}
              >
                {state.loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  ""
                )}
                Sign up
              </button>
            </div>
          </form>
          <p className="flex flex-row justify-center gap-1 mt-4 text-sm text-center pt-2 text-muted-foreground font-medium">
            Already have an account?{" "}
            <a
              onClick={() => navigate("/login")}
              className="text-foreground hover:text-muted-foreground transition-colors underline font-semibold cursor-pointer"
            >
              Log in
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
