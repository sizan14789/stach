import { useChatContext } from "@/context/ChatLayoutContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function NewContactList() {
  const [ createWindow, setCreateWindow] = useState(false);
  const { searchContactsList, setLocalChatsList } = useChatContext();
  const [selectedContactId, setSelectedContactId] = useState();
  const router = useRouter();

  const handleContactClick = (id) => {
    setSelectedContactId(id);
    setCreateWindow(true);
  };

  const handleConfirmation = async () => {
    setCreateWindow(false);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/chats`, {
        method: "POST",
        body: JSON.stringify({ partner: selectedContactId }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (res.status === 200) {
        const data = await res.json();
        toast.success("Contact added");
        setLocalChatsList((prev) => [data,...prev]);
        router.push(`/${data._id}`);
      }
    } catch (error) {
      toast.error("Could not add new conversation");
    }
  };

  if (searchContactsList)
    return (
      <>
        <div
          className={`absolute top-0 left-0 h-svh w-svw flex justify-center items-center ${
            createWindow ? "" : "hidden"
          }`}
        >
          <div className="p-8 border-1 rounded-xl border-[var(--border)] flex flex-col gap-4 bg-[var(--background)]">
            <h2 className="text-secondary">Start new conversation?</h2>
            <div className="flex gap-4">
              <button
                className="button-primary"
                onClick={() => setCreateWindow(false)}
              >
                No
              </button>
              <button className="button-secondary" onClick={handleConfirmation}>
                Yes
              </button>
            </div>
          </div>
        </div>

        <h2 className="px-4">Search result</h2>
        {searchContactsList.map((curContact) => {
          return (
            <button
              className="cursor-pointer border-b-[.5px] border-b-[var(--border)] hover:border-b-[var(--accent)] duration-200"
              key={curContact._id}
              onClick={() => handleContactClick(curContact._id)}
            >
              <div className={`flex gap-4 p-4 items-center hover:grayscale-0`}>
                <figure className="flex items-center justify-center">
                  <h2
                    className="rounded-full w-[3rem] h-[3rem] flex items-center justify-center pb-1 text-2xl text-white"
                    style={{ backgroundColor: curContact.avatarBg }}
                  >
                    {curContact.username[0]}
                  </h2>
                </figure>
                <div>
                  <h2>{curContact.username}</h2>
                </div>
              </div>
            </button>
          );
        })}
      </>
    );
}
