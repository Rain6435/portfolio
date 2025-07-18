import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { i18n, t } = useTranslation();

  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;
    i18n.changeLanguage(newLanguage);
  };

  return (
    <div className="language-selector">
      <label htmlFor="language-select" className="visually-hidden">
        {t('language')}
      </label>
      <select
        id="language-select"
        value={i18n.language}
        onChange={handleLanguageChange}
        className="form-select"
        aria-label={t('language')}
      >
        <option value="en">English</option>
        <option value="fr">Français</option>
      </select>
    </div>
  );
};

export default LanguageSelector;