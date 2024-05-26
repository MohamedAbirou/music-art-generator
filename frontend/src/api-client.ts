import axios from "axios";
import { LoginFormData } from "./pages/(auth)/(routes)/login";
import { RegisterFormData } from "./pages/(auth)/(routes)/register";
import { UserType } from "../../backend/src/shared/types";
import { FieldValues } from "react-hook-form";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

//* Authentication

export const fetchCurrentUser = async (): Promise<UserType> => {
  const response = await axios.get(`${API_BASE_URL}/api/users/me`, {
    withCredentials: true,
  });

  return response.data;
};

export const register = async (formData: RegisterFormData) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/users/register`,
    formData,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (response.status !== 200) {
    throw new Error(response.data.message);
  }
};

export const login = async (formData: LoginFormData) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/auth/login`,
    formData,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (response.status !== 200) {
    throw new Error(response.data.message);
  }

  return response.data;
};

export const googleLogin = () => {
  window.location.href = `${API_BASE_URL}/api/auth/google`;
};

export const logout = async () => {
  const response = await axios.post(
    `${API_BASE_URL}/api/auth/logout`,
    {},
    {
      withCredentials: true,
    }
  );

  if (response.status !== 200) {
    throw new Error(response.data.message);
  }

  return response.data;
};

//* Sessions

export const validateToken = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/auth/validate-token`, {
    withCredentials: true,
  });

  if (response.status !== 200) {
    throw new Error("Token invalid");
  }

  return response.data;
};

export const checkSession = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/auth/check-session`, {
    withCredentials: true,
  });

  if (response.status !== 200) {
    throw new Error("Session check failed");
  }

  return response.data;
};

//* Image Generation

export const generateImage = async (formData: FieldValues) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/images/generate`,
    formData,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (response.status !== 200) {
    throw new Error(response.data.message);
  }

  return response.data;
};

// export const createGeneration = async (formData: FieldValues) => {
//   const response = await axios.post(
//     `${API_BASE_URL}/api/images/create`,
//     formData,
//     {
//       withCredentials: true,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }
//   );

//   if (response.status !== 200) {
//     throw new Error(response.data.message);
//   }
// };
