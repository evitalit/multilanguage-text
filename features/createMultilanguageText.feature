Feature: Create multilanguage text

    As a Developer,
    I can create a variable that stores multilanguage text
    so that I will be able to use translations

    Example: Create multilanguage text for storing plain text
        Given the locale "en-us"
        And the text "I speak English"
        When I create a multilanguage text variable
        Then the default locale will be "en-us"
        And the default text will be "I speak English"
        And the text variant will be "TEXT"
