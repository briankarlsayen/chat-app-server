import { Socket } from 'socket.io';
export const connectSocket = (io: any) => {
  console.log('Socket working!');
  io.of('/chat-app').on('connection', (socket: Socket) => {
    console.log('User Connected: ', socket.id);

    socket.on('join-room', (chatRoomNames) => {
      if (chatRoomNames.length) {
        socket.join(chatRoomNames);
        console.log(`Socket ${socket.id} joined room ${chatRoomNames}`);
      }
    });

    socket.on('leave-room', (chatRoomNames) => {
      if (chatRoomNames.length) {
        socket.leave(chatRoomNames);
        console.log(`Socket ${socket.id} left room ${chatRoomNames}`);
      }
    });

    // * chatMessage = { user: string, body: string }
    socket.on('send-chat', async (chatMessage) => {
      if (chatMessage?.channel) {
        const formatMessage = {
          _id: Date.now(),
          name: chatMessage?.user,
          message: chatMessage?.message,
          channel: chatMessage?.channel,
          createdAt: new Date(),
          type: chatMessage?.type
        };
        console.log('formatMessage', formatMessage);
        io.of('/chat-app')
          .to(chatMessage?.channel)
          .emit('message', formatMessage);
      }
    });

    // socket.on('leave', handleLeave)
  });
};
