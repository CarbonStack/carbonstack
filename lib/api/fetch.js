import 'isomorphic-fetch'

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
  if (isBrowser) {
    return fetch(url, options)
  }
  return fetch(process.env.BASE_URL + url, options)
}

export default customizedFetch
