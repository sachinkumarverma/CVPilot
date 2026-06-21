'use client';

import Link from 'next/link';
import { Menu, X, User as UserIcon, LogOut } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import type { User } from '@supabase/supabase-js';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();
  const router = useRouter();
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    // Click outside listener
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      subscription.unsubscribe();
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [supabase]);

  // Close menus on route change
  const pathname = usePathname();
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileMenuOpen(false);
  }, [pathname]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setIsProfileMenuOpen(false); // Close immediately
    router.push('/');
  };

  return (
    <nav className="border-b border-gray-200/50 bg-white/80 backdrop-blur-md sticky top-0 z-50 dark:bg-black/80 dark:border-white/10 print:hidden">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo.png" alt="CVPilot Logo" className="w-full h-full object-contain drop-shadow-sm" />
              </div>
              <div className="font-bold text-2xl tracking-wide flex items-center">
                <span className="text-blue-600 dark:text-blue-500">CV</span>
                <span className="text-gray-900 dark:text-white">Pilot</span>
              </div>
            </Link>
          </div>

          <div className="hidden md:flex space-x-8 items-center">
            <div className="flex space-x-8 items-center mr-4">
              <Link href="/features" className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">Features</Link>
              <Link href="/templates" className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">Templates</Link>
              <Link href="/pricing" className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">Pricing</Link>
            </div>

            <div className="flex space-x-4 items-center pl-4 border-l border-gray-200 dark:border-gray-700 relative">
              <a href="https://skillnora.vercel.app/" target="_blank" rel="noreferrer" className="text-sm font-bold bg-amber-400 text-amber-950 px-4 py-2 rounded-lg hover:bg-amber-500 transition-all shadow-sm flex items-center transform hover:-translate-y-0.5">
                <span className="mr-1">🎓</span> Learn to Code
              </a>
              <Link href="/builder" className="text-sm font-medium bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 transition-colors shadow-sm">
                Build Resume
              </Link>

              {user ? (
                <div className="relative" ref={profileMenuRef}>
                  <button
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-shadow ml-2"
                  >
                    {user.user_metadata?.avatar_url ? (
                      <img src={user.user_metadata.avatar_url} alt="Avatar" className="w-8 h-8 rounded-full" />
                    ) : (
                      <UserIcon className="w-5 h-5" />
                    )}
                  </button>

                  {/* Dropdown Menu */}
                  {isProfileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 py-1 z-50">
                      <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {user.user_metadata?.first_name || user.user_metadata?.last_name
                            ? `${user.user_metadata.first_name || ''} ${user.user_metadata.last_name || ''}`.trim()
                            : user.user_metadata?.full_name || user.user_metadata?.name || 'User'}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
                          {user.email}
                        </p>
                      </div>
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors flex items-center"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link href="/login" className="text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm">
                  Login
                </Link>
              )}
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-black border-b border-gray-200/50 dark:border-white/10 px-4 pt-2 pb-4 space-y-1">
          <a href="https://skillnora.vercel.app/" target="_blank" rel="noreferrer" className="block px-3 py-2 text-base font-bold text-amber-600 dark:text-amber-500 rounded-md hover:bg-amber-50 dark:hover:bg-amber-900/30">
            🎓 Learn to Code
          </a>
          <Link href="/features" className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-900">Features</Link>
          <Link href="/templates" className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-900">Templates</Link>
          <Link href="/pricing" className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-900">Pricing</Link>
          <div className="pt-4 border-t border-gray-200/50 dark:border-white/10 space-y-2 mt-4 flex flex-col gap-2">
            {user ? (
              <button
                onClick={handleSignOut}
                className="block w-full text-center px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 border border-gray-200 dark:border-white/10 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10"
              >
                Sign Out
              </button>
            ) : (
              <Link href="/login" className="block w-full text-center px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">Login</Link>
            )}
            <Link href="/builder" className="block w-full text-center px-4 py-2 text-sm font-medium bg-gray-900 text-white dark:bg-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200">Build Resume</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
