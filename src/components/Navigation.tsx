import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@lib/hooks/useAuth';
import { ROUTES } from '@lib/constants';
import { Home, Compass, LogOut } from '@lib/icons';
import { UserAvatar } from './user/UserAvatar';

export function Navigation() {
  const { user, signOut, isAuthenticated } = useAuth();

  const navItems = [
    { icon: Home, label: 'Home', path: ROUTES.HOME },
    { icon: Compass, label: 'Explore', path: ROUTES.EXPLORE }
  ];

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to={ROUTES.HOME} className="font-bold text-xl text-indigo-600">
            Småland
          </Link>
          
          <div className="flex items-center space-x-4">
            {navItems.map(({ icon: Icon, label, path }) => (
              <Link 
                key={path}
                to={path} 
                className="text-gray-600 hover:text-indigo-600"
                aria-label={label}
              >
                <Icon className="w-5 h-5" />
              </Link>
            ))}

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link to={ROUTES.PROFILE}>
                  <UserAvatar user={user} size="sm" />
                </Link>
                <button
                  onClick={signOut}
                  className="text-gray-600 hover:text-indigo-600"
                  aria-label="Sign out"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link
                to={ROUTES.LOGIN}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}