
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PodcastGrid from '@/components/podcast/PodcastGrid';
import SearchPodcast from '@/components/podcast/SearchPodcast';
import { Button } from '@/components/ui/button';
import { getNewPodcasts, getPopularPodcasts, mockPodcasts } from '@/data/mockPodcasts';

const Home = () => {
  const navigate = useNavigate();
  const newPodcasts = getNewPodcasts().slice(0, 4);
  const popularPodcasts = getPopularPodcasts().slice(0, 4);
  const recentPodcasts = [...mockPodcasts].sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  ).slice(0, 8);
  
  const handleSearch = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };
  
  const categories = Array.from(new Set(mockPodcasts.map(podcast => podcast.category)));
  
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="rounded-2xl overflow-hidden relative">
        <div className="absolute inset-0 bg-podcast-gradient opacity-90 z-0"></div>
        <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center">
          <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Discover Amazing Podcasts
            </h1>
            <p className="text-lg mb-6 text-white/90 max-w-xl">
              Find, listen, and engage with thousands of podcasts on topics that matter to you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <SearchPodcast 
                onSearch={handleSearch} 
                className="max-w-md" 
                placeholder="Search for podcasts..."
              />
              <Button onClick={() => navigate('/browse')} variant="secondary">
                Browse All
              </Button>
            </div>
          </div>
          <div className="md:w-1/3 flex justify-center">
            <div className="relative w-48 h-48 md:w-64 md:h-64">
              <img 
                src={popularPodcasts[0]?.coverImage} 
                alt="Featured Podcast" 
                className="absolute top-0 left-0 w-32 h-32 md:w-40 md:h-40 object-cover rounded-lg transform rotate-[-8deg] shadow-lg"
              />
              <img 
                src={popularPodcasts[1]?.coverImage} 
                alt="Featured Podcast" 
                className="absolute top-4 right-0 w-32 h-32 md:w-40 md:h-40 object-cover rounded-lg transform rotate-[5deg] shadow-lg"
              />
              <img 
                src={popularPodcasts[2]?.coverImage} 
                alt="Featured Podcast" 
                className="absolute bottom-0 left-8 w-32 h-32 md:w-40 md:h-40 object-cover rounded-lg transform rotate-[10deg] shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* New Releases */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">New Releases</h2>
          <Button variant="link" onClick={() => navigate('/browse?filter=new')}>
            View All
          </Button>
        </div>
        <PodcastGrid podcasts={newPodcasts} columns={4} />
      </section>
      
      {/* Popular Podcasts */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Popular Podcasts</h2>
          <Button variant="link" onClick={() => navigate('/browse?filter=popular')}>
            View All
          </Button>
        </div>
        <PodcastGrid podcasts={popularPodcasts} columns={4} />
      </section>
      
      {/* Recent Episodes */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Recent Episodes</h2>
          <Button variant="link" onClick={() => navigate('/browse')}>
            View All
          </Button>
        </div>
        <PodcastGrid podcasts={recentPodcasts} columns={4} />
      </section>
      
      {/* Categories */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Browse by Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {categories.map(category => (
            <Button
              key={category}
              variant="outline"
              className="h-auto py-4 justify-start bg-muted/50 hover:bg-muted"
              onClick={() => navigate(`/browse?category=${encodeURIComponent(category)}`)}
            >
              {category}
            </Button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
