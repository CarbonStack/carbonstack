import fetch from '../fetch'

async function create (body, ctx) {
  const res = await fetch(`/api/comments`, {
    method: 'POST',
    body: JSON.stringify(body)
  }, ctx)
  const data = await res.json()

  return data
}

export default {
  create
}
