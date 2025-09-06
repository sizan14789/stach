import getUser from "@/lib/getUser";
import getToken from "@/lib/getToken";
import ChatContainer from "./components/ChatContainer";

const getChatInfo = async (chatId, token) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/chats/${chatId}`,
      {
        method: "GET",
        headers: {
          Cookie: `auth_token=${token}`,
        },
      }
    );
    if (res.status === 200) {
      const data = await res.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

const getMessages = async (chatId, token) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/messages/${chatId}`,
      {
        method: "GET",
        headers: {
          Cookie: `auth_token=${token}`,
        },
      }
    );
    if (res.status === 200) {
      const data = await res.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export default async function ChatId({ params }) {
  const token = await getToken();
  const { chatId } = await params;
  const chatInfo = await getChatInfo(chatId, token);
  const messages = await getMessages(chatId, token);
  const user = await getUser()

  if (user && chatInfo && messages)
    return (
      <div className="flex flex-col w-full overflow-hidden">
        <ChatContainer user={user} chatInfo={chatInfo} messages={messages} />
      </div>
    );
}
