import SignupForm from "../components/SignupForm";

export default function Login(){
  return(
    <div className="page">
      <div className="box grow flex flex-col sm:items-center justify-center pb-20">
        <h2 className="text-3xl mb-4 sm:mb-8 md:text-[6svw] xl:text-[4svw] ">New to Stack?</h2>
        <SignupForm />
      </div>
    </div>
  )
}