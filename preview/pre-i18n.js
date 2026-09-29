async function load_locale(locale){
  const response = await fetch(`../locales/${locale}.json`);
  return await response.json();
}

async function apply_locale(locale){
  const translations = await load_locale(locale);

  document.querySelectorAll("[data-i18n]").forEach(element => {
    const key = element.dataset.i18n;

    if (translations[key] !== undefined) {
      element.textContent = translations[key];
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {
    const key = element.dataset.i18nPlaceholder;

    if (translations[key] !== undefined) {
      element.placeholder = translations[key];
    }
  });
}

const locale = navigator.language.startsWith("ja")
  ? "ja"
  : "en";

apply_locale(locale);
