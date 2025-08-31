"use client"

import Cookies from "js-cookie";

export default function DarkModeToggle (){
  const handleToggle = ()=>{
    let theme = Cookies.get("theme");
    if(theme==="dark")
      theme="light"
    else
      theme="dark"
    Cookies.set("theme", theme , {
      path: "/",    
    });
    window.location.reload();
  }

  return(
    <button onClick={handleToggle} className="cursor-pointer">Change theme</button>
  )
}