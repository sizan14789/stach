"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAppContext } from "./AppContext";

const ChatContext = createContext();

export default function ChatContextProvider({ children }) {
  const { localUser } = useAppContext();

  const [localMessages, setLocalMessages] = useState([]); // specific chat messages
  const [localChatInfo, setLocalChatInfo] = useState({}); // specific chat info
  const [newContactSearch, setNewContactSearch] = useState(""); // for new contact searching
  const [searchContactsList, setSearchContactsList] = useState([]); // new contact list on search

  // socket integration
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const s = io(process.env.NEXT_PUBLIC_API_URL, {
      withCredentials: true,
    });
    setSocket(s);
    return () => s.disconnect();
  }, []);

  useEffect(() => {
    if (localUser && socket) {
      socket.emit("register", localUser._id);
    }
  }, [localUser, socket]);

  // set the searched contacts list when searched
  useEffect(() => {
    const syncContactsList = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/${newContactSearch}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await res.json();
      setSearchContactsList(data);
    };
    if (newContactSearch !== "") {
      try {
        syncContactsList();
      } catch (error) {
        console.log(error);
      }
    }
  }, [newContactSearch]);

  const value = {
    localMessages,
    setLocalMessages,
    localChatInfo,
    setLocalChatInfo,
    newContactSearch,
    setNewContactSearch,
    searchContactsList,
    setSearchContactsList,
    socket,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export const useChatContext = () => useContext(ChatContext);
