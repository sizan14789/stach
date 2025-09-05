"use client";

import { useChatContext } from "@/context/ChatLayoutContext";
import toast from "react-hot-toast";
import { BsFillSendFill } from "react-icons/bs";
import { CiImageOn } from "react-icons/ci";

export default function ChatBox({ chatInfo, user, setLocalMessages }) {
  const { setLocalChatList } = useChatContext()

  const handleTextSending = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const textData = Object.fromEntries(formdata).message.trim();

    const postBody = {
      chat: chatInfo._id,
      sender: user._id,
      text: textData,
    };

    try {
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

      const syncLastText = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/chats/update/${chatInfo._id}`,
        {
          method: "POST",
          body: JSON.stringify({text: textData}),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      setLocalMessages((prev) => [
        {
          ...postBody,
          sender: {
            _id: user._id,
            username: user.username,
            avatarBg: user.avatarBg
          },
          _id: JSON.stringify(Math.floor(Math.random()*99999))
        },
        ...prev,
      ]);



      if (res.status === 200) {
        toast("Sent");
        e.target.message.value = "";
      } else {
        toast.error("Failed to send");
      }
    } catch (error) {
      console.log(error);
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
