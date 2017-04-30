import fetch from '../fetch'

async function home (ctx) {
  const res = await fetch('/api/pages/home', null, ctx)
  const data = await res.json()

  return data
}

async function nouveau (ctx) {
  const res = await fetch('/api/pages/nouveau', null, ctx)
  const data = await res.json()

  return data
}

async function rv (rvUniqueName, ctx) {
  const res = await fetch(`/api/pages/rv/${rvUniqueName}`, null, ctx)
  const data = await res.json()

  return data
}

async function issue (rvUniqueName, issueNumber, ctx) {
  const res = await fetch(`/api/pages/rv/${rvUniqueName}/issues/${issueNumber}`, null, ctx)
  const data = await res.json()

  return data
}

export default {
  home,
  nouveau,
  rv,
  issue
}
