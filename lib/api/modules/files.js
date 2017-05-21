const isBrowser = typeof window !== 'undefined'

async function uploadProfileImage (file, ctx) {
  if (!isBrowser) throw new Error('Upload api is only for browser.')

  const formData = new FormData()
  formData.append('file', file)

  const res = await fetch('/files/upload-profile-image', {
    method: 'POST',
    body: formData
  }, ctx)
  const data = await res.json()

  return data
}

export default {
  uploadProfileImage
}
