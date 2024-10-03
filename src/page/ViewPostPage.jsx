import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
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
