import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { contactTranslations, translateContact } from './contactoSection.mocks';

const { toastMock } = vi.hoisted(() => ({
  toastMock: { success: vi.fn(), error: vi.fn() },
}));

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: translateContact(contactTranslations),
    i18n: { language: 'en' },
  }),
}));

vi.mock('react-hot-toast', () => ({
  __esModule: true,
  default: toastMock,
  toast: toastMock,
  Toaster: () => null,
}));

import ContactoSection from '../ContactoSection';

describe('ContactoSection — render, honeypot and validation', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    globalThis.fetch = vi.fn();
    vi.unstubAllEnvs();
    toastMock.success.mockClear();
    toastMock.error.mockClear();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  const validFormData = {
    nombre: 'John Doe',
    email: 'john@example.com',
    mensaje: 'This is a valid message with enough characters to pass validation.',
    website: '',
  };

  const fillForm = async (data: Partial<typeof validFormData> = {}) => {
    const user = userEvent.setup();
    const merged = { ...validFormData, ...data };
    if (merged.nombre) await user.type(screen.getByLabelText('Name'), merged.nombre);
    if (merged.email) await user.type(screen.getByLabelText('Email'), merged.email);
    if (merged.mensaje) await user.type(screen.getByLabelText('Message'), merged.mensaje);
  };

  it('renders form fields and submit button', () => {
    render(<ContactoSection />);
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Message')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Send Proposal' })).toBeInTheDocument();
  });

  describe('Honeypot guard (D2)', () => {
    it('does not call fetch or toast when honeypot is filled', async () => {
      vi.stubEnv('VITE_CONTACTFORM_URL', 'https://formspree.io/f/test');
      const { container } = render(<ContactoSection />);
      await fillForm({ website: 'bot-filled-value' });

      const honeypotInput = container.querySelector('input[name="website"]') as HTMLInputElement;
      fireEvent.change(honeypotInput, { target: { value: 'bot-filled-value' } });

      await userEvent.click(screen.getByRole('button', { name: 'Send Proposal' }));

      await waitFor(() => expect(globalThis.fetch).not.toHaveBeenCalled());
      expect(toastMock.success).not.toHaveBeenCalled();
      expect(toastMock.error).not.toHaveBeenCalled();
    });
  });

  describe('Client-side validation (R1-R5)', () => {
    beforeEach(() => {
      vi.stubEnv('VITE_CONTACTFORM_URL', 'https://formspree.io/f/test');
    });

    it('blocks invalid email format', async () => {
      render(<ContactoSection />);
      await fillForm({ email: 'not-an-email' });
      await userEvent.click(screen.getByRole('button', { name: 'Send Proposal' }));

      await waitFor(() => expect(globalThis.fetch).not.toHaveBeenCalled());
      await waitFor(() => expect(screen.getByLabelText('Email')).toHaveAttribute('aria-invalid', 'true'));
      expect(screen.getByText('Invalid email format')).toBeInTheDocument();
    });

    it('blocks too-short name', async () => {
      render(<ContactoSection />);
      await fillForm({ nombre: 'Ana' });
      await userEvent.click(screen.getByRole('button', { name: 'Send Proposal' }));

      await waitFor(() => expect(globalThis.fetch).not.toHaveBeenCalled());
      await waitFor(() => expect(screen.getByLabelText('Name')).toHaveAttribute('aria-invalid', 'true'));
      expect(screen.getByText('Name must be at least 4 characters')).toBeInTheDocument();
    });

    it('blocks too-long name', async () => {
      render(<ContactoSection />);
      await fillForm({ nombre: 'A'.repeat(21) });
      await userEvent.click(screen.getByRole('button', { name: 'Send Proposal' }));

      await waitFor(() => expect(globalThis.fetch).not.toHaveBeenCalled());
      await waitFor(() => expect(screen.getByLabelText('Name')).toHaveAttribute('aria-invalid', 'true'));
      expect(screen.getByText('Name must be at most 20 characters')).toBeInTheDocument();
    });

    it('blocks too-short message', async () => {
      render(<ContactoSection />);
      await fillForm({ mensaje: 'Short' });
      await userEvent.click(screen.getByRole('button', { name: 'Send Proposal' }));

      await waitFor(() => expect(globalThis.fetch).not.toHaveBeenCalled());
      await waitFor(() => expect(screen.getByLabelText('Message')).toHaveAttribute('aria-invalid', 'true'));
      expect(screen.getByText('Message must be at least 10 characters')).toBeInTheDocument();
    });

    it('blocks too-long message', async () => {
      const { container } = render(<ContactoSection />);
      const user = userEvent.setup();

      await user.type(container.querySelector('input[name="nombre"]') as HTMLInputElement, 'John Doe');
      await user.type(container.querySelector('input[name="email"]') as HTMLInputElement, 'john@example.com');

      const messageInput = container.querySelector('textarea[name="mensaje"]') as HTMLTextAreaElement;
      fireEvent.change(messageInput, { target: { value: 'A'.repeat(501) } });

      await userEvent.click(container.querySelector('button[type="submit"]') as HTMLButtonElement);

      await waitFor(() => expect(globalThis.fetch).not.toHaveBeenCalled(), { timeout: 10000 });
      await waitFor(
        () => expect(container.querySelector('textarea[name="mensaje"]')).toHaveAttribute('aria-invalid', 'true'),
        { timeout: 10000 },
      );
      expect(container.querySelector('span[id="mensaje-error"]')?.textContent).toBe(
        'Message must be at most 500 characters',
      );
    });
  });
});
