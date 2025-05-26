"use client";

import {createContext , useContext , useEffect , useState} from "react";
import { io , Socket } from "socket.io-client";


const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5000";


interface SocketContextType{
  socket: Socket | null;
}

const SocketContext = createContext<SocketContextType>({socket:null});

export const SocketProvider = ({children}:{children:React.ReactNode})=>{

  const [socket,setSocket] = useState<Socket | null>(null);

  useEffect(()=>{
    
    const newSocket = io(SOCKET_URL,{
      transports:["websocket"],
      reconnection:true,
    });

    newSocket.on("connect",()=>{
      console.log("Connected to socket server");
    })

    newSocket.on("disconnect",()=>{
      console.log("Disconnected from socket server");
    })

    setSocket(newSocket);

    return ()=>{
      newSocket.disconnect();
    };

  },[]);

  return (
    <SocketContext.Provider value={{socket}}>
      {children}
    </SocketContext.Provider>
  )

}

export const useSocket = () => useContext(SocketContext);

