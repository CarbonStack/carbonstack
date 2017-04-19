export async function me () {
  const res = await fetch('/api/me', {
    credentials: 'same-origin'
  })
  const data = await res.json()

  return data
}
