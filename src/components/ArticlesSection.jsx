import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Articles() {
  return (
    <div className="w-full max-w-7xl mx-auto md:px-6 lg:px-8 mb-10">
      <h2 className="text-xl font-bold mb-4 px-4">Latest articles</h2>
      <div className="bg-[#EFEEEB] px-4 py-4 md:py-3 md:rounded-sm flex flex-col space-y-4 md:flex-row-reverse md:items-center md:space-y-0 md:justify-between">
        <div className="w-full md:max-w-sm">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search"
              className="py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground"
            />
          </div>
        </div>
        <div className="md:hidden w-full">
          <Select value="highlight">
            <SelectTrigger className="w-full py-3 rounded-sm text-muted-foreground">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="highlight">Highlight</SelectItem>
              <SelectItem value="cat">Cat</SelectItem>
              <SelectItem value="inspiration">Inspiration</SelectItem>
              <SelectItem value="general">General</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="hidden md:flex space-x-2">
          <button
            className="px-4 py-3 transition-colors rounded-sm text-sm text-muted-foreground font-medium bg-[#DAD6D1]
            "
          >
            Highlight
          </button>
          <button
            className="px-4 py-3 transition-colors rounded-sm text-sm text-muted-foreground font-medium bg-[muted]
            "
          >
            Cat
          </button>
          <button
            className="px-4 py-3 transition-colors rounded-sm text-sm text-muted-foreground font-medium bg-[muted]
            "
          >
            Inspiration
          </button>
          <button
            className="px-4 py-3 transition-colors rounded-sm text-sm text-muted-foreground font-medium bg-[muted]
            "
          >
            General
          </button>
        </div>
      </div>
    </div>
  );
}
