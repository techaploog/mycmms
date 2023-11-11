"use client"

import { useState } from "react";
import toast from "react-hot-toast";

import { API_BASED } from "@/constants/api.constants";

const INIT_FORM = {
  email: "",
  password: "",
};

export default function LoginFormComponent () {
  const [formData, setFormData] = useState(INIT_FORM);
  const [isLoading, setIsLoading] = useState(false);

  const formChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log(JSON.stringify(formData));
      const res = await fetch(`${API_BASED}/auth/login`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { email } = await res.json();
      if (email) {
        toast.success(`welcome ${email}`);
      } else {
        toast.error(res.statusText);
      }
    } catch (err: any) {
      console.log("[ERR]", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
  );
}
