const BASE_URL = 'https://api.baserow.io/api/database/'

const getCredentials = () => $cookies.get('credentials')

const getHeaders = (apiKey) => ({
  headers: {
    Authorization: `Token ${apiKey}`,
    'Content-Type': 'application/json'
  }
})

async function getFields(credentials) {
  const apiKey = credentials?.apiKey || getCredentials().apiKey
  const tableId = credentials?.tableId || getCredentials().tableId

  const response = await fetch(`${BASE_URL}fields/table/${tableId}/`, getHeaders(apiKey))

  const data = await response.json()
  if (data.error) {
    throw new Error(data.detail)
  }

  return data
}
async function getRows(credentials) {
  const apiKey = credentials?.apiKey || getCredentials().apiKey
  const tableId = credentials?.tableId || getCredentials().tableId

  const response = await fetch(`${BASE_URL}rows/table/${tableId}/`, getHeaders(apiKey))

  const data = await response.json()
  if (data.error) {
    throw new Error(data.detail)
  }

  return data
}

export { getFields, getRows }
