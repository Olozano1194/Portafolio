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
            ? 'bg-primary text-bg-card' 
            : 'bg-dark-text-primary dark:bg-gray-700'
        }`}
      >
        ES
      </button>
      <button
        onClick={() => changeLanguage('en')}
        className={`px-3 py-1 rounded ${
          i18n.language === 'en' 
            ? 'bg-primary text-bg-card' 
            : 'bg-dark-text-primary dark:bg-gray-700'
        }`}
      >
        EN
      </button>
    </div>
  );
}

export default LanguageSwitcher;