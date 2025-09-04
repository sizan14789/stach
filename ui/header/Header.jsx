import { RiLogoutBoxLine } from "react-icons/ri";
import DarkModeToggle from "./theme/DarkModeToggle";

export default function Header() {
  return (
    <div className="min-w-full flex flex-col px-4 py-4 lg:py-8 justify-center">
      <div className="box flex justify-between items-center">
        <DarkModeToggle />
        <button className="gap-1 button-primary">
          <RiLogoutBoxLine />
          <p className="mb-1 text-sm ">Logout</p>
        </button>
      </div>
    </div>
  );
}


