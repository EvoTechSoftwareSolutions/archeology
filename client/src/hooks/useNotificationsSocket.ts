import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

export default function useNotificationsSocket(token: string | null, onNotification: (n: any) => void) {
  const socketRef = useRef<Socket | null>(null);
  const onNotificationRef = useRef(onNotification);

  useEffect(() => {
    onNotificationRef.current = onNotification;
  }, [onNotification]);

  useEffect(() => {
    if (!token) return;

    const url = import.meta.env.VITE_API_WS_URL || (import.meta.env.VITE_API_BASE_URL || "http://localhost:5000");

    const socket = io(url, {
      auth: { token },
      transports: ["websocket"],
    });

    socketRef.current = socket;

    const handleNotification = (notification: any) => {
      onNotificationRef.current(notification);
    };

    socket.on("connect", () => {
      console.log("Notifications socket connected", socket.id);
    });

    socket.on("notification:new", handleNotification);

    socket.on("connect_error", (err) => {
      console.error("Socket connect error", err);
    });

    return () => {
      socket.off("notification:new", handleNotification);
      socket.disconnect();
      socketRef.current = null;
    };
  }, [token]);

  return socketRef;
}
