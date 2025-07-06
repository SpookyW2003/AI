export const mockRecommendations = [
  // Products
  {
    id: '1',
    title: 'Wireless Noise-Cancelling Headphones',
    description: 'Premium audio quality with active noise cancellation and 30-hour battery life.',
    category: 'products',
    image: 'https://images.pexels.com/photos/3945669/pexels-photo-3945669.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: '$199',
    originalPrice: '$299',
    rating: 4.8,
    trending: true,
    tags: ['Electronics', 'Audio', 'Technology']
  },
  {
    id: '2',
    title: 'Smart Fitness Watch',
    description: 'Track your health and fitness goals with advanced sensors and smartphone integration.',
    category: 'products',
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: '$249',
    originalPrice: '$329',
    rating: 4.6,
    tags: ['Fitness', 'Technology', 'Health']
  },
  {
    id: '3',
    title: 'Ergonomic Office Chair',
    description: 'Designed for long hours of comfortable working with lumbar support and adjustable height.',
    category: 'products',
    image: 'https://images.pexels.com/photos/586078/pexels-photo-586078.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: '$179',
    rating: 4.5,
    tags: ['Office', 'Furniture', 'Ergonomics']
  },
  
  // News
  {
    id: '4',
    title: 'AI Revolution in Healthcare: New Breakthrough in Disease Detection',
    description: 'Scientists develop AI system that can detect diseases 90% faster than traditional methods.',
    category: 'news',
    image: 'https://images.pexels.com/photos/3825592/pexels-photo-3825592.jpeg?auto=compress&cs=tinysrgb&w=600',
    source: 'TechNews',
    views: 15420,
    trending: true,
    tags: ['Technology', 'Healthcare', 'AI']
  },
  {
    id: '5',
    title: 'Climate Change Solutions: Innovative Green Technologies',
    description: 'Exploring cutting-edge renewable energy solutions that could transform our planet.',
    category: 'news',
    image: 'https://images.pexels.com/photos/414943/pexels-photo-414943.jpeg?auto=compress&cs=tinysrgb&w=600',
    source: 'EcoWorld',
    views: 8750,
    tags: ['Environment', 'Climate', 'Technology']
  },
  {
    id: '6',
    title: 'Global Economic Trends: Markets React to Tech Innovation',
    description: 'Analysis of how emerging technologies are reshaping global financial markets.',
    category: 'news',
    image: 'https://images.pexels.com/photos/7654579/pexels-photo-7654579.jpeg?auto=compress&cs=tinysrgb&w=600',
    source: 'FinanceDaily',
    views: 12300,
    tags: ['Finance', 'Economy', 'Markets']
  },

  // Music
  {
    id: '7',
    title: 'Midnight Echoes - Electronic Dreams',
    description: 'Ambient electronic music perfect for late-night focus sessions and creative work.',
    category: 'music',
    image: 'https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.9,
    views: 245000,
    trending: true,
    tags: ['Electronic', 'Ambient', 'Instrumental']
  },
  {
    id: '8',
    title: 'Jazz Fusion Classics - Modern Interpretations',
    description: 'Contemporary jazz fusion artists reimagining classic compositions with modern flair.',
    category: 'music',
    image: 'https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.7,
    views: 89000,
    tags: ['Jazz', 'Fusion', 'Contemporary']
  },
  {
    id: '9',
    title: 'Indie Rock Rising - New Voices',
    description: 'Discover emerging indie rock artists pushing the boundaries of the genre.',
    category: 'music',
    image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.4,
    views: 156000,
    tags: ['Indie', 'Rock', 'Alternative']
  },

  // Entertainment
  {
    id: '10',
    title: 'The Future Chronicles - Sci-Fi Series',
    description: 'A mind-bending journey through time and space exploring humanity\'s future.',
    category: 'entertainment',
    image: 'https://images.pexels.com/photos/436413/pexels-photo-436413.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.8,
    views: 2400000,
    trending: true,
    tags: ['Sci-Fi', 'Drama', 'Series']
  },
  {
    id: '11',
    title: 'Culinary Masters - Chef Competition',
    description: 'Top chefs compete in the ultimate culinary challenge with mystery ingredients.',
    category: 'entertainment',
    image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.5,
    views: 890000,
    tags: ['Cooking', 'Competition', 'Reality']
  },
  {
    id: '12',
    title: 'Nature\'s Wonders - Wildlife Documentary',
    description: 'Stunning cinematography reveals the secret lives of animals in their natural habitats.',
    category: 'entertainment',
    image: 'https://images.pexels.com/photos/39857/zebras-zebra-wildlife-africa-39857.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.9,
    views: 1200000,
    tags: ['Documentary', 'Nature', 'Wildlife']
  }
];

export const generatePersonalizedRecommendations = (
  preferences: {
    interests: string[];
    priceRange: [number, number];
    contentTypes: string[];
    notifications: boolean;
  },
  userBehavior: {
    likedItems: string[];
    savedItems: string[];
    viewHistory: string[];
  }
) => {
  // Simple AI-like scoring algorithm
  return mockRecommendations.map(item => {
    let score = 0;
    
    // Interest matching
    const itemTags = item.tags || [];
    const interestMatches = preferences.interests.filter(interest => 
      itemTags.some(tag => tag.toLowerCase().includes(interest.toLowerCase()))
    );
    score += interestMatches.length * 10;
    
    // Price range matching for products
    if (item.category === 'products' && item.price) {
      const price = parseInt(item.price.replace('$', ''));
      if (price >= preferences.priceRange[0] && price <= preferences.priceRange[1]) {
        score += 15;
      }
    }
    
    // Content type preference
    if (preferences.contentTypes.includes(item.category)) {
      score += 20;
    }
    
    // Trending bonus
    if (item.trending) {
      score += 5;
    }
    
    // User behavior influence
    if (userBehavior.likedItems.includes(item.id)) {
      score += 25;
    }
    if (userBehavior.savedItems.includes(item.id)) {
      score += 20;
    }
    
    return { ...item, aiScore: score };
  })
  .sort((a, b) => b.aiScore - a.aiScore);
};