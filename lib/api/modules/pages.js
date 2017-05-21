import fetch from '../fetch'

export default async function page (ctx) {
  const queryString = Object
    .entries(ctx.query)
    .map(([key, value]) => `${key}=${value}`)
    .join('&')
  const res = await fetch(`/api/pages${ctx.pathname}?${queryString}`, null, ctx)
  const data = await res.json()

  return data
}
