import React, { useState, useEffect } from 'react';
import './ScrollToTopButton.css';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Function to scroll back to the top of the page
  const scrollToTop = () => {
      window.scrollTo({
      top: 0,
      behavior: 'smooth', // Add smooth scrolling behavior
    });
  };

  // Show or hide the button based on the user's scroll position
  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Add a scroll event listener to check the user's scroll position
  useEffect(() => {
      window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`scroll-to-top-button ${isVisible ? 'visible' : ''}`}>
      <button onClick={scrollToTop}>
        Scroll to Top
      </button>
    </div>
  );
};

export default ScrollToTopButton;
