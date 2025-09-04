"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext(null);

export default function AppProvider({ children }) {
  const [localUser, setLocalUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/token`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await res.json();
      if (res.status === 200) {
        setLocalUser(data);
      }
    };
    getUser();
  }, []);

  // useEffect(()=>{
  //   console.log(localUser);
  // }, [localUser])

  const props = { setLocalUser, localUser };

  return <AppContext.Provider value={props}>{children}</AppContext.Provider>;
}

export const useAppContext = () => useContext(AppContext);
