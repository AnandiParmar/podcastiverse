
import React from 'react';
import PodcastCard from './PodcastCard';
import { PodcastData } from '@/data/mockPodcasts';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface FavoritePodcastGridProps {
  podcasts: PodcastData[];
  columns?: 2 | 3 | 4;
  onRemoveFavorite: (id: string) => void;
}

const FavoritePodcastGrid = ({
  podcasts,
  columns = 3,
  onRemoveFavorite
}: FavoritePodcastGridProps) => {
  const getColumnsClass = (): string => {
    switch (columns) {
      case 2:
        return 'grid-cols-1 sm:grid-cols-2';
      case 3:
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
      case 4:
        return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
      default:
        return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
    }
  };

  return (
    <div className={`grid ${getColumnsClass()} gap-6`}>
      {podcasts.map((podcast) => (
        <div key={podcast.id} className="relative group">
          <PodcastCard 
            id={podcast.id}
            title={podcast.title}
            creator={podcast.creator}
            coverImage={podcast.coverImage}
            duration={podcast.duration}
            isFavorite={true}
            isNew={podcast.isNew}
            isPopular={podcast.isPopular}
          />
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => onRemoveFavorite(podcast.id)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default FavoritePodcastGrid;
