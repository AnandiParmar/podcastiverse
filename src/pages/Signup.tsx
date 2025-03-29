
import React from 'react';
import AuthForm from '@/components/auth/AuthForm';

const Signup = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <AuthForm type="signup" />
    </div>
  );
};

export default Signup;
