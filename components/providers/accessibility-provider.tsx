// components/providers/accessibility-provider.tsx
'use client';

import { createContext, useContext, useEffect } from 'react';

const AccessibilityContext = createContext({
  ensureAccessibility: () => {},
});

export function AccessibilityProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const ensureAccessibility = () => {
      // Ensure all images have alt text
      document.querySelectorAll('img').forEach((img) => {
        if (!img.alt) {
          console.warn('Image missing alt text:', img);
        }
      });

      // Ensure all interactive elements are keyboard accessible
      document.querySelectorAll('a, button, [role="button"]').forEach((element) => {
        if (
          element instanceof HTMLElement &&
          (!element.tabIndex || element.tabIndex < 0) &&
          !element.hasAttribute('disabled')
        ) {
          element.tabIndex = 0;
        }
      });

      // Add appropriate ARIA labels to interactive elements without accessible names
      document.querySelectorAll('button, [role="button"]').forEach((button) => {
        if (
          button instanceof HTMLElement &&
          !button.getAttribute('aria-label') &&
          !button.textContent?.trim()
        ) {
          console.warn('Button missing accessible name:', button);
        }
      });

      // Ensure proper heading hierarchy
      let lastHeadingLevel = 1;
      document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((heading) => {
        const currentLevel = parseInt(heading.tagName[1]);
        if (currentLevel - lastHeadingLevel > 1) {
          console.warn('Heading level skipped:', heading);
        }
        lastHeadingLevel = currentLevel;
      });

      // Add skip to main content link for keyboard users
      if (!document.querySelector('#skip-to-main')) {
        const skipLink = document.createElement('a');
        skipLink.id = 'skip-to-main';
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className =
          'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:p-4 focus:bg-background focus:border focus:rounded';
        document.body.insertBefore(skipLink, document.body.firstChild);
      }
    };

    // Run initial accessibility check
    ensureAccessibility();

    // Set up mutation observer to check new content
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length > 0) {
          ensureAccessibility();
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  return (
    <AccessibilityContext.Provider value={{ ensureAccessibility: () => {} }}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export const useAccessibility = () => useContext(AccessibilityContext);
