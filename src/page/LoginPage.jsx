import { useState } from "react";
import { NavBar, Footer } from "@/components/WebSection";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/authentication";
import { toast } from "sonner";
import { X, Loader2 } from "lucide-react";

export default function LoginPage() {
  const { login, state } = useAuth();
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});

  // Validate inputs
  const validateInputs = () => {
    const errors = {};

    // Validate email
    if (!formValues.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
      errors.email = "Please enter a valid email address.";
    }

    // Validate password
    if (!formValues.password.trim()) {
      errors.password = "Password is required.";
    } else if (formValues.password.length < 8) {
      errors.password = "Wrong password. Try again";
    }

    return errors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateInputs();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      const result = await login(formValues);
      if (result?.error) {
        return toast.custom((t) => (
          <div className="bg-red-500 text-white p-4 rounded-sm flex justify-between items-start">
            <div>
              <h2 className="font-bold text-lg mb-1">{result.error}</h2>
              <p className="text-sm">Please try another password or email</p>
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
      navigate("/");
    }
  };

  // Handle input change
  const handleChange = (key, value) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex justify-center items-center p-4 my-4 flex-grow">
        <div className="w-full max-w-2xl bg-[#EFEEEB] rounded-sm shadow-md px-3 sm:px-20 py-14">
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
                Log in
              </button>
            </div>
          </form>
          <p className="flex flex-row justify-center gap-1 mt-4 text-sm text-center pt-2 text-muted-foreground font-medium">
            Don&apos;t have an account?{" "}
            <a
              onClick={() => navigate("/sign-up")}
              className="text-foreground hover:text-muted-foreground transition-colors underline font-semibold cursor-pointer"
            >
              Sign up
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
