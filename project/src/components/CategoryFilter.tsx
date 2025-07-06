import React from 'react';
import { ShoppingBag, Newspaper, Music, Video, Star, TrendingUp } from 'lucide-react';

interface CategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { id: 'all', name: 'All', icon: Star },
  { id: 'products', name: 'Products', icon: ShoppingBag },
  { id: 'news', name: 'News', icon: Newspaper },
  { id: 'music', name: 'Music', icon: Music },
  { id: 'entertainment', name: 'Entertainment', icon: Video },
  { id: 'trending', name: 'Trending', icon: TrendingUp },
];

const CategoryFilter: React.FC<CategoryFilterProps> = ({ activeCategory, onCategoryChange }) => {
  return (
    <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8 overflow-x-auto py-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                  activeCategory === category.id
                    ? 'bg-purple-100 text-purple-700 border-2 border-purple-200'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;