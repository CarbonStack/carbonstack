import 'isomorphic-fetch'
import APIError from './APIError'

const isBrowser = typeof window !== 'undefined'

function customizedFetch (url, options = {}, context) {
  if (options == null) options = {}
  if (options.headers == null) {
    options.headers = new Headers()
  }
  if (!isBrowser && context.req.headers.cookie) {
    options.headers.append('Cookie', context.req.headers.cookie)
  }
  options.headers.append('Content-Type', 'application/json')
  options.credentials = 'same-origin'

  const resolvedUrl = isBrowser
    ? url
    : process.env.NOW_URL + url

  return fetch(resolvedUrl, options)
    .then(async res => {
      if (!res.ok) {
        const data = await res.json()
        const error = new APIError(data.message)
        error.status = res.status
        error.data = data
        // Errors are serialized also. So, I added a flag to distinguish the given error is http kind.
        error.isHttpError = true

        throw error
      }
      return res
    })
}

export default customizedFetch
