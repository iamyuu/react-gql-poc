const apiURL = import.meta.env.API_URL

interface RequestInitClient extends RequestInit {
  data?: Record<string, unknown>
}

export default async function client<TData>(endpoint: string, requestInit?: RequestInitClient) {
  const {data, headers: customHeaders, ...customConfig} = requestInit || {}

  const config = {
    method: data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      'Content-Type': 'application/json',
      ...customHeaders,
    },
    ...customConfig,
  }

  return window.fetch(`${apiURL}/${endpoint}`, config).then(async response => {
    const json = await response.json()

    if (response.ok) {
      return json as TData
    }

    const error = json.errors.length > 0 ? new Error(json.errors[0].message) : json
    return Promise.reject(error)
  })
}

export function graphqlRequest<TData, TVariables>(query: string, variables?: TVariables) {
  return client<TData>('graphql', {
    data: {query, variables},
  })
}
