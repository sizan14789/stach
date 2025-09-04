import { cookies } from "next/headers";

export default async function getUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
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
