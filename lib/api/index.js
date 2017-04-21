export async function me (cookie) {
  const headers = new Headers()
  if (cookie != null) {
    headers.append('Cookie', cookie)
  }
  const res = await fetch('http://localhost:3000/api/me', {
    credentials: 'same-origin',
    headers
  })
  const data = await res.json()

  return data
}

export default {
  me
}
