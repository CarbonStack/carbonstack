import fetch from '../fetch'

async function index (ctx) {
  const res = await fetch('/api/rendezvous', null, ctx)
  const data = await res.json()

  return data
}

export default {
  index
}
