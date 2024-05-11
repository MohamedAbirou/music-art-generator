import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../../../api-client";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

export type RegisterFormData = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {
      toast.success("Registration successful!");
      await queryClient.invalidateQueries("validateToken");
      await queryClient.invalidateQueries("checkSession");
      navigate("/");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <>
      <div className="flex">
        <form
          className="relative flex flex-col gap-5 items-center justify-center w-full md:w-[55%] min-h-screen"
          onSubmit={onSubmit}
        >
          <Link
            to="/"
            className="absolute top-2 border-b-2 pb-2 w-full text-2xl flex items-center justify-center"
          >
            Music & <span className="text-blue-500 pl-1">Art</span>
          </Link>
          <div className="w-full max-w-[500px] px-4">
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl pb-3">Sign Up</h2>
              <span className="text-sm">
                Already have a fan?{" "}
                <Link to="/login" className="underline">
                  sign in here.
                </Link>
              </span>
            </div>
            <div className="my-10 flex flex-col gap-y-5">
              <label
                htmlFor="fullName"
                className="text-gray-700 text-sm flex-1"
              >
                Full Name
                <input
                  className="border rounded w-full my-2 py-1 px-2 font-normal"
                  type="text"
                  id="fullName"
                  {...register("fullName", {
                    required: "This field is required",
                  })}
                />
                {errors.fullName && (
                  <span className="text-red-500">
                    {errors.fullName.message}
                  </span>
                )}
              </label>
              <label htmlFor="email" className="text-gray-700 text-sm flex-1">
                Email
                <input
                  className="border rounded w-full my-2 py-1 px-2 font-normal"
                  type="email"
                  id="email"
                  {...register("email", {
                    required: "This field is required",
                  })}
                />
                {errors.email && (
                  <span className="text-red-500">{errors.email.message}</span>
                )}
              </label>
              <label
                htmlFor="password"
                className="text-gray-700 text-sm flex-1"
              >
                Password
                <div className="relative">
                  <input
                    className="border rounded w-full py-1 px-2 font-normal"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    {...register("password", {
                      required: "This field is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                    })}
                  />
                  <span
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </span>
                </div>
                {errors.password && (
                  <span className="text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </label>
              <label
                htmlFor="confirmPassword"
                className="text-gray-700 text-sm flex-1"
              >
                Confirm Password
                <div className="relative">
                  <input
                    className="border rounded w-full my-2 py-1 px-2 font-normal"
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    {...register("confirmPassword", {
                      validate: (value: string) => {
                        if (!value) {
                          return "This field is required";
                        } else if (watch("password") !== value) {
                          return "Your passwords don't match";
                        }
                      },
                    })}
                  />
                  <span
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </span>
                </div>
                {errors.confirmPassword && (
                  <span className="text-red-500">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </label>
            </div>

            <button className="bg-[#2654E1] w-full text-white px-3 py-1.5 hover:bg-[#2654E1]/90 transition-colors duration-300 rounded">
              Create Account
            </button>

            <hr className="h-0.5 bg-slate-200 my-5" />

            <button
              onClick={apiClient.googleLogin}
              className="flex items-center justify-center w-full hover:bg-slate-100 transition-colors duration-300 px-3 border py-1.5 rounded"
            >
              <FcGoogle className="mr-2 w-6 h-6" />
              <p className="pt-0.5">Sign in with Google</p>
            </button>
          </div>
        </form>
        <div className="bg-[#F9F5F0] hidden md:flex flex-1 items-center justify-center min-h-screen">
          <img
            src="/images/register-img.png"
            alt="register"
            className="object-cover object-center"
          />
        </div>
      </div>
    </>
  );
};

export default Register;
