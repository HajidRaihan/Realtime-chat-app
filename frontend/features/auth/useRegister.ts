import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

type Register = {
  username: string;
  email: string;
  password: string;
};

export const useRegiser = ({ onSuccess, onError }: any) => {
  return useMutation({
    mutationFn: async (credentials: Register) => {
      try {
        const res = await axiosInstance.post("/auth/register", {
          username: credentials.username,
          email: credentials.email,
          password: credentials.password,
        });
        console.log(res);

        return res;
      } catch (error) {
        if (error instanceof AxiosError) {
          // If the error response has data and message
          if (error.response?.data) {
            throw new Error(error.response.data.message || "An error occurred during register");
          }
          // If the error is network related
          if (error.request) {
            throw new Error(error.message);
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
