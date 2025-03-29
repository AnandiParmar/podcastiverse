
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Mic, Headphones, Radio, Music, Users, BookOpen, Globe, Award } from 'lucide-react';
import { mockPodcasts } from '@/data/mockPodcasts';

type CategoryWithIcon = {
  name: string;
  icon: React.ElementType;
  count: number;
  color: string;
};

const Categories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<CategoryWithIcon[]>([]);
  
  useEffect(() => {
    // Generate categories with counts from podcasts
    const categoryMap = mockPodcasts.reduce((acc, podcast) => {
      acc[podcast.category] = (acc[podcast.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    // Map icons to categories
    const categoryIcons: Record<string, React.ElementType> = {
      'Technology': Mic,
      'Business': Headphones,
      'Science': Radio,
      'Entertainment': Music,
      'Education': BookOpen,
      'Culture': Globe,
      'Comedy': Users,
      'News': Award,
    };
    
    // Generate colors for categories
    const categoryColors = [
      'bg-gradient-to-br from-purple-500 to-indigo-600',
      'bg-gradient-to-br from-pink-500 to-rose-500',
      'bg-gradient-to-br from-yellow-400 to-orange-500',
      'bg-gradient-to-br from-green-400 to-emerald-600',
      'bg-gradient-to-br from-blue-400 to-cyan-600',
      'bg-gradient-to-br from-violet-400 to-purple-600',
      'bg-gradient-to-br from-red-500 to-pink-600',
      'bg-gradient-to-br from-amber-400 to-yellow-600',
    ];
    
    const categoriesWithIcons = Object.entries(categoryMap).map(([name, count], index) => ({
      name,
      icon: categoryIcons[name] || Mic,
      count,
      color: categoryColors[index % categoryColors.length]
    }));
    
    setCategories(categoriesWithIcons);
  }, []);

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold podcast-gradient-text">Browse by Categories</h1>
        <p className="text-muted-foreground">Discover podcasts in your favorite categories</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Card 
              key={category.name}
              className="overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              onClick={() => navigate(`/browse?category=${encodeURIComponent(category.name)}`)}
            >
              <div className={`${category.color} p-6 flex justify-center items-center`}>
                <Icon className="h-12 w-12 text-white" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                <p className="text-muted-foreground">{category.count} podcasts</p>
                <Separator className="my-4" />
                <Button 
                  variant="link" 
                  className="p-0 h-auto"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/browse?category=${encodeURIComponent(category.name)}`);
                  }}
                >
                  Explore →
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      <div className="bg-card rounded-xl p-8 mt-12">
        <h2 className="text-2xl font-bold mb-6">Want to start your own podcast?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl">
          Join our community of podcasters and share your voice with the world. Create your own podcast and reach thousands of listeners.
        </p>
        <Button 
          onClick={() => navigate('/add-podcast')}
          className="bg-podcast-gradient hover:opacity-90 transition-opacity"
        >
          Start Your Podcast Journey
        </Button>
      </div>
    </div>
  );
};

export default Categories;
