
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent,
  CardFooter 
} from '@/components/ui/card';

interface AuthFormProps {
  type: 'login' | 'signup';
}

const AuthForm = ({ type }: AuthFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
    name: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // This would be an actual API call in a real application
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: type === 'login' ? 'Welcome back!' : 'Account created successfully!',
        description: type === 'login' 
          ? 'You have been logged in successfully.'
          : 'Your account has been created and you are now logged in.',
      });
      
      navigate('/');
    } catch (error) {
      toast({
        title: 'Authentication failed',
        description: 'Please check your credentials and try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">
          {type === 'login' ? 'Login to your account' : 'Create an account'}
        </CardTitle>
        <CardDescription>
          {type === 'login' 
            ? 'Enter your credentials to access your account' 
            : 'Fill out the form below to create your account'}
        </CardDescription>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {type === 'signup' && (
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <span className="animate-pulse">Loading...</span>
            ) : type === 'login' ? 'Login' : 'Create Account'}
          </Button>
          
          <p className="text-center text-sm text-muted-foreground">
            {type === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <Button
              variant="link"
              className="p-0 h-auto"
              onClick={() => navigate(type === 'login' ? '/signup' : '/login')}
            >
              {type === 'login' ? 'Sign up' : 'Login'}
            </Button>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
};

export default AuthForm;
