import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

interface CreateMessageRequest {
  chatId: string;
  content: string;
}

export const useCreateMessage = ({ onSuccess, onError }: any) => {
  return useMutation({
    mutationFn: async (data: CreateMessageRequest) => {
      const req = {
        content: data.content,
      };
      const response = await axiosInstance.post(`/message/${data.chatId}`, req, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
      });

      console.log(response.data);

      return response.data;
    },
    onSuccess,
    onError,
  });
};
