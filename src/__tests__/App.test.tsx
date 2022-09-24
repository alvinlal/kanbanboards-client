import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App.tsx', () => {
  it('displays hello world', () => {
    render(<App />);
    const helloWorldElement = screen.getByRole('heading', {
      name: 'hello worl',
    });
    expect(helloWorldElement).toBeInTheDocument();
  });
});
