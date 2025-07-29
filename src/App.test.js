import { render, screen } from '@testing-library/react';
import App from './App';

test('renders darts scorer app', () => {
  render(<App />);
  const headerElement = screen.getByText(/welcome to darts scorer/i);
  expect(headerElement).toBeInTheDocument();
});
