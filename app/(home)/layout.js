import ChatContextProvider from "@/context/ChatLayoutContext";
import Contacts from "./components/Contacts";

export default async function layout({ children }) {
  return (
    <ChatContextProvider>
      <div className="page">
        <div className="box grow grid grid-cols-[auto_1fr] h-[calc(100vh-14rem)] border-1 border-[var(--border)] rounded-xl shadow-[0px_0px_6px_2px_#00000011]  overflow-hidden">
          <Contacts />
          {children}
        </div>
      </div>
    </ChatContextProvider>
  );
}
