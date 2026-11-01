import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

interface ErrorBoundaryProps {
  readonly children: ReactNode;
  /** i18n key with the message for the area this boundary protects. */
  readonly titleKey: string;
  /** Injected in tests; in the app it falls back to a full page reload. */
  readonly onRetry?: () => void;
}

interface ErrorBoundaryState {
  readonly hasError: boolean;
}

interface ErrorFallbackProps {
  readonly titleKey: string;
  readonly onRetry: () => void;
}

const ErrorFallback = ({ titleKey, onRetry }: ErrorFallbackProps) => {
  const { t } = useTranslation();

  return (
    <div role="alert" className="max-w-7xl mx-auto px-6 py-24 text-center">
      <h2 className="font-bold mb-4 text-3xl text-on-surface">{t(titleKey)}</h2>
      <p className="mb-8 text-lg text-on-surface-variant">{t('errorBoundary.description')}</p>
      <button
        type="button"
        autoFocus
        onClick={onRetry}
        className="bg-primary cursor-pointer font-bold py-3 px-8 rounded-xl text-on-primary transition-opacity hover:opacity-90"
      >
        {t('errorBoundary.retry')}
      </button>
    </div>
  );
};

/**
 * Catches render and import errors below it. A class is required: React 19 has
 * no hook equivalent. Retry reloads the page because a failed lazy chunk stays
 * failed for the life of the module (React.lazy memoises the rejection).
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleRetry = () => {
    if (this.props.onRetry) {
      this.props.onRetry();
      return;
    }
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return <ErrorFallback titleKey={this.props.titleKey} onRetry={this.handleRetry} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
