import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { scrollToSection } from '../../../utils/scrollToSection';
import HeroSection from '../HeroSection';

// Mock i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => {
      const translations = {
        'home.button': 'Junior Developer Portfolio',
        'home.greeting.intro': 'Building the ',
        'home.greeting.name': 'Digital Future.',
        'home.description.intro': 'I build digital solutions.',
        'home.description.btnProjects': 'View Projects',
        'home.description.btnContact': 'Contact',
        'home.card.title': 'Current Status',
        'home.card.description': 'Available for work.',
      };
      return translations[key] || key;
    },
    i18n: { language: 'en' },
  }),
}));

// Mock scrollToSection
vi.mock('../../../utils/scrollToSection', () => ({
  scrollToSection: vi.fn(),
}));

describe('HeroSection', () => {
  it('renders the greeting heading', () => {
    render(<HeroSection />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading.textContent).toContain('Building the');
    expect(heading.textContent).toContain('Digital Future.');
  });

  it('renders the description', () => {
    render(<HeroSection />);
    expect(screen.getByText('I build digital solutions.')).toBeInTheDocument();
  });

  it('renders both CTA buttons', () => {
    render(<HeroSection />);
    expect(screen.getByText('View Projects')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('renders the portfolio badge', () => {
    render(<HeroSection />);
    expect(screen.getByText('Junior Developer Portfolio')).toBeInTheDocument();
  });

  it('renders the status card', () => {
    render(<HeroSection />);
    expect(screen.getByText('Current Status')).toBeInTheDocument();
    expect(screen.getByText('Available for work.')).toBeInTheDocument();
  });

  it('calls scrollToSection with "proyectos" when clicking "View Projects"', async () => {
    const user = userEvent.setup();
    render(<HeroSection />);
    await user.click(screen.getByText('View Projects'));
    expect(scrollToSection).toHaveBeenCalledWith('proyectos');
  });
});