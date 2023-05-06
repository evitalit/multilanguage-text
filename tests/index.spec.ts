import {
  MultilanguageText,
  MultilanguageTextVariant,
  Translation,
} from "../src/index";

test("Create multilanguage text with default settings (variant: text)", () => {
  const area = new MultilanguageText("en-us", "Vision");
  expect(area.defaultLocale).toBe("en-us");
  expect(area.defaultText).toBe("Vision");
  expect(area.variant).toBe(MultilanguageTextVariant.TEXT);
});

test("Create multilanguage text with custom settings (variant: markdown)", () => {
  const area = new MultilanguageText(
    "en-us",
    "Vision",
    MultilanguageTextVariant.MARKDOWN
  );
  expect(area.defaultLocale).toBe("en-us");
  expect(area.defaultText).toBe("Vision");
  expect(area.variant).toBe(MultilanguageTextVariant.MARKDOWN);
});

test("Add translation for new locale", () => {
  const area = new MultilanguageText("en-us", "Vision");
  area.addTranslation("hu-hu", "Jövőkép");
  console.log(area);
  expect(area.translations.length).toBe(1);
  expect(area.translations[0].locale).toBe("hu-hu");
  expect(area.translations[0].text).toBe("Jövőkép");
});

test("Fail to add translation for existing locale", () => {
  const area = new MultilanguageText("en-us", "Vision");
  area.addTranslation("hu-hu", "Jövőkép");
  area.addTranslation("hu-hu", "Vízió");
  expect(area.translations.length).toBe(1);
  expect(area.translations[0].locale).toBe("hu-hu");
  expect(area.translations[0].text).toBe("Jövőkép");
});

test("Get translation for default locale", () => {
  const area = new MultilanguageText("en-us", "Vision");
  area.addTranslation("hu-hu", "Jövőkép");
  area.addTranslation("de-de", "Vision");
  const defaultTranslation = area.getDefaultTranslation();
  expect(defaultTranslation.locale).toBe("en-us");
  expect(defaultTranslation.text).toBe("Vision");
});

test("Get all translations", () => {
  const area = new MultilanguageText("en-us", "Vision");
  area.addTranslation("hu-hu", "Jövőkép");
  area.addTranslation("de-de", "Vision");
  const translations = area.getAllTranslations();
  expect(translations.length).toBe(3);
});

test("Get translation for existing locale", () => {
  const area = new MultilanguageText("en-us", "Vision");
  area.addTranslation("hu-hu", "Jövőkép");
  area.addTranslation("de-de", "Vision");
  const translation = area.getTranslationForLocale("hu-hu");
  expect(translation?.locale).toBe("hu-hu");
  expect(translation?.text).toBe("Jövőkép");
});

test("Fail to get translation for nonexisting locale", () => {
  const area = new MultilanguageText("en-us", "Vision");
  area.addTranslation("hu-hu", "Jövőkép");
  const translation = area.getTranslationForLocale("de-de");
  expect(translation).toBeNull();
});

test("Get default translation for nonexisting locale", () => {
  const area = new MultilanguageText("en-us", "Vision");
  area.addTranslation("hu-hu", "Jövőkép");
  const translation = area.getTranslationForLocaleOrDefault("de-de");
  expect(translation?.locale).toBe("en-us");
  expect(translation?.text).toBe("Vision");
});

test("Modify translation for existing locale", () => {
  const area = new MultilanguageText("en-us", "Vision");
  area.addTranslation("hu-hu", "Jövőkép");
  area.addTranslation("de-de", "Vision");
  area.modifyTranslation("hu-hu", "Vízió");
  expect(area.translations.length).toBe(2);
  expect(area.translations[0].locale).toBe("hu-hu");
  expect(area.translations[0].text).toBe("Vízió");
});

test("Fail to modify translation for nonexisting locale", () => {
  const area = new MultilanguageText("en-us", "Vision");
  area.addTranslation("hu-hu", "Jövőkép");
  area.modifyTranslation("de-de", "Vision");
  expect(area.translations.length).toBe(1);
  expect(area.translations[0].locale).toBe("hu-hu");
  expect(area.translations[0].text).toBe("Jövőkép");
});

test("Remove translation for existing locale", () => {
  const area = new MultilanguageText("en-us", "Vision");
  area.addTranslation("hu-hu", "Jövőkép");
  area.addTranslation("de-de", "Vision");
  area.removeTranslation("de-de");
  expect(area.translations.length).toBe(1);
  expect(area.translations[0].locale).toBe("hu-hu");
  expect(area.translations[0].text).toBe("Jövőkép");
});

test("Fail to remove translation for nonexisting locale", () => {
  const area = new MultilanguageText("en-us", "Vision");
  area.addTranslation("hu-hu", "Jövőkép");
  area.removeTranslation("de-de");
  expect(area.translations.length).toBe(1);
});
