
import getToken from "./getToken";

export default async function getUser() {
  const token = await getToken()
  if (!token) return null;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/token`,
      {
        method: "GET",
        headers: {
          cookie: `auth_token=${token}`
        }
      }
    );
    const data = await res.json();
    if (res.status === 200) return data;
    else return null;
  } catch (error) {
    console.log(error);
  }
}
