import getUser from "@/lib/getUser";
import Logout from "./Logout";
import DarkModeToggle from "./theme/DarkModeToggle";

export default async function Header() {
  const user = await getUser();

  return (
    <div className="min-w-full h-20 flex flex-col px-4 py-4 lg:py-8 justify-center">
      <div className="box flex justify-between items-center">
        <DarkModeToggle />
        {user ? <Logout /> : <></>}
      </div>
    </div>
  );
}
