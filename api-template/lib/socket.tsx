import { io } from "socket.io-client";
import React, {
  useRef,
  useContext,
  useEffect,
  useState,
  createContext,
} from "react";
const SocketContext = React.createContext({});

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const isMounted = useRef(false);
  useEffect(() => {
    fetch("/api/socketio").finally(() => {
      const sock = io();

      setSocket(sock);

      sock.on("connect", () => {
        console.log("connect");
        sock.emit("hello");
      });

      sock.on("hello", (data) => {
        console.log("hello", data);
      });

      sock.on("a user connected", () => {
        console.log("a user connected");
      });

      sock.on("disconnect", () => {
        console.log("disconnect");
      });
    });
  }, []);
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  const { socket } = useContext(SocketContext) as any;
  return socket;
}

export function useSocketEvent(event, callback) {
  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on(event, (data) => callback(data));
    }
    return () => {
      if (socket) socket.off(event, (data) => callback(data));
    };
  }, [socket, event]);
}

export function useSocketActions() {
  // const dispatch = useDispatch();
  // function handleOnlineStatus() {
  //   dispatch({
  //     type: "ADD_ENTRIES",
  //     payload: true,
  //     context: "isOnline",
  //   });

  return {
    // handleOnlineStatus,
  };
}
