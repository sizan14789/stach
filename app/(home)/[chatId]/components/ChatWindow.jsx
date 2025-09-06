import { useAppContext } from "@/context/AppContext";
import { useChatContext } from "@/context/ChatLayoutContext";
import Blank from "@/ui/placeholder/Blank";
import { useEffect } from "react";

export default function ChatWindow() {
  const { localUser } = useAppContext();
  const { socket, localMessages, setLocalMessages } = useChatContext();

  useEffect(() => {
    if (!socket) return;

    socket.on("text received", (text) => {
      setLocalMessages((prev) => [text, ...prev]);
    });

    return () => socket.off("text received");
  }, [socket]);

  if (!(localUser && localMessages)) return <Blank />;
  
  else {
    let prevMessageSenderId;
    let nextMessageSenderId;

    return (
      <div className="flex flex-col-reverse px-4 py-2 overflow-y-auto overflow-x-hidden gap-1 grow">
        {localMessages.map((curMessage, index) => {
          const { _id, chat, sender, text, read, createdAt } = curMessage;
          const selfSent = sender._id === localUser._id;

          if (index !== 0)
            prevMessageSenderId = localMessages[index - 1]?.sender?._id;

          if (index < localMessages.length - 1)
            nextMessageSenderId = localMessages[index + 1]?.sender?._id;

          return (
            <div
              className={`flex gap-2 max-w-[45%] ${
                selfSent ? "self-end flex-row-reverse" : ""
              }`}
              key={_id}
            >
              {prevMessageSenderId !== sender._id ? (
                <figure
                  className="h-[2.5rem] aspect-square flex justify-center items-center rounded-full"
                  style={{ backgroundColor: sender.avatarBg }}
                >
                  <h1 className="text-white pb-1">{sender.username[0]}</h1>
                </figure>
              ) : (
                <figure className="h-[2.5rem] aspect-square"></figure>
              )}

              <div
                className={`text-xs border-[.5px] border-[var(--border)] p-3 rounded-sm ${
                  selfSent
                    ? "rounded-bl-2xl rounded-tl-2xl"
                    : "rounded-br-2xl rounded-tr-2xl"
                } ${
                  selfSent
                    ? prevMessageSenderId === sender._id
                      ? ""
                      : "rounded-br-2xl"
                    : prevMessageSenderId === sender._id
                    ? ""
                    : "rounded-bl-2xl"
                } 
                ${
                  selfSent
                    ? nextMessageSenderId === sender._id
                      ? ""
                      : "rounded-tr-2xl"
                    : nextMessageSenderId === sender._id
                    ? ""
                    : "rounded-tl-2xl"
                }
                bg-[var(--chat-bg)] duration-150`}
              >
                {text}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
