
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, Share2, Clock, Calendar, Edit, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import PodcastPlayer from '@/components/podcast/PodcastPlayer';
import PodcastGrid from '@/components/podcast/PodcastGrid';
import { useToast } from '@/hooks/use-toast';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { getPodcastById, mockPodcasts } from '@/data/mockPodcasts';

const PodcastDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isFavorite, setIsFavorite] = React.useState(false);
  
  const podcast = getPodcastById(id || '');
  
  // Get related podcasts by category
  const relatedPodcasts = React.useMemo(() => {
    if (!podcast) return [];
    
    return mockPodcasts
      .filter(p => p.category === podcast.category && p.id !== podcast.id)
      .slice(0, 4);
  }, [podcast]);
  
  if (!podcast) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold mb-4">Podcast Not Found</h2>
        <p className="text-muted-foreground mb-6">
          The podcast you're looking for doesn't exist or has been removed.
        </p>
        <Button onClick={() => navigate('/')}>Back to Home</Button>
      </div>
    );
  }
  
  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
    
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: isFavorite 
        ? `${podcast.title} has been removed from your favorites`
        : `${podcast.title} has been added to your favorites`,
      duration: 3000,
    });
  };
  
  const handleShare = () => {
    // In a real app, this would use the Web Share API
    navigator.clipboard.writeText(window.location.href);
    
    toast({
      title: "Link copied",
      description: "Podcast link has been copied to clipboard",
      duration: 3000,
    });
  };
  
  const handleDelete = () => {
    // In a real app, this would make an API call to delete the podcast
    toast({
      title: "Podcast deleted",
      description: `${podcast.title} has been deleted successfully`,
      duration: 3000,
    });
    
    navigate('/');
  };
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3 lg:w-1/4 flex-shrink-0">
          <div className="aspect-square w-full">
            <img 
              src={podcast.coverImage} 
              alt={podcast.title}
              className="w-full h-full object-cover rounded-xl shadow-md" 
            />
          </div>
          
          <div className="mt-6 space-y-4">
            <div className="flex gap-2">
              <Button 
                variant={isFavorite ? "default" : "outline"}
                className="flex-1"
                onClick={handleFavoriteToggle}
              >
                <Heart className={`h-4 w-4 mr-2 ${isFavorite ? 'fill-white' : ''}`} />
                {isFavorite ? 'Favorited' : 'Favorite'}
              </Button>
              
              <Button 
                variant="outline"
                className="flex-1"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline"
                className="flex-1"
                onClick={() => navigate(`/edit-podcast/${podcast.id}`)}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="destructive"
                    className="flex-1"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete the
                      podcast "{podcast.title}" and remove the data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
          
          <div className="mt-6 space-y-4">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-muted-foreground mr-2" />
              <span className="text-muted-foreground">{podcast.duration}</span>
            </div>
            
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-muted-foreground mr-2" />
              <span className="text-muted-foreground">
                {format(new Date(podcast.publishedAt), 'MMM d, yyyy')}
              </span>
            </div>
            
            <div className="pt-2">
              <Button 
                variant="link" 
                className="px-0"
                onClick={() => navigate(`/browse?category=${encodeURIComponent(podcast.category)}`)}
              >
                {podcast.category}
              </Button>
            </div>
          </div>
        </div>
        
        <div className="md:w-2/3 lg:w-3/4 space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{podcast.title}</h1>
            <p className="text-xl text-muted-foreground">By {podcast.creator}</p>
          </div>
          
          <PodcastPlayer
            title={podcast.title}
            creator={podcast.creator}
            coverImage={podcast.coverImage}
            audioSrc={podcast.audioSrc}
            videoSrc={podcast.videoSrc}
            isVideo={podcast.isVideo}
          />
          
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">About this podcast</h2>
            <p className="text-muted-foreground">{podcast.description}</p>
          </div>
        </div>
      </div>
      
      <Separator className="my-8" />
      
      {relatedPodcasts.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-6">You might also like</h2>
          <PodcastGrid podcasts={relatedPodcasts} columns={4} />
        </div>
      )}
    </div>
  );
};

export default PodcastDetail;
