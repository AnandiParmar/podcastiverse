
import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export interface PodcastProps {
  id: string;
  title: string;
  creator: string;
  coverImage: string;
  duration: string;
  isFavorite?: boolean;
  isNew?: boolean;
  isPopular?: boolean;
  onClick?: () => void;
  className?: string;
}

const PodcastCard = ({
  id,
  title,
  creator,
  coverImage,
  duration,
  isFavorite = false,
  isNew = false,
  isPopular = false,
  className,
}: PodcastProps) => {
  const [favorite, setFavorite] = React.useState(isFavorite);
  const { toast } = useToast();
  
  React.useEffect(() => {
    setFavorite(isFavorite);
  }, [isFavorite]);
  
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Toggle favorite state
    setFavorite(!favorite);
    
    // Update favorites in localStorage
    const favoritesFromStorage = localStorage.getItem('favorites') 
      ? JSON.parse(localStorage.getItem('favorites') || '[]') 
      : [];
    
    let updatedFavorites;
    if (!favorite) {
      // Add to favorites if not already there
      if (!favoritesFromStorage.includes(id)) {
        updatedFavorites = [...favoritesFromStorage, id];
      } else {
        updatedFavorites = favoritesFromStorage;
      }
    } else {
      // Remove from favorites
      updatedFavorites = favoritesFromStorage.filter((favId: string) => favId !== id);
    }
    
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    
    toast({
      title: favorite ? "Removed from favorites" : "Added to favorites",
      description: favorite ? `${title} has been removed from your favorites` : `${title} has been added to your favorites`,
      duration: 3000,
    });
  };

  return (
    <div className={cn("podcast-card group", className)}>
      <Link to={`/podcast/${id}`} className="block">
        <div className="relative aspect-square">
          <img 
            src={coverImage} 
            alt={title} 
            className="w-full h-full object-cover rounded-md"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-md" />
          
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            <Play className="h-6 w-6 text-white ml-1" />
          </div>
          
          {(isNew || isPopular) && (
            <div className="absolute top-2 left-2">
              {isNew && (
                <span className="bg-podcast-highlight px-2 py-1 rounded-md text-xs font-medium">
                  NEW
                </span>
              )}
              {isPopular && !isNew && (
                <span className="bg-podcast-primary px-2 py-1 rounded-md text-xs font-medium">
                  POPULAR
                </span>
              )}
            </div>
          )}
          
          <div className="absolute bottom-2 right-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-full bg-black/30 hover:bg-black/50"
              onClick={handleFavoriteClick}
            >
              <Heart 
                className={cn(
                  "h-4 w-4 transition-colors", 
                  favorite ? "fill-podcast-highlight text-podcast-highlight" : "text-white"
                )} 
              />
            </Button>
          </div>
        </div>
      </Link>
      
      <div className="p-3">
        <Link to={`/podcast/${id}`} className="block">
          <h3 className="font-medium line-clamp-1 hover:text-podcast-primary transition-colors">{title}</h3>
          <p className="text-sm text-muted-foreground">{creator}</p>
          <p className="text-xs text-muted-foreground mt-1">{duration}</p>
        </Link>
      </div>
    </div>
  );
};

export default PodcastCard;
