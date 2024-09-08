
export type Languages = 'ru' | 'en';

export const DEFAULT_LANGUAGE: Languages = 'ru';
export const defaultNS = 'MetaData'
export const I18_COOKIE_NAME = 'i18next';
export const languagesCollection:Languages[] = [DEFAULT_LANGUAGE, 'en']


export function getOptions (lng:Languages = DEFAULT_LANGUAGE, ns:string | string[] = defaultNS) {
  return {
    // debug: true,
    supportedLngs: languagesCollection,
    fallbackLng: DEFAULT_LANGUAGE,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns
  }
}