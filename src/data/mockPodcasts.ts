
export interface PodcastData {
  id: string;
  title: string;
  creator: string;
  coverImage: string;
  description: string;
  category: string;
  duration: string;
  publishedAt: string;
  isNew?: boolean;
  isPopular?: boolean;
  isFavorite?: boolean;
  audioSrc: string;
  videoSrc?: string;
  isVideo?: boolean;
}

// Mock podcast data
export const mockPodcasts: PodcastData[] = [
  {
    id: '1',
    title: 'The Future of AI in Everyday Life',
    creator: 'Tech Visionaries',
    coverImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80',
    description: 'Exploring how artificial intelligence is becoming integrated into our daily lives and what the future holds.',
    category: 'Technology',
    duration: '45:22',
    publishedAt: '2023-09-15',
    isNew: true,
    isPopular: true,
    audioSrc: '/audio/podcast-1.mp3',
    videoSrc: '/video/podcast-1.mp4',
    isVideo: true
  },
  {
    id: '2',
    title: 'Mindfulness Meditation for Beginners',
    creator: 'Wellness Journey',
    coverImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    description: 'A gentle introduction to mindfulness meditation practices for beginners looking to reduce stress.',
    category: 'Wellness',
    duration: '32:10',
    publishedAt: '2023-09-10',
    isPopular: true,
    audioSrc: '/audio/podcast-2.mp3'
  },
  {
    id: '3',
    title: 'The History of Ancient Civilizations',
    creator: 'History Uncovered',
    coverImage: 'https://images.unsplash.com/photo-1605726384030-027f7968e11f?auto=format&fit=crop&w=800&q=80',
    description: 'Diving into the fascinating stories and mysteries of ancient civilizations from around the world.',
    category: 'History',
    duration: '58:45',
    publishedAt: '2023-09-08',
    audioSrc: '/audio/podcast-3.mp3',
    videoSrc: '/video/podcast-3.mp4',
    isVideo: true
  },
  {
    id: '4',
    title: 'Financial Freedom: Investment Strategies',
    creator: 'Wealth Wisdom',
    coverImage: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80',
    description: 'Expert advice on investment strategies to help you achieve financial independence.',
    category: 'Finance',
    duration: '41:33',
    publishedAt: '2023-09-05',
    isNew: true,
    audioSrc: '/audio/podcast-4.mp3'
  },
  {
    id: '5',
    title: 'The Science of Sleep',
    creator: 'Health Matters',
    coverImage: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80',
    description: 'Understanding the importance of sleep and how to improve your sleep quality for better health.',
    category: 'Health',
    duration: '36:18',
    publishedAt: '2023-09-01',
    isPopular: true,
    audioSrc: '/audio/podcast-5.mp3'
  },
  {
    id: '6',
    title: 'Creative Writing Workshop',
    creator: 'Literary Lights',
    coverImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80',
    description: 'Practical tips and exercises to enhance your creative writing skills and overcome writer\'s block.',
    category: 'Arts',
    duration: '49:27',
    publishedAt: '2023-08-28',
    audioSrc: '/audio/podcast-6.mp3',
    videoSrc: '/video/podcast-6.mp4',
    isVideo: true
  },
  {
    id: '7',
    title: 'Sustainable Living in Urban Areas',
    creator: 'Eco Enthusiasts',
    coverImage: 'https://images.unsplash.com/photo-1518553552028-b394b81e4cf7?auto=format&fit=crop&w=800&q=80',
    description: 'Practical ways to lead a more sustainable lifestyle while living in a city environment.',
    category: 'Environment',
    duration: '38:54',
    publishedAt: '2023-08-25',
    isNew: true,
    audioSrc: '/audio/podcast-7.mp3'
  },
  {
    id: '8',
    title: 'True Crime: The Unsolved Cases',
    creator: 'Mystery Chronicles',
    coverImage: 'https://images.unsplash.com/photo-1453873531674-2151bcd01707?auto=format&fit=crop&w=800&q=80',
    description: 'Examining famous unsolved mysteries and criminal cases that continue to baffle investigators.',
    category: 'True Crime',
    duration: '52:19',
    publishedAt: '2023-08-20',
    isPopular: true,
    audioSrc: '/audio/podcast-8.mp3',
    videoSrc: '/video/podcast-8.mp4',
    isVideo: true
  },
  {
    id: '9',
    title: 'The Art of Public Speaking',
    creator: 'Communication Masters',
    coverImage: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80',
    description: 'Master the fundamentals of effective public speaking and overcome presentation anxiety.',
    category: 'Self-Development',
    duration: '44:05',
    publishedAt: '2023-08-18',
    audioSrc: '/audio/podcast-9.mp3'
  },
  {
    id: '10',
    title: 'Space Exploration: Journey to Mars',
    creator: 'Cosmic Ventures',
    coverImage: 'https://images.unsplash.com/photo-1614642264762-d0a3b8bf3700?auto=format&fit=crop&w=800&q=80',
    description: 'The latest developments in space exploration and the mission to send humans to Mars.',
    category: 'Science',
    duration: '56:40',
    publishedAt: '2023-08-15',
    isNew: true,
    isPopular: true,
    audioSrc: '/audio/podcast-10.mp3',
    videoSrc: '/video/podcast-10.mp4',
    isVideo: true
  },
  {
    id: '11',
    title: 'Culinary Adventures Around the World',
    creator: 'Global Gourmets',
    coverImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80',
    description: 'Exploring diverse culinary traditions and signature dishes from different cultures worldwide.',
    category: 'Food',
    duration: '39:12',
    publishedAt: '2023-08-10',
    audioSrc: '/audio/podcast-11.mp3'
  },
  {
    id: '12',
    title: 'Entrepreneurship: From Idea to Success',
    creator: 'Business Builders',
    coverImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
    description: 'Real stories and practical advice from successful entrepreneurs on building a thriving business.',
    category: 'Business',
    duration: '48:33',
    publishedAt: '2023-08-05',
    isPopular: true,
    audioSrc: '/audio/podcast-12.mp3',
    videoSrc: '/video/podcast-12.mp4',
    isVideo: true
  },
  {
    id: '13',
    title: 'Psychology of Human Relationships',
    creator: 'Mind Matters',
    coverImage: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?auto=format&fit=crop&w=800&q=80',
    description: 'Understanding the psychological factors that influence our relationships and interactions.',
    category: 'Psychology',
    duration: '43:21',
    publishedAt: '2023-08-01',
    audioSrc: '/audio/podcast-13.mp3'
  },
  {
    id: '14',
    title: 'Fitness Revolution: New Training Methods',
    creator: 'Active Life',
    coverImage: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80',
    description: 'Innovative fitness approaches and training methods to transform your exercise routine.',
    category: 'Fitness',
    duration: '35:48',
    publishedAt: '2023-07-28',
    isNew: true,
    audioSrc: '/audio/podcast-14.mp3',
    videoSrc: '/video/podcast-14.mp4',
    isVideo: true
  },
  {
    id: '15',
    title: 'Digital Marketing Strategies for 2023',
    creator: 'Marketing Mavericks',
    coverImage: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=800&q=80',
    description: 'Cutting-edge digital marketing techniques and trends to help your business thrive online.',
    category: 'Marketing',
    duration: '47:15',
    publishedAt: '2023-07-25',
    isPopular: true,
    audioSrc: '/audio/podcast-15.mp3'
  },
  {
    id: '16',
    title: 'Philosophy of Modern Existence',
    creator: 'Deep Thinkers',
    coverImage: 'https://images.unsplash.com/photo-1473654729523-203e25dfda10?auto=format&fit=crop&w=800&q=80',
    description: 'Contemplating philosophical questions and perspectives relevant to our modern world.',
    category: 'Philosophy',
    duration: '54:09',
    publishedAt: '2023-07-20',
    audioSrc: '/audio/podcast-16.mp3',
    videoSrc: '/video/podcast-16.mp4',
    isVideo: true
  },
  {
    id: '17',
    title: 'Wildlife Conservation Efforts',
    creator: 'Nature Advocates',
    coverImage: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?auto=format&fit=crop&w=800&q=80',
    description: 'Highlighting important conservation projects and efforts to protect endangered species.',
    category: 'Environment',
    duration: '42:37',
    publishedAt: '2023-07-15',
    isNew: true,
    audioSrc: '/audio/podcast-17.mp3'
  },
  {
    id: '18',
    title: 'The Evolution of Modern Music',
    creator: 'Sound Explorers',
    coverImage: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=80',
    description: 'Tracing the development and influences in contemporary music across different genres.',
    category: 'Music',
    duration: '51:24',
    publishedAt: '2023-07-10',
    isPopular: true,
    audioSrc: '/audio/podcast-18.mp3',
    videoSrc: '/video/podcast-18.mp4',
    isVideo: true
  },
  {
    id: '19',
    title: 'The Science of Happiness',
    creator: 'Positive Psychology',
    coverImage: 'https://images.unsplash.com/photo-1531579234-a0a99da45161?auto=format&fit=crop&w=800&q=80',
    description: 'Research-based insights into what contributes to genuine happiness and well-being.',
    category: 'Psychology',
    duration: '37:51',
    publishedAt: '2023-07-05',
    audioSrc: '/audio/podcast-19.mp3'
  },
  {
    id: '20',
    title: 'Virtual Reality: The New Frontier',
    creator: 'Tech Innovators',
    coverImage: 'https://images.unsplash.com/photo-1626387346567-68d0b1ee4f58?auto=format&fit=crop&w=800&q=80',
    description: 'Exploring the latest advancements in virtual reality technology and its applications.',
    category: 'Technology',
    duration: '49:55',
    publishedAt: '2023-07-01',
    isNew: true,
    isPopular: true,
    audioSrc: '/audio/podcast-20.mp3',
    videoSrc: '/video/podcast-20.mp4',
    isVideo: true
  }
];

// Function to get podcasts by category
export const getPodcastsByCategory = (category: string) => {
  return mockPodcasts.filter(podcast => podcast.category === category);
};

// Function to get new podcasts
export const getNewPodcasts = () => {
  return mockPodcasts.filter(podcast => podcast.isNew);
};

// Function to get popular podcasts
export const getPopularPodcasts = () => {
  return mockPodcasts.filter(podcast => podcast.isPopular);
};

// Function to search podcasts
export const searchPodcasts = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return mockPodcasts.filter(podcast => 
    podcast.title.toLowerCase().includes(lowercaseQuery) || 
    podcast.creator.toLowerCase().includes(lowercaseQuery) ||
    podcast.description.toLowerCase().includes(lowercaseQuery) ||
    podcast.category.toLowerCase().includes(lowercaseQuery)
  );
};

// Function to get a podcast by id
export const getPodcastById = (id: string) => {
  return mockPodcasts.find(podcast => podcast.id === id);
};
