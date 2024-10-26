import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useCreateChat = ({ onSuccess, onError }: any) => {
  return useMutation({
    mutationFn: async (userid: string) => {
      const res = await axiosInstance.post(
        "/chat/create",
        { receiverId: userid },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("access_token")}`,
          },
        }
      );

      console.log("chat", res);
      return res.data;
    },
    onSuccess,
    onError,
  });
};
