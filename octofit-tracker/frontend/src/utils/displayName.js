export function displayName(reference) {
  if (!reference) {
    return '—';
  }
  if (typeof reference === 'string') {
    return reference;
  }
  return reference.displayName || reference.name || reference.username || '—';
}
