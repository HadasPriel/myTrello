

const asyncLocalStorage = require('./als.service');
const logger = require('./logger.service');

var gIo = null
var gSocketBySessionIdMap = {}

function emit({ type, data }) {
    gIo.emit(type, data);
}


function connectSockets(http, session) {
    const allowedOrigins = (process.env.NODE_ENV === 'production') ? true : ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000']
    gIo = require("socket.io")(http, {
        cors: {
            origin: allowedOrigins,
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            // allowedHeaders: ["my-custom-header"],
            credentials: true
        }
    })

    const sharedSession = require('express-socket.io-session')

    gIo.use(sharedSession(session, {
        autoSave: true
    }));
    gIo.on('connection', socket => {
        // console.log('socket.handshake', socket.handshake)
        gSocketBySessionIdMap[socket.handshake.sessionID] = socket
        socket.on('disconnect', socket => {
            console.log('Someone disconnected')
            if (socket.handshake) {
                gSocketBySessionIdMap[socket.handshake.sessionID] = null
            }
        })
        socket.on('join board', boardId => {
            if (socket.myBoardId) {
                socket.leave(socket.myBoardId)
            }
            socket.join(boardId)
            logger.debug('Session ID is', socket.handshake.sessionID)
            socket.myBoardId = boardId
        }),
            socket.on('update board', board => {
                gIo.to(socket.myBoardId).emit('update board', board)
                console.log(board)
            })

    })
}

// Send to all sockets BUT not the current socket 
function broadcast({ type, data }) {
    const store = asyncLocalStorage.getStore()
    const { sessionId } = store
    if (!sessionId) return logger.debug('Shoudnt happen, no sessionId in asyncLocalStorage store')
    const excludedSocket = gSocketBySessionIdMap[sessionId]
    if (!excludedSocket) return logger.debug('Shouldnt happen, No socket in map', gSocketBySessionIdMap)
    excludedSocket.broadcast.emit(type, data)
}

module.exports = {
    connectSockets,
    emit,
    broadcast
}



