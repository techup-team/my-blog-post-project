import { NavBar, HeroSection, Footer } from "@/components/WebSection";
import ArticlesSection from "@/components/ArticlesSection";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-grow">
        <HeroSection />
        <ArticlesSection />
      </div>
      <Footer />
    </div>
  );
}
