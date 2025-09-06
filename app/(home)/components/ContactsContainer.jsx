import getToken from "@/lib/getToken";
import Contacts from "./Contacts";

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

export default async function ContactsContainer() {
  const token = await getToken();
  const chatsList = await getChats(token);

  if (chatsList)
    return (
      <Contacts chatsList={chatsList} />
    );
}
