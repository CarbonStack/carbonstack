import 'isomorphic-fetch'
import APIError from './APIError'

const isBrowser = typeof window !== 'undefined'

function appendCookie (options, context) {
  if (options.headers == null) {
    options.headers = new Headers()
  }
  options.headers.append('Cookie', context.req.headers.cookie)
}

function customizedFetch (url, options = {}, context) {
  if (options == null) options = {}
  if (!isBrowser) {
    appendCookie(options, context)
  }
  options.credentials = 'same-origin'

  const resolvedUrl = isBrowser
    ? url
    : process.env.BASE_URL + url

  return fetch(resolvedUrl, options)
    .then(async res => {
      if (!res.ok) {
        const data = await res.json()
        const error = new APIError(data.message)
        error.status = res.status
        // Errors are serialized also. So, I added a flag to distinguish the given error is http kind.
        error.isHttpError = true

        throw error
      }
      return res
    })
}

export default customizedFetch
