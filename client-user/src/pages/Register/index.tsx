import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaCubes } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

type InputRegister = {
  username: string;
  password: string;
};

function Register() {
  const { signUp } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<InputRegister>();
  const onSubmit: SubmitHandler<InputRegister> = async (data) => {
    await signUp(data.username, data.password);
  };

  return (
    <div className="container mx-auto flex items-center justify-center h-screen flex-col">
      <h1 className="text-7xl">
        <FaCubes></FaCubes>
      </h1>
      <h1 className="text-3xl font-bold mt-2">EAT SLEEP and</h1>
      <h1 className="text-3xl font-bold my-1">
        <span className="text-pink-500"> COLLECT</span>{" "}
        <span className="text-red-500">NFTs...</span>
      </h1>

      <div className="flex items-center justify-center my-4 w-72">
        <div className="max-w-md w-full">
          <div>
            <h2 className="text-2xl text-center">Register</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or
              <Link
                to="/login"
                className="text-lg ml-3 font-medium text-indigo-600 hover:text-indigo-500"
              >
                login
              </Link>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="my-4">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  type="email"
                  {...register("username", { required: true })}
                  className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
                {errors.username && (
                  <span className="text-red-500 text-sm italic">
                    Username is required
                  </span>
                )}
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  {...register("password", { required: true })}
                  type="password"
                  className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
                {errors.password && (
                  <span className="text-red-500 text-sm italic">
                    Password is required
                  </span>
                )}
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <FaCubes className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" />
                </span>
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
