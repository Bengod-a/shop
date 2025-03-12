import { Input } from "@heroui/react";
import { Search } from "lucide-react";

interface SearchbarProps {
  isMobile?: boolean;
}

const Searchbar = ({ isMobile = false }: SearchbarProps) => {
  return (
<form className={`relative w-full ${isMobile ? "w-40" : "w-full max-w-md"}`}>
  <div className="relative w-full">
    <input
      type="search"
      placeholder="ค้นหาสินค้า..."
      className="pl-10 pr-4 py-2 w-full rounded-full text-gray-700 focus:outline-none focus:ring-1 focus:ring-red-500 transition-all duration-300 shadow-sm bg-transparent border border-gray-200 hover:border-gray-700"
    />
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
  </div>
</form>
  );
};

export default Searchbar;