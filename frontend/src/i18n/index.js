import de from "./de.js";
import en from "./en.js";

const LOCALES = { en, de };

/** The language codes the panel is translated into. */
export const LANGUAGES = Object.keys(LOCALES);

/**
 * Returns `t(key, params)` for a Home Assistant language code such as `de` or `de-AT`.
 * Missing keys fall back to English, then to the key itself.
 */
export function createTranslator(language) {
  const code = String(language || "en").toLowerCase();
  const dictionary = LOCALES[code] ?? LOCALES[code.split("-")[0]] ?? en;
  return (key, params = {}) => {
    const text = dictionary[key] ?? en[key] ?? key;
    return text.replace(/\{(\w+)\}/g, (match, name) => (name in params ? String(params[name]) : match));
  };
}
