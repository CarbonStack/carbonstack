const isBrowser = typeof window !== 'undefined'

let socket = {
  emit: () => {}
}
if (isBrowser) {
  socket = window.io(process.env.WS_URL, {
    path: '/ws',
    autoConnect: false,
    transports: ['websocket']
  })

  socket.on('message', (msg) => {
    console.log('from server >', msg)
  })
}

export default socket
