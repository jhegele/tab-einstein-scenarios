import stringsEn from './en.json';
import stringsEs from './es.json';

const stringsAll = {
  en: {
    name: {
      english: 'English',
      local: 'English',
    },
    strings: stringsEn,
  },
  es: {
    name: {
      english: 'Spanish',
      local: 'Español',
    },
    strings: stringsEs,
  },
};

export default stringsAll;

export type StringsType = typeof stringsAll;

export type StringsLanguages = keyof typeof stringsAll;
