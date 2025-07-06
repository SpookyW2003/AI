import React, { useState } from 'react';
import { Heart, Bookmark, Share2, Star, Eye, TrendingUp } from 'lucide-react';

interface RecommendationCardProps {
  item: {
    id: string;
    title: string;
    description: string;
    category: string;
    image: string;
    price?: string;
    originalPrice?: string;
    rating?: number;
    views?: number;
    trending?: boolean;
    source?: string;
    tags?: string[];
  };
  onLike: (id: string) => void;
  onSave: (id: string) => void;
  isLiked: boolean;
  isSaved: boolean;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({
  item,
  onLike,
  onSave,
  isLiked,
  isSaved,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {item.trending && (
          <div className="absolute top-2 left-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">
            <TrendingUp className="w-3 h-3 mr-1" />
            Trending
          </div>
        )}
        {item.originalPrice && item.price && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            {Math.round(((parseFloat(item.originalPrice.replace('$', '')) - parseFloat(item.price.replace('$', ''))) / parseFloat(item.originalPrice.replace('$', ''))) * 100)}% OFF
          </div>
        )}
        <div className={`absolute top-2 right-2 flex space-x-1 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <button
            onClick={() => onLike(item.id)}
            className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
              isLiked ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white'
            }`}
          >
            <Heart className="w-4 h-4" />
          </button>
          <button
            onClick={() => onSave(item.id)}
            className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
              isSaved ? 'bg-blue-500 text-white' : 'bg-white/80 text-gray-600 hover:bg-blue-500 hover:text-white'
            }`}
          >
            <Bookmark className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 flex-1">{item.title}</h3>
          {item.rating && (
            <div className="flex items-center ml-2">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-600 ml-1">{item.rating}</span>
            </div>
          )}
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>

        {item.tags && (
          <div className="flex flex-wrap gap-1 mb-3">
            {item.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {item.price && (
              <span className="text-lg font-bold text-gray-900">{item.price}</span>
            )}
            {item.originalPrice && (
              <span className="text-sm text-gray-500 line-through">{item.originalPrice}</span>
            )}
            {item.source && (
              <span className="text-xs text-gray-500">{item.source}</span>
            )}
          </div>

          <div className="flex items-center space-x-2">
            {item.views && (
              <div className="flex items-center text-gray-500">
                <Eye className="w-4 h-4 mr-1" />
                <span className="text-xs">{item.views.toLocaleString()}</span>
              </div>
            )}
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;