
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SearchPodcastProps {
  onSearch: (query: string) => void;
  className?: string;
  placeholder?: string;
}

const SearchPodcast = ({
  onSearch,
  className,
  placeholder = "Search podcasts...",
}: SearchPodcastProps) => {
  const [query, setQuery] = React.useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };
  
  return (
    <form className={cn("relative", className)} onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pr-10 bg-muted"
      />
      <Button
        type="submit"
        variant="ghost"
        size="icon"
        className="absolute right-0 top-0 h-full"
      >
        <Search className="h-4 w-4" />
        <span className="sr-only">Search</span>
      </Button>
    </form>
  );
};

export default SearchPodcast;
