
import ChatList from "./components/ChatList";

export default async function layout({ children }) {

  return (
    <div className="page">
      <div className="box grow grid grid-cols-[auto_1fr] border-1 border-[var(--border)] rounded-xl">
        <ChatList />
        <div className="">{children}</div>
      </div>
    </div>
  );
}
