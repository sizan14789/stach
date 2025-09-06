"use client"

import { useEffect } from "react";
import ChatBox from "./Chatbox";
import ChatWindow from "./ChatWindow";
import PartnerNavbar from "./PartnerNavbar";
import { useChatContext } from "@/context/ChatLayoutContext";
import { useAppContext } from "@/context/AppContext";

export default function ChatContainer({user, chatInfo, messages}) {
  const { setLocalUser } = useAppContext()
  const { setLocalMessages, setLocalChatInfo } = useChatContext();

  useEffect(()=>{
    setLocalUser(user)
    setLocalMessages(messages)
    setLocalChatInfo(chatInfo)
  }, [])

  return (
    <>
      <PartnerNavbar />
      <ChatWindow />
      <ChatBox />
    </>
  );
}
