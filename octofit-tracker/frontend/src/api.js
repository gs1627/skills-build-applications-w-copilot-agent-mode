const codespaceName = import.meta.env?.VITE_CODESPACE_NAME?.trim();

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

export async function parseCollectionResponse(response) {
  const payload = await response.json();

  if (!response.ok) {
    const message =
      payload && typeof payload.error === 'string'
        ? payload.error
        : `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && typeof payload === 'object') {
    for (const key of ['results', 'items']) {
      if (Array.isArray(payload[key])) {
        return payload[key];
      }
    }

    if (Array.isArray(payload.data)) {
      return payload.data;
    }

    if (payload.data && typeof payload.data === 'object') {
      for (const key of ['results', 'items']) {
        if (Array.isArray(payload.data[key])) {
          return payload.data[key];
        }
      }
    }
  }

  throw new TypeError('The API returned an unsupported collection response.');
}
