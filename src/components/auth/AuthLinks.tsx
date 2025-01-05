import React from 'react';

interface AuthLinksProps {
  isSignUp: boolean;
  onToggleMode: () => void;
}

export function AuthLinks({ isSignUp, onToggleMode }: AuthLinksProps) {
  return (
    <div className="text-center space-y-4">
      <button
        onClick={onToggleMode}
        className="text-sm text-indigo-600 hover:text-indigo-500"
      >
        {isSignUp
          ? 'Already have an account? Sign in'
          : "Don't have an account? Sign up"}
      </button>
      
      <div className="space-y-2">
        <button className="text-sm text-gray-500 hover:text-gray-700">
          Forgot password?
        </button>
        <div className="block text-sm">
          <button className="text-gray-500 hover:text-gray-700">
            What is Småland?
          </button>
        </div>
      </div>
    </div>
  );
}