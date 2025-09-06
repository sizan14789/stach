import getUser from "@/lib/getUser";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getUser();

  if(!user)
    redirect('/login');

  return (
    <div className="hidden lg:flex h-full justify-center items-center ">
      <h2 className="text-xl md:text-2xl xl:text-4xl">How you feeling today <span className="text-[var(--accent)]">{user?.username}</span>?</h2>
    </div> 
  );
}
