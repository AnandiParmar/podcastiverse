
import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

interface PodcastPlayerProps {
  title: string;
  creator: string;
  coverImage: string;
  audioSrc: string;
  videoSrc?: string;
  isVideo?: boolean;
  className?: string;
}

const PodcastPlayer = ({
  title,
  creator,
  coverImage,
  audioSrc,
  videoSrc,
  isVideo = false,
  className,
}: PodcastPlayerProps) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [volume, setVolume] = React.useState(80);
  const [isMuted, setIsMuted] = React.useState(false);
  
  // These would be connected to an actual audio/video element in a real app
  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleMute = () => setIsMuted(!isMuted);
  
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className={cn("rounded-xl overflow-hidden bg-card", className)}>
      {isVideo && videoSrc ? (
        <div className="aspect-video bg-black relative">
          <img 
            src={coverImage} 
            alt={title}
            className="w-full h-full object-cover opacity-50" 
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Button
              variant="outline"
              size="icon"
              className="h-16 w-16 rounded-full bg-black/50 border-white/20"
              onClick={togglePlay}
            >
              {isPlaying ? (
                <Pause className="h-8 w-8 text-white" />
              ) : (
                <Play className="h-8 w-8 text-white ml-1" />
              )}
            </Button>
          </div>
        </div>
      ) : (
        <div className="aspect-[3/1] sm:aspect-[4/1] md:aspect-[5/1] bg-gradient-to-r from-podcast-dark to-podcast-primary/30 p-4 flex">
          <div className="h-full aspect-square flex-shrink-0">
            <img 
              src={coverImage} 
              alt={title}
              className="h-full w-full object-cover rounded-md" 
            />
          </div>
          
          <div className="ml-4 flex flex-col justify-center">
            <h2 className="text-lg sm:text-xl font-semibold">{title}</h2>
            <p className="text-sm text-muted-foreground">{creator}</p>
          </div>
        </div>
      )}
      
      <div className="p-4 space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground w-12 text-right">
            {formatTime(currentTime)}
          </span>
          
          <Slider
            value={[currentTime]}
            max={duration}
            step={1}
            className="flex-1"
            onValueChange={(value) => setCurrentTime(value[0])}
          />
          
          <span className="text-xs text-muted-foreground w-12">
            {formatTime(duration)}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-white"
            >
              <SkipBack className="h-5 w-5" />
            </Button>
            
            <Button
              variant="secondary"
              size="icon"
              className="h-10 w-10 rounded-full"
              onClick={togglePlay}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5 ml-0.5" />
              )}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-white"
            >
              <SkipForward className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="flex items-center gap-2 max-w-[140px]">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-white"
              onClick={toggleMute}
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </Button>
            
            <Slider
              value={[isMuted ? 0 : volume]}
              max={100}
              step={1}
              className="w-20"
              onValueChange={(value) => {
                setVolume(value[0]);
                if (value[0] > 0 && isMuted) {
                  setIsMuted(false);
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PodcastPlayer;
