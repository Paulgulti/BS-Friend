import { replaceRomanNumerals } from "./romanToNumber";

export function slugify(name: string): string {
  const normalizedName = replaceRomanNumerals(name);

  return normalizedName
    .toLowerCase()
    .replace(/[^a-z0-9 ]/gi, '')
    .trim()
    .replace(/\s+/g, '-');
}
