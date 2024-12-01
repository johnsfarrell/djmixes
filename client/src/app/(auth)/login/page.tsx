/**
 * Copyright (c) 2024 DJMixes. All rights reserved.
 * Licensed under the MIT License.
 * Description: This file contains the login page component that renders the
 * login form, handles form submission, and redirects the user to the home page
 * upon successful login.
 */

'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthCard from '@/components/Auth/AuthCard';
import AuthInput from '@/components/Auth/AuthInput';

/**
 * The login page component renders the login form, handles form submission, and
 * redirects the user to the home page upon successful login.
 * @returns The login page component
 */
export default function LoginPage(): JSX.Element {
  const router = useRouter();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Prevents multiple form submissions

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // TODO: Implement actual login logic
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push('/');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthCard 
      title="Welcome back" 
      subtitle="Sign in to your account to continue"
    >
      <form onSubmit={handleSubmit}>
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded-md">
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        )}

        <AuthInput
          label="Email"
          type="email"
          placeholder="you@example.com"
          required
        />

        <AuthInput
          label="Password"
          type="password"
          placeholder="••••••••"
          required
        />

        <div className="flex justify-end mb-6">
          <Link 
            href="/forgot-password"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-white text-gray-900 py-2 px-4 rounded-md font-medium hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Signing in...' : 'Sign in'}
        </button>

        <p className="mt-4 text-center text-gray-400">
          Don't have an account?{' '}
          <Link 
            href="/register" 
            className="text-white hover:text-gray-300 transition-colors"
          >
            Sign up
          </Link>
        </p>
      </form>
    </AuthCard>
  );
}
