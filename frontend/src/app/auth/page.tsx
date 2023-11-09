"use client";

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const INIT_FORM = {
  email: "",
  password: "",
};

export default function SignIn() {
  const [formData, setFormData] = useState(INIT_FORM);
  const [isLoading, setIsLoading] = useState(false);

  const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try{
      setIsLoading(true);
      console.log(JSON.stringify(formData))
      const res = await fetch(`/api/v1/auth/login`,{
        method:'POST',
        body:JSON.stringify(formData),
        headers:{
          'Content-Type':'application/json'
        }
      })
      const {email} = await res.json();
      if (email) {
        toast.success(`welcome ${email}`);
      }else {
        toast.error(res.statusText);
      }
    }catch(err:any){
      console.log("[ERR]", err.message)
    }finally{
      setIsLoading(false);
    }
  };

  const formChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
        <form
          className="w-full h-full flex flex-col gap-4 items-center justify-center"
          onSubmit={formSubmitHandler}
        >
          <input
            className="bg-yellow-100 w-5/6 lg:w-2/3 px-3 py-2 border border-gray-200 hover:border-gray-600 rounded-md text-center"
            name="email"
            placeholder="e-mail"
            onChange={formChangeHandler}
            value={formData.email}
            disabled={isLoading}
            required
          />

          <input
            className="bg-yellow-100 w-5/6 lg:w-2/3 px-3 py-2 border border-gray-200 hover:border-gray-600 rounded-md text-center"
            name="password"
            placeholder="password"
            onChange={formChangeHandler}
            value={formData.password}
            disabled={isLoading}
            required
          />

          <button
            className="px-7 py-1 bg-black text-xl text-white font-bold rounded-lg"
            type="submit"
            disabled={isLoading}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
