"use client";

import { useForm } from "react-hook-form";

export default function LoginPage() {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    alert("Login Successful");
    console.log(data);
  };

  return (
    <div className="max-w-md mx-auto bg-zinc-900 p-6 rounded-xl">

      <h1 className="text-3xl font-bold mb-6">
        Login
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >

        <div>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded bg-zinc-800"
            {...register("email", {
              required: "Email is required"
            })}
          />

          {errors.email && (
            <p className="text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded bg-zinc-800"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Minimum 8 characters"
              }
            })}
          />

          {errors.password && (
            <p className="text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="bg-pink-500 w-full py-3 rounded"
        >
          Login
        </button>

      </form>

    </div>
  );
}