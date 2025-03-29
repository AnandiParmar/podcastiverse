
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Edit, LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
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

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  // Mock user data
  const [userData, setUserData] = React.useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Podcast enthusiast and content creator. Love sharing stories and exploring new ideas through audio.',
    location: 'San Francisco, CA',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=800&q=80',
  });
  
  const [formData, setFormData] = React.useState({ ...userData });
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call to update the profile
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUserData(formData);
      setIsEditing(false);
      
      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated successfully.',
      });
    } catch (error) {
      toast({
        title: 'Failed to update profile',
        description: 'There was an error updating your profile. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleCancel = () => {
    setFormData({ ...userData });
    setIsEditing(false);
  };
  
  const handleLogout = () => {
    // In a real app, this would make an API call to log the user out
    toast({
      title: 'Logged out',
      description: 'You have been logged out successfully.',
    });
    
    navigate('/login');
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Profile</h1>
        
        <div className="flex gap-3">
          {!isEditing && (
            <Button
              variant="outline"
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2"
            >
              <Edit className="h-4 w-4" />
              Edit Profile
            </Button>
          )}
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
                <AlertDialogDescription>
                  You will be logged out of your account and will need to log in again to access your podcasts and settings.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleLogout}>
                  Logout
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            {isEditing 
              ? 'Update your profile information below.' 
              : 'View and manage your personal information.'}
          </CardDescription>
        </CardHeader>
        
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3 flex justify-center">
                  <div className="relative">
                    <img 
                      src={userData.avatarUrl} 
                      alt={userData.name}
                      className="w-32 h-32 rounded-full object-cover" 
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="absolute bottom-0 right-0 rounded-full"
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Change Avatar</span>
                    </Button>
                  </div>
                </div>
                
                <div className="md:w-2/3 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Input
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </Button>
            </CardFooter>
          </form>
        ) : (
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3 flex justify-center">
                <img 
                  src={userData.avatarUrl} 
                  alt={userData.name}
                  className="w-32 h-32 rounded-full object-cover" 
                />
              </div>
              
              <div className="md:w-2/3 space-y-4">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-medium">{userData.name}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{userData.email}</p>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Bio</p>
                  <p>{userData.bio}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Location</p>
                  <p>{userData.location}</p>
                </div>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
      
      <div className="mt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Account Statistics</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Total Podcasts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">12</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Favorites</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">24</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">5 days ago</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
