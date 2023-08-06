import { connectDB } from "./db"
import { connectSocket } from "./socket"
import { createAdapter } from "@socket.io/mongo-adapter";
const COLLECTION = "socket.io-adapter-events";

export const initializeConfig = async (io: any) => {
  const mongoCollection = await connectDB()
  await connectSocket(io)
  if (mongoCollection) {
    io.adapter(createAdapter(mongoCollection?.collection(COLLECTION)));
  }
}