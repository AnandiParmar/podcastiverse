
import React from 'react';
import AuthForm from '@/components/auth/AuthForm';
import { Mic } from 'lucide-react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Decorative */}
      <div className="hidden md:flex md:w-1/2 bg-podcast-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute left-1/4 top-1/4 w-96 h-96 rounded-full bg-white/20 blur-3xl"></div>
          <div className="absolute right-1/4 bottom-1/4 w-80 h-80 rounded-full bg-podcast-highlight/20 blur-3xl"></div>
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12">
          <div className="relative mb-8">
            <Mic className="h-20 w-20 text-white" />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-podcast-highlight rounded-full animate-pulse"></div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center">
            Welcome Back to Podcastiverse
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-md text-center">
            Your favorite podcasts are waiting for you. Sign in to continue your journey.
          </p>
          <div className="grid grid-cols-3 gap-6 w-full max-w-md">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div 
                key={i} 
                className="aspect-square rounded-lg bg-white/10 overflow-hidden"
                style={{
                  backgroundImage: `url(https://source.unsplash.com/random/200x200?podcast,${i})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Right side - Auth Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 bg-background">
        <Link to="/" className="flex items-center mb-12 md:hidden">
          <div className="relative">
            <Mic className="h-8 w-8 text-podcast-primary" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-podcast-highlight rounded-full animate-pulse" />
          </div>
          <span className="font-bold text-2xl ml-2 podcast-gradient-text">Podcastiverse</span>
        </Link>
        
        <div className="w-full max-w-md">
          <AuthForm type="login" />
        </div>
      </div>
    </div>
  );
};

export default Login;
