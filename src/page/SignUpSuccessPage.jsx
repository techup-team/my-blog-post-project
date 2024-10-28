import { NavBar, Footer } from "@/components/WebSection";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SignUpSuccessPage() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow flex items-center justify-center p-4 my-4">
        <div className="flex flex-col space-y-8 items-center w-full max-w-xl bg-[#EFEEEB] rounded-sm shadow-md px-3 sm:px-20 py-14">
          <div className="relative">
            <div className="h-20 w-20 bg-green-500 rounded-full flex items-center justify-center">
              <Check className="h-12 w-12 text-white" strokeWidth={3} />
            </div>
          </div>
          <h1 className="mt-6 text-2xl font-bold">Registration Successful</h1>
          <button
            onClick={() => navigate("/")}
            className="px-8 py-4 bg-foreground text-white rounded-full hover:bg-muted-foreground transition-colors"
          >
            Continue
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
