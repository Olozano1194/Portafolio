import { lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import ErrorBoundary from '../ui/ErrorBoundary';
import Skeleton from '../ui/Skeleton';

// react-hook-form (≈27 KB gzip) is only needed here, so the form gets its own chunk.
// The section keeps `id="contacto"` and the heading, so scrollToSection still works
// while the chunk loads.
const ContactoForm = lazy(() => import('./contacto/ContactoForm'));

const ContactoSection = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-surface py-24 px-8 text-on-surface" id="contacto">
      <div className="max-w-7xl mx-auto text-center">
        <h2 id="contacto-title" className="font-bold mb-8 text-5xl tracking-tighter">
          {t("contact.title")}
        </h2>
        <p className="mb-12 text-xl text-on-surface-variant">{t("contact.description")}</p>
        <ErrorBoundary titleKey="errorBoundary.contactTitle">
          <Suspense fallback={<Skeleton className="min-h-96 w-full" />}>
            <ContactoForm />
          </Suspense>
        </ErrorBoundary>
      </div>
    </section>
  );
};

export default ContactoSection;