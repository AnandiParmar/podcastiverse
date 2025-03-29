
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PodcastGrid from '@/components/podcast/PodcastGrid';
import SearchPodcast from '@/components/podcast/SearchPodcast';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, Sparkles, Headphones, Clock, Trophy, Fire } from 'lucide-react';
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
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="rounded-2xl overflow-hidden relative">
        <div className="absolute inset-0 bg-podcast-gradient opacity-90 z-0"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute left-1/4 top-1/3 w-96 h-96 rounded-full bg-white/20 blur-3xl"></div>
          <div className="absolute right-1/3 bottom-1/4 w-80 h-80 rounded-full bg-podcast-highlight/20 blur-3xl"></div>
        </div>
        <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center">
          <div className="md:w-2/3 mb-10 md:mb-0 md:pr-8">
            <div className="inline-block px-4 py-1 bg-white/20 rounded-full text-white mb-4 backdrop-blur-sm">
              <span className="flex items-center text-sm">
                <Sparkles className="h-4 w-4 mr-2" />
                Discover amazing podcasts
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
              Your World of <span className="relative inline-block">
                Podcasts
                <span className="absolute bottom-1 left-0 w-full h-1 bg-podcast-highlight rounded-full"></span>
              </span>
            </h1>
            <p className="text-lg mb-8 text-white/90 max-w-xl">
              Find, listen, and engage with thousands of podcasts on topics that matter to you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <SearchPodcast 
                onSearch={handleSearch} 
                className="max-w-md backdrop-blur-sm" 
                placeholder="Search for podcasts..."
              />
              <Button 
                onClick={() => navigate('/browse')} 
                className="bg-white text-podcast-primary hover:bg-white/90"
              >
                Browse All Podcasts
              </Button>
            </div>
          </div>
          <div className="md:w-1/3 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <img 
                src={popularPodcasts[0]?.coverImage} 
                alt="Featured Podcast" 
                className="absolute top-0 left-0 w-40 h-40 md:w-48 md:h-48 object-cover rounded-lg transform rotate-[-8deg] shadow-[0_20px_25px_-5px_rgba(0,0,0,0.3)] border-4 border-white/20 hover:scale-105 transition-transform"
              />
              <img 
                src={popularPodcasts[1]?.coverImage} 
                alt="Featured Podcast" 
                className="absolute top-5 right-0 w-40 h-40 md:w-48 md:h-48 object-cover rounded-lg transform rotate-[5deg] shadow-[0_20px_25px_-5px_rgba(0,0,0,0.3)] border-4 border-white/20 hover:scale-105 transition-transform z-10"
              />
              <img 
                src={popularPodcasts[2]?.coverImage} 
                alt="Featured Podcast" 
                className="absolute bottom-0 left-10 w-40 h-40 md:w-48 md:h-48 object-cover rounded-lg transform rotate-[10deg] shadow-[0_20px_25px_-5px_rgba(0,0,0,0.3)] border-4 border-white/20 hover:scale-105 transition-transform"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { icon: Headphones, title: '10,000+', description: 'Podcasts' },
          { icon: Clock, title: '50,000+', description: 'Hours of Content' },
          { icon: Trophy, title: '500+', description: 'Top Creators' },
          { icon: Fire, title: '2M+', description: 'Monthly Listeners' },
        ].map((stat, index) => (
          <div 
            key={index} 
            className="bg-card/40 border border-border/30 rounded-xl p-6 text-center hover:bg-card/60 transition-colors"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-podcast-gradient mb-4">
              <stat.icon className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-1">{stat.title}</h3>
            <p className="text-muted-foreground">{stat.description}</p>
          </div>
        ))}
      </section>
      
      {/* New Releases */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-podcast-primary" />
              New Releases
            </h2>
            <p className="text-muted-foreground mt-1">Fresh content just for you</p>
          </div>
          <Button 
            variant="ghost" 
            className="flex items-center" 
            onClick={() => navigate('/browse?filter=new')}
          >
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        <div className="bg-card/30 rounded-xl p-6 border border-border/30">
          <PodcastGrid podcasts={newPodcasts} columns={4} />
        </div>
      </section>
      
      {/* Popular Podcasts */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold flex items-center">
              <Fire className="h-5 w-5 mr-2 text-podcast-highlight" />
              Popular Podcasts
            </h2>
            <p className="text-muted-foreground mt-1">What others are listening to</p>
          </div>
          <Button 
            variant="ghost" 
            className="flex items-center" 
            onClick={() => navigate('/browse?filter=popular')}
          >
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        <div className="bg-card/30 rounded-xl p-6 border border-border/30">
          <PodcastGrid podcasts={popularPodcasts} columns={4} />
        </div>
      </section>
      
      {/* Recent Episodes */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold flex items-center">
              <Clock className="h-5 w-5 mr-2 text-podcast-primary" />
              Recent Episodes
            </h2>
            <p className="text-muted-foreground mt-1">Latest updates from your favorite shows</p>
          </div>
          <Button 
            variant="ghost" 
            className="flex items-center" 
            onClick={() => navigate('/browse')}
          >
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        <div className="bg-card/30 rounded-xl p-6 border border-border/30">
          <PodcastGrid podcasts={recentPodcasts} columns={4} />
        </div>
      </section>
      
      {/* Categories Section */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">Browse by Categories</h2>
            <p className="text-muted-foreground mt-1">Find podcasts in your favorite topics</p>
          </div>
          <Button 
            variant="ghost" 
            className="flex items-center" 
            onClick={() => navigate('/categories')}
          >
            All Categories <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.slice(0, 6).map(category => (
            <Button
              key={category}
              variant="outline"
              className="h-auto py-5 justify-center flex-col gap-2 bg-card/30 hover:bg-card/60 border-border/30 transition-colors"
              onClick={() => navigate(`/browse?category=${encodeURIComponent(category)}`)}
            >
              <span className="text-base font-medium">{category}</span>
            </Button>
          ))}
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="relative overflow-hidden rounded-2xl bg-podcast-dark border border-podcast-primary/20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute left-1/4 top-1/3 w-96 h-96 rounded-full bg-podcast-highlight/30 blur-3xl"></div>
          <div className="absolute right-1/3 bottom-1/4 w-80 h-80 rounded-full bg-podcast-primary/30 blur-3xl"></div>
        </div>
        <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 podcast-gradient-text">Ready to start your own podcast?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl">
              Join our community of creators and share your voice with the world. It's easier than you think to get started.
            </p>
            <Button 
              onClick={() => navigate('/add-podcast')}
              className="bg-podcast-gradient hover:opacity-90 transition-opacity"
              size="lg"
            >
              <Mic className="mr-2 h-5 w-5" />
              Start Your Podcast Journey
            </Button>
          </div>
          <img 
            src="https://source.unsplash.com/random/600x400?microphone,podcast,studio" 
            alt="Podcast Studio" 
            className="rounded-lg shadow-2xl max-w-xs md:max-w-sm object-cover" 
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
