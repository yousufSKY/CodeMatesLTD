"use client";

import { useEffect, useRef } from 'react';
import { useAuth } from '@/lib/auth-context';

const TIMEOUT_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds

export function useSessionTimeout() {  const { logout } = useAuth();
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(async () => {
      console.log('Session timeout due to inactivity');
      await logout();
    }, TIMEOUT_DURATION);
  };

  useEffect(() => {
    // Activity event listeners
    const events = [
      'mousedown',
      'mousemove',
      'keypress',
      'scroll',
      'touchstart',
      'click',
    ];

    // Handler for user activity
    const activityHandler = () => {
      resetTimeout();
    };

    // Add event listeners
    events.forEach((event) => {
      window.addEventListener(event, activityHandler, false);
    });

    // Initial timeout
    resetTimeout();

    // Handle tab visibility changes
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Clear timeout when tab is hidden
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      } else {
        // Reset timeout when tab becomes visible
        resetTimeout();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      events.forEach((event) => {
        window.removeEventListener(event, activityHandler);
      });
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [logout]);
}
