import { Search } from 'lucide-react';

export default function SearchBar() {
  return (
    <div className="relative flex-1 max-w-2xl">
      <input
        type="text"
        placeholder="Search..."
        className="w-full bg-gray-800 text-white rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-gray-700"
      />
      <Search 
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
        size={18} 
      />
    </div>
  );
}
