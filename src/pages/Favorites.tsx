
import React from 'react';
import PodcastGrid from '@/components/podcast/PodcastGrid';
import { mockPodcasts } from '@/data/mockPodcasts';

const Favorites = () => {
  // In a real app, this would fetch the user's favorites from a database
  // For now, we'll just simulate with some random podcasts
  const [favorites, setFavorites] = React.useState(
    mockPodcasts.slice(0, 8).map(podcast => ({ ...podcast, isFavorite: true }))
  );
  
  const handleRemoveFavorite = (id: string) => {
    setFavorites(favorites.filter(podcast => podcast.id !== id));
  };
  
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Your Favorites</h1>
      
      {favorites.length > 0 ? (
        <PodcastGrid 
          podcasts={favorites} 
          columns={4}
        />
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No favorites yet</h3>
          <p className="text-muted-foreground">
            Start adding podcasts to your favorites to see them here.
          </p>
        </div>
      )}
    </div>
  );
};

export default Favorites;
