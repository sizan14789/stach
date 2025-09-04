"use client";

import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function SignupForm() {
  const router = useRouter()
  const { setLocalUser } = useAppContext();

  const handleSignUp = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const signupData = Object.fromEntries(formdata);
    const username = loginData.username.trim()
    const signupDataUpdated = {
      ...signupData,
      username
    }
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signupDataUpdated),
          credentials: "include",
        }
      );

      const data = await res.json();
      
      if (res.status === 200) {
        setLocalUser(data);
        toast.success("Signed up");
        router.push('/');
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.log(error);
      toast.error("Internal error");
    }
  };

  return (
    <form
      className="flex flex-col w-full max-w-[25rem]"
      onSubmit={handleSignUp}
    >
      <label htmlFor="username" className="mb-2 sm:text-xl">
        Username
      </label>
      <input
        type="text"
        required
        name="username"
        placeholder="Username"
        className="input-field mb-5"
      />

      <label htmlFor="username" className="mb-2 sm:text-xl">
        Email
      </label>
      <input
        type="email"
        required
        name="email"
        placeholder="Email"
        className="input-field mb-5"
      />

      <label htmlFor="username" className="mb-2 sm:text-xl">
        Password
      </label>
      <input
        type="password"
        required
        name="password"
        placeholder="Password"
        className="input-field mb-5"
      />

      <button type="submit" className="button-secondary !w-[8rem] ">
        Sign Up
      </button>
    </form>
  );
}
