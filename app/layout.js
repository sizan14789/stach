import { cookies } from "next/headers";
import "./globals.css";
import AppProvider from "@/context/AppContext";
import Header from "@/ui/header/Header";
import Footer from "@/ui/footer/Footer";
import { Toaster } from "react-hot-toast";
import { localFont } from 'next/font/local'

export const metadata = {
  title: "Stack",
  description: "A real time chat project",
};

const oppoSans = localFont({
  src: [
    {
      path: './fonts/opposans/OPPOSansLight.woff2',
      weight: '200',
      style: 'normal',
    },
    {
      path: './fonts/opposans/OPPOSansRegular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/opposans/OPPOSansMedium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/opposans/OPPOSansBold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/opposans/OPPOSansHeavy.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
})

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value;

  return (
    <html lang="en">
      <AppProvider>
        <body
          className={`${oppoSans.className} flex flex-col min-h-svh min-w-svw ${
            theme === "dark" ? "dark" : ""
          } duration-150 ease-in-out`}
        >
          <Toaster />
          <Header />
          {children}
          <Footer />
        </body>
      </AppProvider>
    </html>
  );
}
