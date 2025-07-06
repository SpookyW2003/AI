import React, { useState } from 'react';
import { X, User, ShoppingBag, Newspaper, Music, Video, Settings } from 'lucide-react';

interface PreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  preferences: {
    interests: string[];
    priceRange: [number, number];
    contentTypes: string[];
    notifications: boolean;
  };
  onSave: (preferences: any) => void;
}

const PreferencesModal: React.FC<PreferencesModalProps> = ({
  isOpen,
  onClose,
  preferences,
  onSave,
}) => {
  const [localPreferences, setLocalPreferences] = useState(preferences);

  const interests = [
    'Technology', 'Fashion', 'Sports', 'Travel', 'Food', 'Health',
    'Business', 'Entertainment', 'Science', 'Art', 'Music', 'Gaming'
  ];

  const contentTypes = [
    { id: 'products', name: 'Products', icon: ShoppingBag },
    { id: 'news', name: 'News', icon: Newspaper },
    { id: 'music', name: 'Music', icon: Music },
    { id: 'entertainment', name: 'Entertainment', icon: Video },
  ];

  const handleSave = () => {
    onSave(localPreferences);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <Settings className="w-5 h-5 mr-2" />
            Personalization Preferences
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Interests */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Interests</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {interests.map((interest) => (
                <button
                  key={interest}
                  onClick={() => {
                    const newInterests = localPreferences.interests.includes(interest)
                      ? localPreferences.interests.filter(i => i !== interest)
                      : [...localPreferences.interests, interest];
                    setLocalPreferences({ ...localPreferences, interests: newInterests });
                  }}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    localPreferences.interests.includes(interest)
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Price Range</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Budget Range: ${localPreferences.priceRange[0]} - ${localPreferences.priceRange[1]}
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={localPreferences.priceRange[0]}
                    onChange={(e) => setLocalPreferences({
                      ...localPreferences,
                      priceRange: [parseInt(e.target.value), localPreferences.priceRange[1]]
                    })}
                    className="flex-1"
                  />
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={localPreferences.priceRange[1]}
                    onChange={(e) => setLocalPreferences({
                      ...localPreferences,
                      priceRange: [localPreferences.priceRange[0], parseInt(e.target.value)]
                    })}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Content Types */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Content Types</h3>
            <div className="grid grid-cols-2 gap-3">
              {contentTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => {
                      const newTypes = localPreferences.contentTypes.includes(type.id)
                        ? localPreferences.contentTypes.filter(t => t !== type.id)
                        : [...localPreferences.contentTypes, type.id];
                      setLocalPreferences({ ...localPreferences, contentTypes: newTypes });
                    }}
                    className={`p-4 rounded-lg border-2 transition-all flex items-center space-x-3 ${
                      localPreferences.contentTypes.includes(type.id)
                        ? 'border-purple-500 bg-purple-50 text-purple-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{type.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Notifications */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Notifications</h3>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={localPreferences.notifications}
                onChange={(e) => setLocalPreferences({
                  ...localPreferences,
                  notifications: e.target.checked
                })}
                className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
              />
              <span className="text-gray-700">Send me personalized recommendations</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreferencesModal;