import { cookies } from "next/headers";
import "./globals.css";
import AppProvider from "@/context/AppContext";
import Header from "@/ui/header/Header";
import Footer from "@/ui/footer/Footer";

export const metadata = {
  title: "Stack",
  description: "A real time chat project",
};

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value;

  return (
    <html lang="en">
      <AppProvider>
        <body
          className={`flex flex-col min-h-svh min-w-svw ${
            theme === "dark" ? "dark" : ""
          } duration-150 ease-in-out`}
        >
          <Header />
          {children}
          <Footer />
        </body>
      </AppProvider>
    </html>
  );
}
