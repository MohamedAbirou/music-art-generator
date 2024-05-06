import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const SignOutButton = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation(apiClient.logout, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      toast.success("Logged out!");
      navigate("/");
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };

  return <button onClick={handleClick}>Sign Out</button>;
};
