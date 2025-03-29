
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import PodcastGrid from '@/components/podcast/PodcastGrid';
import SearchPodcast from '@/components/podcast/SearchPodcast';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  mockPodcasts,
  getNewPodcasts,
  getPopularPodcasts,
  getPodcastsByCategory
} from '@/data/mockPodcasts';

const Browse = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filterParam = searchParams.get('filter');
  const categoryParam = searchParams.get('category');
  
  const [activeFilter, setActiveFilter] = React.useState<string>(
    filterParam || 'all'
  );
  
  const [selectedCategory, setSelectedCategory] = React.useState<string>(
    categoryParam || 'all'
  );
  
  const [searchQuery, setSearchQuery] = React.useState('');
  
  const categories = Array.from(
    new Set(['all', ...mockPodcasts.map(podcast => podcast.category)])
  );
  
  const filteredPodcasts = React.useMemo(() => {
    let podcasts = [...mockPodcasts];
    
    // Apply filter
    if (activeFilter === 'new') {
      podcasts = getNewPodcasts();
    } else if (activeFilter === 'popular') {
      podcasts = getPopularPodcasts();
    } else if (activeFilter === 'video') {
      podcasts = mockPodcasts.filter(podcast => podcast.isVideo);
    }
    
    // Apply category filter if not 'all'
    if (selectedCategory !== 'all') {
      podcasts = podcasts.filter(podcast => podcast.category === selectedCategory);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      podcasts = podcasts.filter(podcast => 
        podcast.title.toLowerCase().includes(query) || 
        podcast.creator.toLowerCase().includes(query) ||
        podcast.description.toLowerCase().includes(query)
      );
    }
    
    return podcasts;
  }, [activeFilter, selectedCategory, searchQuery]);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  
  const handleFilterChange = (value: string) => {
    setActiveFilter(value);
    searchParams.set('filter', value);
    if (selectedCategory !== 'all') {
      searchParams.set('category', selectedCategory);
    } else {
      searchParams.delete('category');
    }
    setSearchParams(searchParams);
  };
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category !== 'all') {
      searchParams.set('category', category);
    } else {
      searchParams.delete('category');
    }
    if (activeFilter !== 'all') {
      searchParams.set('filter', activeFilter);
    }
    setSearchParams(searchParams);
  };
  
  React.useEffect(() => {
    if (filterParam) {
      setActiveFilter(filterParam);
    }
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [filterParam, categoryParam]);
  
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Browse Podcasts</h1>
      
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <SearchPodcast 
          onSearch={handleSearch} 
          className="w-full md:w-80" 
        />
        
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0">
          <span className="text-sm text-muted-foreground whitespace-nowrap">
            Category:
          </span>
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="h-8 rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <Tabs defaultValue={activeFilter} value={activeFilter} onValueChange={handleFilterChange}>
        <TabsList className="w-full md:w-auto">
          <TabsTrigger value="all">All Podcasts</TabsTrigger>
          <TabsTrigger value="new">New Releases</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
          <TabsTrigger value="video">Video Podcasts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <PodcastGrid 
            podcasts={filteredPodcasts} 
            columns={5}
          />
        </TabsContent>
        
        <TabsContent value="new" className="mt-6">
          <PodcastGrid 
            podcasts={filteredPodcasts} 
            columns={5}
          />
        </TabsContent>
        
        <TabsContent value="popular" className="mt-6">
          <PodcastGrid 
            podcasts={filteredPodcasts} 
            columns={5}
          />
        </TabsContent>
        
        <TabsContent value="video" className="mt-6">
          <PodcastGrid 
            podcasts={filteredPodcasts} 
            columns={5}
          />
        </TabsContent>
      </Tabs>
      
      {filteredPodcasts.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No podcasts found</h3>
          <p className="text-muted-foreground mb-6">
            Try adjusting your search or filter to find what you're looking for.
          </p>
          <Button onClick={() => {
            setSearchQuery('');
            setActiveFilter('all');
            setSelectedCategory('all');
            setSearchParams({});
          }}>
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default Browse;
