
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import Home from "@/pages/Home";
import Browse from "@/pages/Browse";
import Search from "@/pages/Search";
import Favorites from "@/pages/Favorites";
import History from "@/pages/History";
import AddPodcast from "@/pages/AddPodcast";
import PodcastDetail from "@/pages/PodcastDetail";
import Profile from "@/pages/Profile";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="browse" element={<Browse />} />
            <Route path="search" element={<Search />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="history" element={<History />} />
            <Route path="add-podcast" element={<AddPodcast />} />
            <Route path="podcast/:id" element={<PodcastDetail />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
