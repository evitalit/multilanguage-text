export enum MultilanguageTextVariant {
  TEXT = "text",
  MARKDOWN = "markdown",
}

export type Translation = {
  locale: string;
  text: string;
};

export class MultilanguageText {
  defaultLocale: string;
  defaultText: string;
  variant: MultilanguageTextVariant;
  translations: Translation[];

  constructor(
    defaultLocale: string,
    defaultText: string,
    variant: MultilanguageTextVariant = MultilanguageTextVariant.TEXT,
    translations: Translation[] = []
  ) {
    this.defaultLocale = defaultLocale;
    this.defaultText = defaultText;
    this.variant = variant;
    this.translations = translations;
  }

  addTranslation(locale: string, text: string) {
    const index = this.translations.findIndex((t) => t.locale === locale);
    if (index === -1) {
      this.translations.push({ locale, text });
    }
  }

  getAllTranslations() {
    const allTranslations: Translation[] = [
      {
        locale: this.defaultLocale,
        text: this.defaultText,
      },
    ].concat(this.translations);
    return allTranslations;
  }

  getTranslation(locale: string, getDefaultIfLocaleNotFound: boolean = false) {
    if (locale === this.defaultLocale) {
      return { locale: this.defaultLocale, text: this.defaultText };
    }
    const index = this.translations.findIndex((t) => t.locale === locale);
    if (index !== -1) {
      return this.translations[index];
    }
    if (getDefaultIfLocaleNotFound) {
      return { locale: this.defaultLocale, text: this.defaultText };
    }
    return null;
  }

  modifyTranslation(locale: string, text: string) {
    if (locale === this.defaultLocale) {
      this.defaultText = text;
    } else {
      const index = this.translations.findIndex((t) => t.locale === locale);
      if (index !== -1) {
        this.translations[index].text = text;
      }
    }
  }

  removeTranslation(locale: string) {
    const index = this.translations.findIndex((t) => t.locale === locale);
    if (index !== -1) {
      this.translations.splice(index, 1);
    }
  }
}
