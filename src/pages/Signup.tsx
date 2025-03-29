
import React from 'react';
import AuthForm from '@/components/auth/AuthForm';
import { Mic, Headphones } from 'lucide-react';
import { Link } from 'react-router-dom';

const Signup = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Auth Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 bg-background order-2 md:order-1">
        <Link to="/" className="flex items-center mb-12 md:hidden">
          <div className="relative">
            <Mic className="h-8 w-8 text-podcast-primary" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-podcast-highlight rounded-full animate-pulse" />
          </div>
          <span className="font-bold text-2xl ml-2 podcast-gradient-text">Podcastiverse</span>
        </Link>
        
        <div className="w-full max-w-md">
          <AuthForm type="signup" />
        </div>
      </div>
      
      {/* Right side - Decorative */}
      <div className="hidden md:flex md:w-1/2 bg-podcast-gradient relative overflow-hidden order-1 md:order-2">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute right-1/4 top-1/4 w-96 h-96 rounded-full bg-podcast-highlight/20 blur-3xl"></div>
          <div className="absolute left-1/4 bottom-1/4 w-80 h-80 rounded-full bg-white/20 blur-3xl"></div>
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12">
          <div className="relative mb-8">
            <Headphones className="h-20 w-20 text-white" />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-podcast-highlight rounded-full animate-pulse"></div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center">
            Join the Podcastiverse Community
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-md text-center">
            Create an account to discover, save, and engage with thousands of podcasts.
          </p>
          <div className="flex flex-wrap gap-4 justify-center max-w-md">
            {['Discover', 'Listen', 'Learn', 'Create', 'Share', 'Connect'].map((text) => (
              <div key={text} className="px-4 py-2 bg-white/10 rounded-full text-white border border-white/20">
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
