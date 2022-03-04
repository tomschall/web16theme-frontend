/**
 * The function takes a string as an argument and sets the global variable lang to the string.
 * @param {string} langStr - The language string to set the language to.
 */

export const setLanguage = (langStr: string) => {
  switch (langStr) {
    case 'en': {
      return langStr;
    }
    case 'de': {
      return langStr;
    }
    default: {
      let language = document.documentElement.lang;
      if (language === 'en' || language === 'de') {
        return language;
      } else {
        return 'de';
      }
    }
  }
};
