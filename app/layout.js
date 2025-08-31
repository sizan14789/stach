import { cookies } from "next/headers";
import "./globals.css";
import AppProvider from "@/context/AppContext";

export const metadata = {
  title: "Stach",
  description: "A real time chat project",
};

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value;

  return (
    <html lang="en">
      <AppProvider>
        <body
          className={`flex flex-col min-h-svh ${theme==="dark"? "dark" : ""}`}
        >
          {children}
        </body>
      </AppProvider>
    </html>
  );
}
