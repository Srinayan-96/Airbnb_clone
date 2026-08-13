"use client";

import React, { useState } from 'react';
import { X, Mail, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, login } = useAuth();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [email, setEmail] = useState("");

  if (!isAuthModalOpen) return null;

  const handleFakeGoogleLogin = async () => {
    setIsLoggingIn(true);
    try {
      // Simulate Google login by logging in as the seeded guest account
      await login('guest1@example.com');
      closeAuthModal();
      toast.success("Logged in successfully!");
    } catch (err) {
      toast.error("Failed to login with Google");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoggingIn(true);
    try {
      // Login with whatever they typed (will fail if not seeded, but we can assume they type guest1 or we just fallback to guest1)
      // To make it feel real but always work, we'll just log them in as guest1 if they type anything, 
      // or try to actually authenticate. Let's try to authenticate, if it fails, show an alert.
      await login(email);
      closeAuthModal();
      toast.success("Welcome back!");
    } catch (err) {
      toast.error("Account not found. Try 'guest1@example.com' or use Google.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity">
      <div 
        className="w-full max-w-[568px] bg-white rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 m-4 md:m-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <button 
            onClick={closeAuthModal}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-800" />
          </button>
          <h2 className="text-[16px] font-bold text-ink flex-1 text-center pr-9">Log in or sign up</h2>
        </div>

        {/* Body */}
        <div className="p-6">
          <h3 className="text-[22px] font-medium text-ink mb-6">Welcome to Airbnb</h3>
          
          <form onSubmit={handleEmailSubmit} className="flex flex-col gap-4">
            <div className="relative">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full px-4 py-4 border border-gray-400 rounded-lg focus:outline-none focus:border-black focus:border-[2px] transition-colors peer"
                required
              />
            </div>
            
            <button 
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-[#E61E4D] hover:bg-[#D70466] text-white font-bold py-3.5 rounded-lg transition-colors flex justify-center items-center h-[52px]"
            >
              {isLoggingIn ? <Loader2 className="w-5 h-5 animate-spin" /> : "Continue"}
            </button>
          </form>

          <div className="flex items-center gap-4 my-6">
            <div className="h-px bg-gray-200 flex-1"></div>
            <span className="text-[12px] text-gray-500 font-medium">or</span>
            <div className="h-px bg-gray-200 flex-1"></div>
          </div>

          <div className="flex flex-col gap-4">
            <button 
              onClick={handleFakeGoogleLogin}
              disabled={isLoggingIn}
              className="w-full flex items-center justify-center gap-2 border border-black text-ink font-medium py-3 rounded-lg hover:bg-gray-50 transition-colors relative"
            >
              <img src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" alt="Google" className="w-5 h-5 absolute left-4" />
              Continue with Google
            </button>
            <button 
              type="button"
              disabled={isLoggingIn}
              className="w-full flex items-center justify-center gap-2 border border-black text-ink font-medium py-3 rounded-lg hover:bg-gray-50 transition-colors relative"
            >
              <img src="https://cdn-icons-png.flaticon.com/512/0/747.png" alt="Apple" className="w-5 h-5 absolute left-4" />
              Continue with Apple
            </button>
            <button 
              type="button"
              disabled={isLoggingIn}
              className="w-full flex items-center justify-center gap-2 border border-black text-ink font-medium py-3 rounded-lg hover:bg-gray-50 transition-colors relative"
            >
              <Mail className="w-5 h-5 absolute left-4" />
              Continue with email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
