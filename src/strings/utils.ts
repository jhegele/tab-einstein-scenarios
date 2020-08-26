import stringsAll, { StringsLanguages } from '.';
import merge from 'lodash/merge';

export const getStringsByLanguageCode = (languageCode: StringsLanguages) => {
  // if the language code specifies English, just return the
  // English language strings
  if (languageCode === 'en') return stringsAll.en;
  // otherwise, we use the English language strings as a
  // set of defaults to avoid issues if parts of the
  // English language content have not yet been translated
  const en = stringsAll.en;
  const requestedLang = stringsAll[languageCode];
  // avoid mutating the object, otherwise we create issues
  return merge({}, en, requestedLang);
};
