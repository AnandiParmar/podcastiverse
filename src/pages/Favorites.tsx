
import React, { useState } from 'react';
import PodcastGrid from '@/components/podcast/PodcastGrid';
import { Button } from '@/components/ui/button';
import { Heart, RefreshCw } from 'lucide-react';
import { mockPodcasts } from '@/data/mockPodcasts';
import { useToast } from '@/hooks/use-toast';

const Favorites = () => {
  const { toast } = useToast();
  // In a real app, this would fetch the user's favorites from a database
  const [favorites, setFavorites] = useState(
    mockPodcasts.slice(0, 8).map(podcast => ({ ...podcast, isFavorite: true }))
  );
  
  const handleRemoveFavorite = (id: string) => {
    setFavorites(favorites.filter(podcast => podcast.id !== id));
    
    toast({
      title: "Removed from favorites",
      description: "The podcast has been removed from your favorites",
      duration: 3000,
    });
  };
  
  const resetFavorites = () => {
    setFavorites(mockPodcasts.slice(0, 8).map(podcast => ({ ...podcast, isFavorite: true })));
    
    toast({
      title: "Favorites reset",
      description: "Your favorites have been reset to the default list",
      duration: 3000,
    });
  };
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-2 border-b border-border/50">
        <div>
          <h1 className="text-3xl font-bold podcast-gradient-text flex items-center gap-2">
            <Heart className="text-podcast-highlight" /> Your Favorites
          </h1>
          <p className="text-muted-foreground mt-1">Podcasts you've saved for later</p>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={resetFavorites} 
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Reset Favorites
        </Button>
      </div>
      
      {favorites.length > 0 ? (
        <div className="bg-card/30 p-6 rounded-xl border border-border/30">
          <PodcastGrid 
            podcasts={favorites} 
            columns={4}
            onRemoveFavorite={handleRemoveFavorite}
          />
        </div>
      ) : (
        <div className="text-center py-20 bg-card/30 rounded-xl border border-border/30">
          <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-20" />
          <h3 className="text-2xl font-semibold mb-2">No favorites yet</h3>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            Start adding podcasts to your favorites to see them here. Discover new podcasts in the Browse section.
          </p>
          <Button 
            onClick={() => window.location.href = '/browse'}
            className="bg-podcast-gradient hover:opacity-90 transition-opacity"
          >
            Discover Podcasts
          </Button>
        </div>
      )}
    </div>
  );
};

export default Favorites;
