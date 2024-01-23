// ./src/params/lang.ts
import { availableLanguageTags, type AvailableLanguageTag } from '$paraglide/runtime';

export const match = (param: AvailableLanguageTag) => {
  return availableLanguageTags.includes(param);
};
