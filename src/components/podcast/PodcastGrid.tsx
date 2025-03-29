
import React from 'react';
import PodcastCard, { PodcastProps } from './PodcastCard';
import { cn } from '@/lib/utils';

interface PodcastGridProps {
  podcasts: PodcastProps[];
  title?: string;
  subtitle?: string;
  className?: string;
  columns?: 2 | 3 | 4 | 5;
}

const PodcastGrid = ({
  podcasts,
  title,
  subtitle,
  className,
  columns = 4,
}: PodcastGridProps) => {
  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
    5: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
  };

  return (
    <div className={className}>
      {(title || subtitle) && (
        <div className="mb-6">
          {title && <h2 className="text-2xl font-semibold">{title}</h2>}
          {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
        </div>
      )}
      
      <div className={cn("grid gap-4 md:gap-6", gridCols[columns])}>
        {podcasts.map((podcast) => (
          <PodcastCard key={podcast.id} {...podcast} />
        ))}
      </div>
    </div>
  );
};

export default PodcastGrid;
