import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { Server } from 'socket.io';
import { connectDB } from './config/db';
import routes from './src/routes';
import http from 'http';
import { connectSocket } from './config/socket';
import { errorHandler } from './middlewares/errorHandler';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5900;
app.use(express.json());
app.use(cors());

connectDB();
const server = http.createServer(app);

// * connect to socket
const io = new Server(server, {
  cors: {
    origin: '*',
  },
  transports: ['websocket'],
});
connectSocket(io);

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
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
