
import { render, screen } from '@testing-library/react';
import { Button } from '../button';
import { Mail } from 'lucide-react';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Test Button</Button>);
    expect(screen.getByRole('button', { name: 'Test Button' })).toBeInTheDocument();
  });

  it('applies correct variant classes', () => {
    render(<Button variant="destructive">Delete</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-destructive');
  });

  it('renders with icon', () => {
    render(
      <Button>
        <Mail className="mr-2 h-4 w-4" />
        Send Email
      </Button>
    );
    expect(screen.getByRole('button', { name: 'Send Email' })).toBeInTheDocument();
  });

  it('handles disabled state', () => {
    render(<Button disabled>Disabled Button</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
