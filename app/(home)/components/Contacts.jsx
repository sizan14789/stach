import getToken from "@/lib/getToken";
import ChatListContainer from "./ChatListContainer";
import SearchContact from "./SearchContact";

const getChats = async (token) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/chats`, {
      method: "GET",
      headers: {
        Cookie: `auth_token=${token}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default async function Contacts() {
  const token = await getToken();
  const chatsList = await getChats(token);

  if (chatsList)
    return (
      <div className="w-[4rem] md:w-[8rem] lg:w-[16rem] border-r-1 border-r-[var(--accent)] h-full ">
        <SearchContact />
        <ChatListContainer chatsList={chatsList} />
      </div>
    );
}
