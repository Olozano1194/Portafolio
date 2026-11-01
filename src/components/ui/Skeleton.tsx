import { useTranslation } from 'react-i18next';

interface SkeletonProps {
  readonly className?: string;
}

/**
 * Loading placeholder used as the Suspense fallback.
 * The caller reserves the final height through `className` (for example
 * `min-h-96`) so the page does not jump when the real content arrives.
 */
const Skeleton = ({ className = '' }: SkeletonProps) => {
  const { t } = useTranslation();

  return (
    <div
      role="status"
      aria-busy="true"
      className={`animate-pulse bg-surface-alt rounded-xl motion-reduce:animate-none ${className}`}
    >
      <span className="sr-only">{t('loading.label')}</span>
    </div>
  );
};

export default Skeleton;
