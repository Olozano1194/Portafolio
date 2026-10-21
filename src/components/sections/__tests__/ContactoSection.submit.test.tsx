import { render, screen, waitFor, act } from '@testing-library/react';
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

describe('ContactoSection — submit, env guard and loading state', () => {
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

  describe('Env guard (D3)', () => {
    it('shows envMissing toast and does not fetch when VITE_CONTACTFORM_URL is unset', async () => {
      vi.unstubAllEnvs();
      render(<ContactoSection />);
      await fillForm();
      await userEvent.click(screen.getByRole('button', { name: 'Send Proposal' }));

      await waitFor(() => expect(globalThis.fetch).not.toHaveBeenCalled());
      expect(toastMock.error).toHaveBeenCalledWith('Contact form is not configured. Please reach out another way');
      expect(toastMock.success).not.toHaveBeenCalled();
    });

    it('proceeds to fetch when VITE_CONTACTFORM_URL is set', async () => {
      vi.stubEnv('VITE_CONTACTFORM_URL', 'https://formspree.io/f/test');
      render(<ContactoSection />);
      await fillForm();

      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ ok: true }),
      });

      await userEvent.click(screen.getByRole('button', { name: 'Send Proposal' }));

      await waitFor(() => expect(globalThis.fetch).toHaveBeenCalledTimes(1));
    });
  });

  describe('Submit flow (D4, D6)', () => {
    beforeEach(() => {
      vi.stubEnv('VITE_CONTACTFORM_URL', 'https://formspree.io/f/test');
    });

    it('shows success toast and resets form on 2xx', async () => {
      render(<ContactoSection />);
      await fillForm();

      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ ok: true }),
      });

      await userEvent.click(screen.getByRole('button', { name: 'Send Proposal' }));

      await waitFor(() =>
        expect(toastMock.success).toHaveBeenCalledWith("Message sent; you'll get a reply within 24 hours"),
      );
      await waitFor(() => expect(screen.getByLabelText('Name')).toHaveValue(''));
      await waitFor(() => expect(screen.getByLabelText('Email')).toHaveValue(''));
      await waitFor(() => expect(screen.getByLabelText('Message')).toHaveValue(''));
    });

    it('shows error toast and keeps fields on 422', async () => {
      render(<ContactoSection />);
      await fillForm();

      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 422,
        json: async () => ({ message: 'Validation failed' }),
      });

      await userEvent.click(screen.getByRole('button', { name: 'Send Proposal' }));

      await waitFor(() =>
        expect(toastMock.error).toHaveBeenCalledWith('Sorry, your message could not be sent. Please try again'),
      );
      await waitFor(() => expect(screen.getByLabelText('Name')).toHaveValue('John Doe'));
      await waitFor(() => expect(screen.getByLabelText('Email')).toHaveValue('john@example.com'));
      await waitFor(() => expect(screen.getByLabelText('Message')).toHaveValue(validFormData.mensaje));
    });

    it('shows error toast and keeps fields on network error', async () => {
      render(<ContactoSection />);
      await fillForm();

      globalThis.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

      await userEvent.click(screen.getByRole('button', { name: 'Send Proposal' }));

      await waitFor(() =>
        expect(toastMock.error).toHaveBeenCalledWith('Sorry, your message could not be sent. Please try again'),
      );
      await waitFor(() => expect(screen.getByLabelText('Name')).toHaveValue('John Doe'));
    });

    it('shows exactly one toast per attempt (no double toast)', async () => {
      render(<ContactoSection />);
      await fillForm();

      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ ok: true }),
      });

      await userEvent.click(screen.getByRole('button', { name: 'Send Proposal' }));

      await waitFor(() => expect(toastMock.success).toHaveBeenCalledTimes(1));
      expect(toastMock.error).not.toHaveBeenCalled();
    });
  });

  describe('Loading state and double-submit prevention (D6, R3)', () => {
    beforeEach(() => {
      vi.stubEnv('VITE_CONTACTFORM_URL', 'https://formspree.io/f/test');
    });

    const deferredFetch = () => {
      let resolveFetch!: (value: Response) => void;
      const fetchPromise = new Promise<Response>((resolve) => {
        resolveFetch = resolve;
      });
      globalThis.fetch = vi.fn().mockReturnValue(fetchPromise);
      return { resolveFetch };
    };

    it('disables button and shows spinner while submitting', async () => {
      const { resolveFetch } = deferredFetch();

      render(<ContactoSection />);
      await fillForm();

      const submitBtn = screen.getByRole('button', { name: 'Send Proposal' });
      await act(async () => {
        await userEvent.click(submitBtn);
      });

      await waitFor(() => expect(submitBtn).toBeDisabled());
      await waitFor(() => expect(submitBtn).toHaveTextContent('Sending…'));
      expect(submitBtn).toHaveAttribute('aria-busy', 'true');
      expect(submitBtn.querySelector('.animate-spin')).toBeInTheDocument();

      resolveFetch({
        ok: true,
        json: async () => ({ ok: true }),
      } as Response);

      await waitFor(() => expect(submitBtn).not.toBeDisabled());
      await waitFor(() => expect(submitBtn).toHaveTextContent('Send Proposal'));
    });

    it('prevents double-submit: second click does not trigger second fetch', async () => {
      deferredFetch();

      render(<ContactoSection />);
      await fillForm();

      const submitBtn = screen.getByRole('button', { name: 'Send Proposal' });
      await act(async () => {
        await userEvent.click(submitBtn);
      });

      await act(async () => {
        await userEvent.click(submitBtn);
      });

      await waitFor(() => expect(globalThis.fetch).toHaveBeenCalledTimes(1));
    });

    it('clears loading state on error (finally block)', async () => {
      vi.stubEnv('VITE_CONTACTFORM_URL', 'https://formspree.io/f/test');
      render(<ContactoSection />);
      await fillForm();

      globalThis.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

      const submitBtn = screen.getByRole('button', { name: 'Send Proposal' });
      await act(async () => {
        await userEvent.click(submitBtn);
      });

      await waitFor(() => expect(submitBtn).not.toBeDisabled());
      await waitFor(() => expect(submitBtn).toHaveTextContent('Send Proposal'));
    });
  });
});
