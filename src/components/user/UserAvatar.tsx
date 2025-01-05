import React from 'react';
import { User } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { UserProfile } from '@types/user';
import { ROUTES } from '@lib/constants';

interface UserAvatarProps {
  user: UserProfile | null;
  size?: 'sm' | 'md' | 'lg';
}

export function UserAvatar({ user, size = 'md' }: UserAvatarProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  if (!user) {
    return (
      <div className={`${sizeClasses[size]} rounded-full bg-gray-100 flex items-center justify-center`}>
        <User className={`${iconSizes[size]} text-gray-400`} />
      </div>
    );
  }

  return (
    <Link to={ROUTES.PROFILE} className="block">
      {user.profilePicture ? (
        <img
          src={user.profilePicture}
          alt={user.displayName || user.email}
          className={`${sizeClasses[size]} rounded-full object-cover border-2 border-white hover:border-indigo-500 transition-colors`}
        />
      ) : (
        <div className={`${sizeClasses[size]} rounded-full bg-indigo-100 flex items-center justify-center border-2 border-white hover:border-indigo-500 transition-colors`}>
          <span className="text-indigo-600 font-medium">
            {(user.displayName || user.email)[0].toUpperCase()}
          </span>
        </div>
      )}
    </Link>
  );
}