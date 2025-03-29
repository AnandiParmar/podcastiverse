
import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SearchPodcastProps {
  onSearch: (query: string) => void;
  className?: string;
  placeholder?: string;
  initialValue?: string;
}

const SearchPodcast = ({
  onSearch,
  className,
  placeholder = "Search podcasts...",
  initialValue = ""
}: SearchPodcastProps) => {
  const [query, setQuery] = useState(initialValue);
  
  // Update query if initialValue changes (e.g., from URL params)
  useEffect(() => {
    if (initialValue !== query) {
      setQuery(initialValue);
    }
  }, [initialValue]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    // Optional: search as you type for more responsive UX
    // if (e.target.value === '') {
    //   onSearch('');
    // }
  };
  
  return (
    <form className={cn("relative", className)} onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
        className="pr-10 bg-muted focus-visible:ring-podcast-primary"
      />
      <Button
        type="submit"
        variant="ghost"
        size="icon"
        className="absolute right-0 top-0 h-full text-muted-foreground hover:text-podcast-primary"
      >
        <Search className="h-4 w-4" />
        <span className="sr-only">Search</span>
      </Button>
    </form>
  );
};

export default SearchPodcast;
