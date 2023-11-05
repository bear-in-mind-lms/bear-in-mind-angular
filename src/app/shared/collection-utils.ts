export function convertMapToIndexSignature<V>(map: Map<string, V>) {
  const indexSignature: { [key: string]: V } = {};
  for (const [key, value] of map) {
    indexSignature[key] = value;
  }
  return indexSignature;
}
