import { useChatContext } from "@/context/ChatLayoutContext";
import ChatListCard from "./ChatListCard";

export default function ChatList() {
  const { localChatsList } = useChatContext();

  if (localChatsList)
    return (
      <>
        <h2 className="px-4">Your Contacts</h2>
        {localChatsList.map((curChat) => (
          <ChatListCard curChat={curChat} key={curChat._id} />
        ))}
      </>
    );
}
