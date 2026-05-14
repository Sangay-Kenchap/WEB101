"use client";

import { useForm } from "react-hook-form";

export default function SignupPage() {

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const password = watch("password");

  const onSubmit = (data) => {
    alert("Signup Successful");
    console.log(data);
  };

  return (
    <div className="max-w-md mx-auto bg-zinc-900 p-6 rounded-xl">

      <h1 className="text-3xl font-bold mb-6">
        Signup
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >

        <div>
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 rounded bg-zinc-800"
            {...register("username", {
              required: "Username is required"
            })}
          />

          {errors.username && (
            <p className="text-red-500">
              {errors.username.message}
            </p>
          )}
        </div>

        <div>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded bg-zinc-800"
            {...register("email", {
              required: "Email is required"
            })}
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded bg-zinc-800"
            {...register("password", {
              required: "Password required",
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

        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-3 rounded bg-zinc-800"
            {...register("confirmPassword", {
              validate: (value) =>
                value === password || "Passwords do not match"
            })}
          />

          {errors.confirmPassword && (
            <p className="text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="bg-pink-500 w-full py-3 rounded"
        >
          Signup
        </button>

      </form>

    </div>
  );
}