"use client";

export default function SignupForm() {
  return (
    <form className="flex flex-col w-full max-w-[32rem]">
      
      <label htmlFor="username" className="mb-2 sm:text-xl" >Username</label>
      <input
        type="text"
        required
        name="username"
        placeholder="Username"
        className="input-field mb-5"
      />

      <label htmlFor="username" className="mb-2 sm:text-xl" >Email</label>
      <input
        type="email"
        required
        name="email"
        placeholder="Email"
        className="input-field mb-5"
      />

      <label htmlFor="username" className="mb-2 sm:text-xl" >Password</label>
      <input
        type="password"
        required
        name="password"
        placeholder="Password"
        className="input-field mb-5"
      />

      <button className="button-secondary !w-[8rem] ">
        Sign Up
      </button>
      
    </form>
  );
}
