import { Server as IOServer } from "socket.io";
import jwt from "jsonwebtoken";
import { jwtConfig } from "./config/jwt.js";

let io: IOServer | null = null;

export const initSocket = (server: any) => {
  if (io) return io;

  io = new IOServer(server, {
    cors: {
      origin: (process.env.CLIENT_ORIGIN || "http://localhost:5173"),
      credentials: true,
    },
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth?.token || socket.handshake.query?.token;
    if (!token) return next(); // allow anonymous connections for now

    try {
      const payload = jwt.verify(String(token), jwtConfig.secret as string);
      (socket as any).user = payload;
      return next();
    } catch (err) {
      // don't block connection on invalid token; next will allow unauthenticated sockets
      return next();
    }
  });

  io.on("connection", (socket) => {
    const user = (socket as any).user;
    if (user?.id) {
      socket.join(`user:${user.id}`);
      // join role room if available
      if (user.role) {
        // map SUPERADMIN and ADMIN to admin room
        if (user.role === "ADMIN" || user.role === "SUPERADMIN") {
          socket.join("role:ADMIN");
        }
      }
    }

    socket.on("disconnect", () => {
      // cleanup handled by socket.io
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) throw new Error("Socket.io not initialized");
  return io;
};
