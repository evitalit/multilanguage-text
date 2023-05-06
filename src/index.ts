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
    variant?: MultilanguageTextVariant
  ) {
    (this.defaultLocale = defaultLocale),
      (this.defaultText = defaultText),
      (this.variant = variant || MultilanguageTextVariant.TEXT),
      (this.translations = []);
  }

  addTranslation(localeToAdd: string, textToAdd: string) {
    const index = this.translations.findIndex((t) => t.locale === localeToAdd);
    if (index === -1) {
      const translation: Translation = {
        locale: localeToAdd,
        text: textToAdd,
      };
      this.translations.push(translation);
    }
  }

  getDefaultTranslation() {
    const defaultTranslation: Translation = {
      locale: this.defaultLocale,
      text: this.defaultText,
    };
    return defaultTranslation;
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

  getTranslationForLocale(localeToFind: string) {
    if (localeToFind === this.defaultLocale) {
      return { locale: this.defaultLocale, text: this.defaultText };
    }
    const index = this.translations.findIndex((t) => t.locale === localeToFind);
    if (index !== -1) {
      return this.translations[index];
    }
    return null;
  }

  getTranslationForLocaleOrDefault(localeToFind: string) {
    const translation = this.getTranslationForLocale(localeToFind);
    if (translation === null) {
      return { locale: this.defaultLocale, text: this.defaultText };
    }
    return translation;
  }

  modifyTranslation(localeToModify: string, modifiedText: string) {
    const index = this.translations.findIndex(
      (t) => t.locale === localeToModify
    );
    if (index !== -1) {
      this.translations[index].text = modifiedText;
    }
  }

  removeTranslation(localeToRemove: string) {
    const index = this.translations.findIndex(
      (t) => t.locale === localeToRemove
    );
    if (index !== -1) {
      this.translations.splice(index, 1);
    }
  }
}
