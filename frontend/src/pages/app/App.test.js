import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('renders Bienvenue chez Informateur link', () => {
    render(<App />);
    const linkElement = screen.getByText("Bienvenue chez Informateur");
    expect(linkElement).toBeInTheDocument();
  });
});