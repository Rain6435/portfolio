// src/components/ScrollToTop.jsx
import { useEffect, useRef } from 'react';
import { useLocation } from '@tanstack/react-router';

function ScrollToTop() {
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);
  
  useEffect(() => {
    // Save the current scroll position when navigating away from home
    if (prevPathRef.current === '/' && location.pathname !== '/') {
      sessionStorage.setItem('homePageScrollPos', window.scrollY.toString());
    }
    
    // Scroll logic based on current page
    if (location.pathname === '/') {
      // We're on the home page
      // Check if we're coming back to home from another page
      if (prevPathRef.current !== '/' && prevPathRef.current !== '') {
        const savedPosition = sessionStorage.getItem('homePageScrollPos');
        if (savedPosition !== null) {
          // Use a small timeout to ensure the DOM is ready
          setTimeout(() => {
            window.scrollTo(0, parseInt(savedPosition, 10));
          }, 10);
        }
      }
      // Otherwise, don't modify scroll for navigation within home page
    } else {
      // For all other pages, always scroll to top
      window.scrollTo(0, 0);
      
      // Add a slight delay for reliability
      const timeoutId = setTimeout(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'instant'
        });
        
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }, 10);
      
      return () => clearTimeout(timeoutId);
    }
    
    // Update the previous path reference
    prevPathRef.current = location.pathname;
  }, [location.pathname]);
  
  return null;
}

export default ScrollToTop;