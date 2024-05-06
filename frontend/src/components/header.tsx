import { navRoutes } from "@/utils/nav-routes";
import { Link } from "react-router-dom";
import { Sheet, SheetTrigger, SheetContent, SheetHeader } from "./ui/sheet";
import { FaFacebook } from "react-icons/fa";
import { BsInstagram, BsSnapchat } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import { Music } from "lucide-react";
import { useAppContext } from "@/contexts/app-context";
import { SignOutButton } from "./sign-out-btn";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export const Header = () => {
  const { isLoggedIn } = useAppContext();

  const { data: currentUser } = useQuery(
    "fetchCurrentUser",
    apiClient.fetchCurrentUser
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
      <span className="text-xl font-medium tracking-tight">
        <Link to="/">
          Music & <span className="text-blue-600">Art</span>
        </Link>
      </span>
      <span className="hidden md:flex items-center text-sm gap-10">
        {navRoutes.map((route) => (
          <Link key={route.href} to={route.href} className="font-light">
            {route.name}
          </Link>
        ))}
        {isLoggedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="flex bg-[#2654E1]/[40%] items-center justify-center cursor-pointer">
                <AvatarImage src="ds" alt="@userImg" />
                <AvatarFallback>
                  {currentUser?.fullName.charAt(0)}
                  {currentUser?.fullName.split(" ")[1].charAt(0)}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40 rounded mr-2">
              <div className="hover:bg-slate-300 cursor-pointer rounded text-sm px-2 py-1">
                <Link to="/my-generations">My Gens</Link>
              </div>
              <DropdownMenuSeparator className="bg-slate-300" />
              <div className="hover:bg-red-300 cursor-pointer rounded text-sm px-2 py-1">
                <SignOutButton />
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link
            to="/login"
            className="px-4 py-2 bg-gray-500 hover:bg-[#2654E1]/[40%] transition-colors duration-300 text-white text-base rounded-[0.3rem]"
          >
            Login
          </Link>
        )}
      </span>
      <Sheet>
        <SheetTrigger className="flex md:hidden">
          <Music />
        </SheetTrigger>
        <SheetContent className="bg-white flex flex-col justify-start pt-20">
          <SheetHeader className="text-gray-400 text-sm border-b-2 w-full">
            navigation
          </SheetHeader>
          {navRoutes.map((route) => (
            <Link
              key={route.href}
              to={route.href}
              className="flex items-center group"
            >
              <p className="pb-4 pr-3 text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                .
              </p>
              {route.name}
            </Link>
          ))}
          <SheetHeader className="mt-10 text-gray-400 text-sm border-b-2 w-full">
            Register
          </SheetHeader>
          {isLoggedIn ? (
            <SignOutButton />
          ) : (
            <div className="flex items-center justify-between">
              <Link
                to="/login"
                className="px-4 py-2 bg-gray-500 hover:bg-[#2654E1]/[40%] transition-colors duration-300 text-white text-base rounded-[0.3rem]"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-gray-500 hover:bg-[#2654E1]/[40%] transition-colors duration-300 text-white text-base rounded-[0.3rem]"
              >
                Register
              </Link>
            </div>
          )}
          <SheetHeader className="mt-10 text-gray-400 text-sm border-b-2 w-full">
            Socials
          </SheetHeader>
          <div className="flex items-center justify-around">
            <Link to="">
              <FaFacebook className="hover:fill-blue-600 w-6 h-6" />
            </Link>
            <Link to="">
              <BsInstagram className="hover:fill-pink-700 w-6 h-6" />
            </Link>
            <Link to="">
              <FaXTwitter className="w-6 h-6" />
            </Link>
            <Link to="">
              <BsSnapchat className="hover:fill-[#fffc00] w-6 h-6" />
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
