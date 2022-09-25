import { render } from '@testing-library/react';
import App from '../App';

describe('App.tsx', () => {
  it('tests that jest is working', () => {
    render(<App />);
    expect(true).toBe(true);
  });
});
