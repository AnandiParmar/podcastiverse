
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import PodcastGrid from '@/components/podcast/PodcastGrid';
import SearchPodcast from '@/components/podcast/SearchPodcast';
import { searchPodcasts } from '@/data/mockPodcasts';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  
  const [searchResults, setSearchResults] = React.useState(
    queryParam ? searchPodcasts(queryParam) : []
  );
  
  const handleSearch = (query: string) => {
    setSearchParams({ q: query });
    setSearchResults(searchPodcasts(query));
  };
  
  React.useEffect(() => {
    if (queryParam) {
      setSearchResults(searchPodcasts(queryParam));
    }
  }, [queryParam]);
  
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Search Podcasts</h1>
      
      <SearchPodcast 
        onSearch={handleSearch} 
        className="max-w-xl" 
        placeholder="Search by title, creator, or category..."
      />
      
      {queryParam ? (
        <>
          <h2 className="text-xl font-medium">
            {searchResults.length} results for "{queryParam}"
          </h2>
          
          {searchResults.length > 0 ? (
            <PodcastGrid 
              podcasts={searchResults} 
              columns={4}
            />
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No podcasts found</h3>
              <p className="text-muted-foreground">
                Try searching for something else.
              </p>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">Search for podcasts</h3>
          <p className="text-muted-foreground">
            Enter a search term to find podcasts.
          </p>
        </div>
      )}
    </div>
  );
};

export default Search;
