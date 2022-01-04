import io from 'socket.io-client'

const baseUrl = (process.env.NODE_ENV === 'production') ? '' : '//localhost:3030'
export const socketService = createSocketService()



function createSocketService() {
  var socket

  const socketService = {
    setup() {
      socket = io(baseUrl, {
        withCredentials: true,
      });
    },
    on(eventName, cb) {
      socket.on(eventName, cb)
    },
    off(eventName, cb) {
      socket.off(eventName, cb)
    },
    emit(eventName, data) {
      socket.emit(eventName, data)
    },
    terminate() {
      socket = null
    }
  }
  return socketService
}



