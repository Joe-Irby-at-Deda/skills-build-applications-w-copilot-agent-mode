const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api`
  }

  return 'http://localhost:8000/api'
}

export const buildApiUrl = (resource) => `${getApiBaseUrl()}/${resource}/`

export const fetchCollection = async (resource) => {
  const response = await fetch(buildApiUrl(resource), {
    headers: { Accept: 'application/json' },
  })

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`)
  }

  const payload = await response.json()

  if (Array.isArray(payload)) {
    return payload
  }

  if (Array.isArray(payload?.data)) {
    return payload.data
  }

  if (Array.isArray(payload?.results)) {
    return payload.results
  }

  if (Array.isArray(payload?.items)) {
    return payload.items
  }

  return []
}
