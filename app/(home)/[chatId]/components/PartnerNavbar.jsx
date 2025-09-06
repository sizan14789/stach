import { useAppContext } from "@/context/AppContext";
import { useChatContext } from "@/context/ChatLayoutContext";
import Blank from "@/ui/placeholder/Blank";

export default function PartnerNavbar() {
  const { localUser } = useAppContext();
  const { localChatInfo } = useChatContext();

  const partner = localChatInfo?.participants?.find(
    (curUser) => curUser._id !== localUser._id
  );
  const username = partner?.username;

  if (!localUser) return <Blank />;
  else
    return (
      <div className=" h-[5rem] p-4 flex shadow-[0_3px_3px_-3px_#00000024]">
        <div className="flex gap-2">
          <figure
            className="h-[full] aspect-square flex justify-center items-center rounded-full bg-red-500 p-1"
            style={partner && { backgroundColor: partner.avatarBg }}
          >
            <h1 className="text-white text-xl pb-1">
              {username ? username[0] : "A"}
            </h1>
          </figure>
          <h2 className="flex items-center">{username && username}</h2>
        </div>
      </div>
    );
}
