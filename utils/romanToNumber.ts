const romanMap: Record<string, string> = {
  'i': '1',
  'ii': '2',
  'iii': '3',
  'iv': '4',
  'v': '5',
};

export function replaceRomanNumerals(name: string): string {
  return name.replace(/^(i{1,3}|iv|v)\b/i, (match) => {
    return romanMap[match.toLowerCase()] || match;
  });
}
