import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SeverityBadge from './SeverityBadge';

describe('SeverityBadge', () => {
  it('renders the severity text in uppercase', () => {
    render(<SeverityBadge severity="critical" />);
    expect(screen.getByText('CRITICAL')).toBeInTheDocument();
  });

  it('applies the correct background color for critical', () => {
    const { container } = render(<SeverityBadge severity="critical" />);
    const span = container.firstChild as HTMLElement;
    expect(span.style.backgroundColor).toBe('rgb(255, 68, 68)'); // #ff4444
  });

  it('applies the correct background color for medium', () => {
    const { container } = render(<SeverityBadge severity="medium" />);
    const span = container.firstChild as HTMLElement;
    expect(span.style.backgroundColor).toBe('rgb(255, 159, 10)'); // #ff9f0a
  });

  it('applies default color for unknown severity', () => {
    const { container } = render(<SeverityBadge severity="info" />);
    const span = container.firstChild as HTMLElement;
    expect(span.style.backgroundColor).toBe('rgb(0, 200, 81)'); // #00C851
  });
});
