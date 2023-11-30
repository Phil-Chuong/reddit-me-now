import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for custom matchers

import ScrollToTopButton from '../ScrollToTopButton/ScrollToTopButton';


describe('ScrollToTopButton', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<ScrollToTopButton />);
    const buttonElement = getByText('Scroll to Top');
    expect(buttonElement).toBeInTheDocument();
  });

  it('scrolls to the top when the button is clicked', () => {
    const { getByText } = render(<ScrollToTopButton />);
    window.scrollTo = jest.fn(); // Mock the window.scrollTo function
    fireEvent.click(getByText('Scroll to Top'));
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });
});
