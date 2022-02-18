/**
 * The function takes a string as an argument and sets the global variable lang to the string.
 * @param {string} langStr - The language string to set the language to.
 */

export const setLanguage = (langStr: string, setLanguageCallback: any) => {
  switch (langStr) {
    case 'en': {
      setLanguageCallback(langStr);
    }
    case 'de': {
      setLanguageCallback(langStr);
    }
    default: {
      let language = document.documentElement.lang;
      if (language === 'en' || language === 'de') {
        setLanguageCallback(language);
      } else {
        setLanguageCallback('de');
      }
    }
  }
};
