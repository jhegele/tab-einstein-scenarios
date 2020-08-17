import stringsEn from './en';

const stringsAll = {
  en: {
    name: {
      english: 'English',
      local: 'English',
    },
    strings: stringsEn,
  },
};

export default stringsAll;

export type StringsType = typeof stringsAll;

export type StringsLanguages = keyof typeof stringsAll;
