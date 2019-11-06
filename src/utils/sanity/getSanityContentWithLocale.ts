import { Locale, defaultLocale } from '../../i18n/locale';

export const getSanityContentWithLocale = (data: any, locale: Locale | string): string | string[] => {
    if (!data) {
        return [];
    }
    if (data && data[locale]) {
        return data[locale];
    }
    return data[defaultLocale];
};

export const getSanityStringWithLocale = (data: any, locale: Locale | string): string | undefined => {
    if (!data) {
        return undefined;
    }
    if (data && data[locale]) {
        return data[locale];
    }
    return data[defaultLocale];
};
