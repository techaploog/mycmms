
import LoginFormComponent from "@/components/login-form.component";
import { Toaster } from "react-hot-toast";

export default function SignIn() {
  
  return (
    <div 
      className="h-screen w-screen flex flex-col items-center justify-center mx-auto bg-gray-100"
      style={{background:'linear-gradient(180deg, rgba(220,220,220,1) 0%, rgba(240,240,240,1) 35%, rgba(250,250,250,1) 100%)'}}
    >
      <Toaster />
      <div
        className={`
        bg-white
        flex flex-col items-center justify-between
        w-5/6 h-5/6 max-w-md max-h-80 p-3
        border border-gray-400 rounded-md`}
      >
        <h1 className="py-3 text-2xl lg:text-4xl font-bold">Login</h1>
        <LoginFormComponent />
      </div>
    </div>
  );
}
