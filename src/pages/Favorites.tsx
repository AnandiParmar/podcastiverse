
import React, { useState } from 'react';
import { mockPodcasts } from '@/data/mockPodcasts';
import { Bookmark, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import FavoritePodcastGrid from '@/components/podcast/FavoritePodcastGrid';

const Favorites = () => {
  // In a real app, this would come from a user's saved favorites in a database
  const [favorites, setFavorites] = useState(
    mockPodcasts.filter(podcast => podcast.isFavorite).slice(0, 8)
  );

  const handleRemoveFavorite = (id: string) => {
    setFavorites(favorites.filter(podcast => podcast.id !== id));
    toast({
      title: "Removed from favorites",
      description: "Podcast has been removed from your favorites",
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold flex items-center">
          <Heart className="mr-2 h-6 w-6 text-podcast-highlight" />
          Your Favorites
        </h1>
        <p className="text-muted-foreground">
          Podcasts and episodes you've marked as favorites
        </p>
      </div>

      {/* Content */}
      {favorites.length > 0 ? (
        <div className="space-y-10">
          {/* Favorite Podcasts */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Favorite Podcasts</h2>
            <div className="bg-card/30 rounded-xl p-6 border border-border/30">
              <FavoritePodcastGrid 
                podcasts={favorites} 
                columns={4} 
                onRemoveFavorite={handleRemoveFavorite} 
              />
            </div>
          </section>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 space-y-4 bg-card/30 rounded-xl border border-border/30">
          <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center">
            <Bookmark className="h-12 w-12 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-medium">No favorites yet</h3>
          <p className="text-muted-foreground text-center max-w-md">
            You haven't added any podcasts to your favorites yet. Browse and mark podcasts you love to find them here.
          </p>
          <Button className="mt-4 bg-podcast-gradient hover:opacity-90 transition-opacity">
            Browse Podcasts
          </Button>
        </div>
      )}
    </div>
  );
};

export default Favorites;
