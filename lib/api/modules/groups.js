import fetch from '../fetch'

async function index (ctx) {
  const res = await fetch('/api/groups', null, ctx)
  const data = await res.json()

  return data
}

async function create (body, ctx) {
  const res = await fetch('/api/groups', {
    method: 'POST',
    body: JSON.stringify(body)
  }, ctx)
  const data = await res.json()

  return data
}

async function updateRole (groupId, body, ctx) {
  const res = await fetch(`/api/groups/${groupId}/roles`, {
    method: 'PUT',
    body: JSON.stringify(body)
  }, ctx)
  const data = await res.json()

  return data
}

async function destroyRole (groupId, body, ctx) {
  const res = await fetch(`/api/groups/${groupId}/roles`, {
    method: 'DELETE',
    body: JSON.stringify(body)
  }, ctx)
  const data = await res.json()

  return data
}

export default {
  index,
  create,
  updateRole,
  destroyRole
}
