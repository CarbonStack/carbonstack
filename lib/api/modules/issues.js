import fetch from '../fetch'

async function create (body, ctx) {
  const res = await fetch('/api/issues', {
    method: 'POST',
    body: JSON.stringify(body)
  }, ctx)
  const data = await res.json()

  return data
}

async function show (issueId, ctx) {
  const res = await fetch('/api/issues/' + issueId, null, ctx)
  const data = await res.json()

  return data
}

async function destroy (issueId, ctx) {
  const res = await fetch('/api/issues/' + issueId, {
    method: 'DELETE'
  }, ctx)
  const data = await res.json()

  return data
}

export default {
  create,
  show,
  destroy
}
