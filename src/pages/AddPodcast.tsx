
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { mockPodcasts } from '@/data/mockPodcasts';

const AddPodcast = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  const [formData, setFormData] = React.useState({
    title: '',
    description: '',
    category: '',
    creator: '',
    isVideo: false,
    coverImage: '',
    audioFile: null,
    videoFile: null,
  });
  
  const categories = Array.from(
    new Set(mockPodcasts.map(podcast => podcast.category))
  );
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCategoryChange = (value: string) => {
    setFormData(prev => ({ ...prev, category: value }));
  };
  
  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, isVideo: checked }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call to create the podcast
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: 'Podcast added successfully',
        description: 'Your podcast has been added and is now available.',
      });
      
      navigate('/');
    } catch (error) {
      toast({
        title: 'Failed to add podcast',
        description: 'There was an error adding your podcast. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add New Podcast</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Podcast Details</CardTitle>
          <CardDescription>
            Fill out the form below to add a new podcast to your collection.
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Enter podcast title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="creator">Creator</Label>
              <Input
                id="creator"
                name="creator"
                placeholder="Enter creator name"
                value={formData.creator}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Enter podcast description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select 
                value={formData.category} 
                onValueChange={handleCategoryChange}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="coverImage">Cover Image URL</Label>
              <Input
                id="coverImage"
                name="coverImage"
                placeholder="Enter image URL"
                value={formData.coverImage}
                onChange={handleChange}
                required
              />
              <p className="text-xs text-muted-foreground">
                Enter the URL of the podcast cover image.
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="isVideo"
                checked={formData.isVideo}
                onCheckedChange={handleSwitchChange}
              />
              <Label htmlFor="isVideo">This podcast has video</Label>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="audioFile">Audio File</Label>
              <Input
                id="audioFile"
                name="audioFile"
                type="file"
                accept="audio/*"
                required
              />
            </div>
            
            {formData.isVideo && (
              <div className="space-y-2">
                <Label htmlFor="videoFile">Video File</Label>
                <Input
                  id="videoFile"
                  name="videoFile"
                  type="file"
                  accept="video/*"
                />
              </div>
            )}
          </CardContent>
          
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/')}
            >
              Cancel
            </Button>
            
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Adding Podcast...' : 'Add Podcast'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default AddPodcast;
