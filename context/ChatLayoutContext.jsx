"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ChatContext = createContext();

export default function ChatContextProvider({ children }) {
  const [newContactSearch, setNewContactSearch] = useState("");
  const [localChatsList, setLocalChatsList] = useState();
  const [searchContactsList, setSearchContactsList] = useState([]);

  // set the searched contacts list when searched
  useEffect(()=>{
    const syncContactsList = async ()=>{
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${newContactSearch}`, {
        method: "GET",
        credentials: "include"
      })
      const data = await res.json();
      setSearchContactsList(data);
    }
    if (newContactSearch!==""){
      try {
        syncContactsList()
      } catch (error) {
        console.log(error)
      }  
    }
  }, [newContactSearch])

  const value = {
    newContactSearch,
    setNewContactSearch,
    localChatsList,
    setLocalChatsList,
    searchContactsList,
    setSearchContactsList
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export const useChatContext = () => useContext(ChatContext);
