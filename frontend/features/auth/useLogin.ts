import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { AxiosError } from "axios";

type Login = {
  email: string;
  password: string;
};

export const useLogin = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}) => {
  return useMutation({
    mutationFn: async (credentials: Login) => {
      try {
        const res = await axiosInstance.post("/auth/login", {
          email: credentials.email,
          password: credentials.password,
        });

        Cookies.set("access_token", res.data.token, { expires: 7 });
        return res.data;
      } catch (error) {
        // Handle Axios error
        if (error instanceof AxiosError) {
          // If the error response has data and message
          if (error.response?.data) {
            throw new Error(error.response.data.message || "An error occurred during login");
          }
          // If the error is network related
          if (error.request) {
            throw new Error("Network error. Please check your connection.");
          }
        }
        // For any other types of errors
        throw new Error("An unexpected error occurred");
      }
    },
    onSuccess,
    onError: (error: Error) => {
      if (onError) {
        onError(error.message);
      }
    },
  });
};
