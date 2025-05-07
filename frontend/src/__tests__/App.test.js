import { render, screen } from '@testing-library/react';
import App from '../index.css';

test('renders hello from react text', () => {
  render(<App />);
  const linkElement = screen.getByText(/hello from react/i);
  expect(linkElement).toBeInTheDocument();
});

