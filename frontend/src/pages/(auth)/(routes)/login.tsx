import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../../../api-client";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";
import { EyeOff, Eye } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

export type LoginFormData = {
  email: string;
  password: string;
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const mutation = useMutation(apiClient.login, {
    onSuccess: async () => {
      toast.success("Logged in!");
      await queryClient.invalidateQueries("validateToken");
      await queryClient.invalidateQueries("checkSession");
      navigate(location.state?.from?.pathname || "/");
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
              <h2 className="text-2xl md:text-3xl pb-3">Sign In</h2>
              <span className="text-sm">
                New to Music & Art?{" "}
                <Link to="/register" className="underline">
                  register here.
                </Link>
              </span>
            </div>
            <div className="my-10 flex flex-col gap-y-5">
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
                    className="border rounded w-full my-2 py-1 px-2 font-normal"
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
            </div>

            <button className="bg-[#2654E1] w-full text-white px-3 py-1.5 hover:bg-[#2654E1]/90 transition-colors duration-300 rounded">
              Login
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

export default Login;
