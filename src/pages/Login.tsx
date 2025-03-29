
import React from 'react';
import AuthForm from '@/components/auth/AuthForm';

const Login = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <AuthForm type="login" />
    </div>
  );
};

export default Login;
