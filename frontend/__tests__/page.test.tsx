import { render, screen } from '@testing-library/react';
import Home from '../src/app/page';

describe('Home', () => {
  it('renders title', () => {
    render(<Home />);
    expect(screen.getByText('Production Orders')).toBeInTheDocument();
  });
});
