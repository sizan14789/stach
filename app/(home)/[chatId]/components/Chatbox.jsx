"use client";

import { useAppContext } from "@/context/AppContext";
import { useChatContext } from "@/context/ChatLayoutContext";
import toast from "react-hot-toast";
import { BsFillSendFill } from "react-icons/bs";
import { CiImageOn } from "react-icons/ci";

export default function ChatBox() {
  const { setLocalChatsList, localUser } = useAppContext();
  const { localChatInfo, setLocalMessages } =
    useChatContext();

  const handleTextSending = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const textData = Object.fromEntries(formdata).message.trim();

    const postBody = {
      chat: localChatInfo._id,
      sender: localUser._id,
      text: textData,
    };

    const syncLastText = async () => {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/chats/update/${localChatInfo._id}`,
        {
          method: "POST",
          body: JSON.stringify({ text: textData }),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
    };

    const syncLastTextUi = () => {
      const chatId = localChatInfo._id;
      setLocalChatsList((prev) => {
        prev.forEach((chat) => {
          if (chatId === chat._id) chat.lastText = textData;
        });
        return prev;
      });
    };

    const syncLocalUi = () => {
      const newMessage = {
        ...postBody,
        sender: {
          _id: localUser._id,
          username: localUser.username,
          avatarBg: localUser.avatarBg,
        },
        _id: JSON.stringify(crypto.randomUUID()),
      };
      setLocalMessages((prev) => [newMessage, ...prev]);
      e.target.message.value = "";
    };

    const syncDatabase = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/messages`,
        {
          method: "POST",
          body: JSON.stringify(postBody),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (res.status === 200) {
        return res;
      } else {
        return false;
      }
    };

    try {
      syncLocalUi();
      syncLastTextUi();
      const res = await syncDatabase();

      if (res.status === 200) {
        await syncLastText();
      } else {
        toast.error("Failed to send");
      }
    } catch (error) {
      console.log(error);
      toast.error("Internal error");
    }
  };

  return (
    <div className="border-t-[.5px] border-t-[var(--border)] h-[5rem] p-4 flex">
      <div className="flex gap-4 justify-center items-center w-full">
        <div className="flex">
          <div className="cursor-pointer rounded-xl hover:bg-[var(--text-primary)] hover:text-[var(--background)] p-2 duration-200 border-[.5px]">
            <CiImageOn className="text-2xl font-bold " />
          </div>
        </div>
        <form
          className="flex gap-4 justify-self-end"
          onSubmit={handleTextSending}
        >
          <input
            type="text"
            placeholder="text"
            name="message"
            required
            className="input-field !py-1 !xl:w-[40rem] !rounded-4xl"
          />
          <button
            type="submit"
            className="cursor-pointer p-3 aspect-square flex justify-center items-center rounded-full bg-[var(--accent)] text-[var(--background)]"
          >
            <BsFillSendFill className="text-xl" />
          </button>
        </form>
      </div>
    </div>
  );
}
