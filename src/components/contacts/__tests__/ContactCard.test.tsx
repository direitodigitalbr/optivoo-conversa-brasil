
import { render, screen } from '@testing-library/react';
import ContactCard from '../ContactCard';

describe('ContactCard', () => {
  const defaultProps = {
    id: '1',
    name: 'João Silva',
    phone: '+55 11 99999-9999',
    email: 'joao@email.com',
  };

  it('renders contact information correctly', () => {
    render(<ContactCard {...defaultProps} />);
    
    expect(screen.getByText('João Silva')).toBeInTheDocument();
    expect(screen.getByText('+55 11 99999-9999')).toBeInTheDocument();
    expect(screen.getByText('joao@email.com')).toBeInTheDocument();
  });

  it('displays tag when provided', () => {
    render(<ContactCard {...defaultProps} tag="hot" />);
    expect(screen.getByText('Quente')).toBeInTheDocument();
  });

  it('shows unread count badge when greater than 0', () => {
    render(<ContactCard {...defaultProps} unreadCount={3} />);
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('renders without email when not provided', () => {
    const propsWithoutEmail = { ...defaultProps };
    delete propsWithoutEmail.email;
    
    render(<ContactCard {...propsWithoutEmail} />);
    expect(screen.queryByText('joao@email.com')).not.toBeInTheDocument();
  });
});
