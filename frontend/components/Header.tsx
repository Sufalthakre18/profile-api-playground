'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { isAuthenticated, removeToken } from '@/lib/auth';
import { useState, useEffect } from 'react';

export default function Header() {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    setIsAuth(isAuthenticated());
  }, []);

  const handleLogout = () => {
    removeToken();
    setIsAuth(false);
    router.push('/login');
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-xl font-bold text-gray-900 hover:text-blue-600 transition"
          >
            Me-API Playground
          </Link>

          <nav className="flex items-center gap-4">
            <Link 
              href="/" 
              className="text-gray-600 hover:text-gray-900 transition"
            >
              Home
            </Link>
            
            {isAuth ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}