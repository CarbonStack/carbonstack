import fetch from '../fetch'

async function nouveau (ctx) {
  const res = await fetch('/api/pages/nouveau', null, ctx)
  const data = await res.json()

  return data
}

export default {
  nouveau
}
