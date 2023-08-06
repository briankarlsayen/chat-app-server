import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { Server } from 'socket.io';
import routes from './src/routes';
import http from 'http';
import { errorHandler } from './middlewares/errorHandler';
import { initializeConfig } from './config';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5900;
const allowedOrigins = [
  'http://localhost:5173',
  'https://chat-app-client-topaz.vercel.app',
  'http://127.0.0.1:5173'
];
app.use(express.json());

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin) return callback(null, true);
//       if (allowedOrigins.indexOf(origin) === -1) {
//         const msg =
//           'The CORS policy for this site does not ' +
//           'allow access from the specified Origin.';
//         return callback(new Error(msg), false);
//       }
//       return callback(null, true);
//     },

//     allowedHeaders: ['Content-Type', 'Authorization', 'Custom-Header']
//   })
// );
app.use(cors())

const server = http.createServer(app);

// * connect to socket
const io = new Server(server, {
  cors: {
    origin: '*',
  },
  transports: ['websocket'],
});
initializeConfig(io)

app.get('/alive', async (_req: Request, res: Response) => {
  return res.status(200).json({
    message: 'Alive alive',
  });
});

app.use('/', routes);

app.locals.io = io;

// * error hander middleware
app.use(errorHandler);

server.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
