
import React from 'react';
import { format } from 'date-fns';
import { Trash2 } from 'lucide-react';
import PodcastGrid from '@/components/podcast/PodcastGrid';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
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
import { mockPodcasts } from '@/data/mockPodcasts';

const History = () => {
  // In a real app, this would fetch the user's history from a database
  // For this demo, we'll create some mock history data
  const [history, setHistory] = React.useState(
    mockPodcasts.slice(0, 10).map(podcast => ({
      ...podcast,
      lastPlayed: new Date(
        Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)
      ),
      progress: Math.floor(Math.random() * 100),
    }))
  );
  
  const todayHistory = history.filter(item => 
    format(item.lastPlayed, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
  );
  
  const weekHistory = history.filter(item => {
    const daysAgo = Math.floor(
      (new Date().getTime() - item.lastPlayed.getTime()) / (1000 * 60 * 60 * 24)
    );
    return daysAgo <= 7 && daysAgo > 0;
  });
  
  const olderHistory = history.filter(item => {
    const daysAgo = Math.floor(
      (new Date().getTime() - item.lastPlayed.getTime()) / (1000 * 60 * 60 * 24)
    );
    return daysAgo > 7;
  });
  
  const clearHistory = () => {
    setHistory([]);
  };
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Listening History</h1>
        
        {history.length > 0 && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Trash2 className="h-4 w-4" />
                Clear History
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Clear listening history?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will remove all podcasts from your listening history. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={clearHistory}>
                  Clear History
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
      
      {history.length > 0 ? (
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="week">This Week</TabsTrigger>
            <TabsTrigger value="older">Older</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <PodcastGrid 
              podcasts={history} 
              columns={4}
            />
          </TabsContent>
          
          <TabsContent value="today" className="mt-6">
            {todayHistory.length > 0 ? (
              <PodcastGrid 
                podcasts={todayHistory} 
                columns={4}
              />
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No history from today</h3>
                <p className="text-muted-foreground">
                  You haven't listened to any podcasts today.
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="week" className="mt-6">
            {weekHistory.length > 0 ? (
              <PodcastGrid 
                podcasts={weekHistory} 
                columns={4}
              />
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No history from this week</h3>
                <p className="text-muted-foreground">
                  You haven't listened to any podcasts this week.
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="older" className="mt-6">
            {olderHistory.length > 0 ? (
              <PodcastGrid 
                podcasts={olderHistory} 
                columns={4}
              />
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No older history</h3>
                <p className="text-muted-foreground">
                  You don't have any listening history older than a week.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No listening history</h3>
          <p className="text-muted-foreground">
            Start listening to podcasts to build your history.
          </p>
        </div>
      )}
    </div>
  );
};

export default History;
