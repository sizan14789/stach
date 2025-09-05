"use client"

import { useState } from "react";
import ChatBox from "./Chatbox";
import ChatWindow from "./ChatWindow";
import PartnerNavbar from "./PartnerNavbar";

export default function ChatContainer({chatInfo, user, messages}) {
  const [localMessages, setLocalMessages] = useState(messages);

  return (
    <>
      <PartnerNavbar chatInfo={chatInfo} user={user} />
      <ChatWindow chatInfo={chatInfo} user={user} localMessages={localMessages} />
      <ChatBox chatInfo={chatInfo} user={user} setLocalMessages={setLocalMessages} />
    </>
  );
}
