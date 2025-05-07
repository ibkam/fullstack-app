import '@testing-library/jest-dom';
import React from "react";
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders hello from react text', () => {
  render(<App />);
  const linkElement = screen.getByText(/hello from react/i);
  expect(linkElement).toBeInTheDocument();
});
