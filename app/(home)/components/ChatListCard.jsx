import { useAppContext } from "@/context/AppContext";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ChatListCard({ curChat }) {
  const { localUser } = useAppContext();
  const url = useParams()?.chatId;

  if (localUser && curChat) {
    
    const { _id, groupChat, participants, lastText } = curChat;
    const otherPerson = participants?.find(
      (cur) => cur.username !== localUser?.username
    );

    return (
      <Link
        href={`/${_id}`}
        className="cursor-pointer border-b-[.5px] border-b-[var(--border)] hover:border-b-[var(--accent)] duration-200"
      >
        <div
          className={`flex gap-4 p-4 items-center hover:grayscale-0 ${_id===url? "" : "grayscale-100" }`}
        >
          <figure className="flex items-center justify-center">
            <h2
              className="rounded-full w-[3rem] h-[3rem] flex items-center justify-center pb-1 text-2xl text-white"
              style={{ backgroundColor: otherPerson.avatarBg }}
            >
              {otherPerson.username[0]}
            </h2>
          </figure>
          <div>
            <h2>{otherPerson.username}</h2>
            <p className="text-secondary !text-xs">
              {lastText}
            </p>
          </div>
        </div>
      </Link>
    );
  }
}
