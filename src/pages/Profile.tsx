import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '@lib/hooks/useAuth';
import { updateProfile } from '@lib/services/profileService';
import { ProfileForm } from '@components/profile/ProfileForm';
import { ROUTES } from '@lib/constants';
import type { ProfileFormData } from '@types/user';

export function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ProfileFormData>({
    displayName: user?.displayName || '',
    email: user?.email || '',
    bio: '',
    location: '',
    phone: '',
    interests: '',
    website: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  // Initialize form with user data
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        displayName: user.displayName || '',
        email: user.email || ''
      }));
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;

    setStatus('submitting');
    setMessage('');
    
    try {
      await updateProfile(user.id, formData);
      setStatus('success');
      setMessage('Profile updated successfully!');

      // Navigate to town square after a short delay
      setTimeout(() => {
        navigate(ROUTES.TOWN_SQUARE);
      }, 1500);
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Failed to update profile');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-6">
      <h1 className="text-2xl font-bold mb-6">Complete Your Profile</h1>
      
      {status !== 'idle' && status !== 'submitting' && (
        <div className={`mb-6 p-4 rounded-lg flex items-center ${
          status === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
        }`}>
          {status === 'success' ? (
            <CheckCircle className="w-5 h-5 mr-2" />
          ) : (
            <XCircle className="w-5 h-5 mr-2" />
          )}
          {message}
        </div>
      )}
      
      <ProfileForm
        data={formData}
        onChange={(updates) => setFormData(prev => ({ ...prev, ...updates }))}
        onSubmit={handleSubmit}
        isSubmitting={status === 'submitting'}
      />
    </div>
  );
}