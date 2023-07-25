export function convertLocaleFieldTextsMapToIndexSignature(
  localeFieldTextsMap: Map<string, Map<string, string>>,
) {
  const result: {
    [locale: string]: { [fieldName: string]: string };
  } = {};

  for (const [locale, fieldTextMap] of localeFieldTextsMap) {
    const fieldTextIndexSignature: { [fieldName: string]: string } = {};
    for (const [fieldName, text] of fieldTextMap) {
      if (text.length > 0) {
        fieldTextIndexSignature[fieldName] = text;
      }
    }
    result[locale] = fieldTextIndexSignature;
  }

  return result;
}

export function convertLocaleFieldTextsMapToSingleFieldIndexSignature(
  localeFieldTextsMap: Map<string, Map<string, string>>,
  fieldName: string,
) {
  const result: { [locale: string]: string } = {};

  for (const [locale, fieldTextMap] of localeFieldTextsMap) {
    const name = fieldTextMap.get(fieldName);
    if (name !== undefined && name.length > 0) {
      result[locale] = name;
    }
  }

  return result;
}
