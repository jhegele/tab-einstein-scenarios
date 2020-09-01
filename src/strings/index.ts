import stringsEn from './en.json';
import stringsEs from './es.json';
import stringsZh from './zh.json';
import stringsFr from './fr.json';

const stringsAll = {
  en: {
    name: {
      english: 'English',
      local: 'English',
    },
    translationStatus: 'native',
    strings: stringsEn,
  },
  es: {
    name: {
      english: 'Spanish',
      local: 'Español',
    },
    translationStatus: 'auto',
    strings: stringsEs,
  },
  zh: {
    name: {
      english: 'Chinese',
      local: '简体中文',
    },
    translationStatus: 'auto',
    strings: stringsZh,
  },
  fr: {
    name: {
      english: 'French',
      local: 'Français',
    },
    translationStatus: 'auto',
    strings: stringsFr,
  },
};

export default stringsAll;

export type StringsType = typeof stringsAll;

export type StringsLanguages = keyof typeof stringsAll;
