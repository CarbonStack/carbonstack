import fetch from './fetch'

async function show (ctx) {
  const res = await fetch('/api/session', null, ctx)
  const data = await res.json()

  return data
}

async function destroy (ctx) {
  const res = await fetch('/api/session', {
    method: 'DELETE'
  }, ctx)
  const data = await res.json()

  return data
}

export default {
  show,
  destroy
}
