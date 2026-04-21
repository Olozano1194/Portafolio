import { useTranslation } from 'react-i18next';

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => changeLanguage('es')}
        className={`px-3 py-1 rounded ${
          i18n.language === 'es' 
            ? 'bg-primary text-on-primary' 
            : 'bg-surface-alt text-on-surface'
        }`}
      >
        ES
      </button>
      <button
        onClick={() => changeLanguage('en')}
        className={`px-3 py-1 rounded ${
          i18n.language === 'en' 
            ? 'bg-primary text-on-primary' 
            : 'bg-surface-alt text-on-surface'
        }`}
      >
        EN
      </button>
    </div>
  );
}

export default LanguageSwitcher;