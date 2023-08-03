import { Socket } from 'socket.io';
export const connectSocket = (io: any) => {
  console.log('Socket working!');
  io.on('connection', (socket: Socket) => {
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
    socket.on('send-chat', (chatMessage) => {
      console.log('chatMessage', chatMessage);
      if (chatMessage?.channel) {
        const formatMessage = {
          name: chatMessage?.user,
          message: chatMessage?.message,
          channel: chatMessage?.channel,
          createdAt: Date.now(),
        };
        io.to(chatMessage?.channel).emit('message', formatMessage);
      }
    });

    // socket.on('leave', handleLeave)
  });
};
