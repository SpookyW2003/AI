import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CategoryFilter from './components/CategoryFilter';
import RecommendationCard from './components/RecommendationCard';
import PreferencesModal from './components/PreferencesModal';
import { mockRecommendations, generatePersonalizedRecommendations } from './data/mockData';

function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [likedItems, setLikedItems] = useState<string[]>([]);
  const [savedItems, setSavedItems] = useState<string[]>([]);
  const [viewHistory, setViewHistory] = useState<string[]>([]);

  const [preferences, setPreferences] = useState({
    interests: ['Technology', 'Entertainment'],
    priceRange: [0, 500] as [number, number],
    contentTypes: ['products', 'news', 'music', 'entertainment'],
    notifications: true,
  });

  const [personalizedRecommendations, setPersonalizedRecommendations] = useState(mockRecommendations);

  // Update recommendations when preferences or user behavior changes
  useEffect(() => {
    const newRecommendations = generatePersonalizedRecommendations(
      preferences,
      { likedItems, savedItems, viewHistory }
    );
    setPersonalizedRecommendations(newRecommendations);
  }, [preferences, likedItems, savedItems, viewHistory]);

  // Filter recommendations based on category and search
  const filteredRecommendations = personalizedRecommendations.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
    
    return matchesCategory && matchesSearch;
  });

  const handleLike = (itemId: string) => {
    setLikedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSave = (itemId: string) => {
    setSavedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handlePreferencesSave = (newPreferences: typeof preferences) => {
    setPreferences(newPreferences);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onPreferencesClick={() => setIsPreferencesOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      
      <CategoryFilter
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* AI Insights Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-6 text-white">
            <h2 className="text-2xl font-bold mb-2">AI-Powered Recommendations</h2>
            <p className="text-purple-100 mb-4">
              Based on your preferences and behavior, we've curated {filteredRecommendations.length} personalized recommendations for you.
            </p>
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-white rounded-full"></div>
                <span>{preferences.interests.length} interests matched</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-white rounded-full"></div>
                <span>{likedItems.length} items liked</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-white rounded-full"></div>
                <span>{savedItems.length} items saved</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRecommendations.map((item) => (
            <RecommendationCard
              key={item.id}
              item={item}
              onLike={handleLike}
              onSave={handleSave}
              isLiked={likedItems.includes(item.id)}
              isSaved={savedItems.includes(item.id)}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredRecommendations.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="text-gray-400 text-2xl">🔍</div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No recommendations found</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Try adjusting your search terms or category filters to find more personalized recommendations.
            </p>
          </div>
        )}
      </main>

      <PreferencesModal
        isOpen={isPreferencesOpen}
        onClose={() => setIsPreferencesOpen(false)}
        preferences={preferences}
        onSave={handlePreferencesSave}
      />
    </div>
  );
}

export default App;