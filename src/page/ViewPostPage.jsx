import { NavBar, Footer } from "@/components/WebSection";
import ViewPost from "@/components/ViewPost";

export default function ViewPostPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-grow">
        <ViewPost />
      </div>
      <Footer />
    </div>
  );
}
