"use client";

export default function LoginForm() {
  return (
    <form className="flex flex-col w-full max-w-[32rem]">
      
      <label htmlFor="username" className="mb-2 sm:text-xl" >Username or Email</label>
      <input
        type="text"
        required
        name="username"
        placeholder="Username or email"
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
        Log in
      </button>
    </form>
  );
}
