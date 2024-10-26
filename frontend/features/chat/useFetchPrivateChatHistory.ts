import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import Cookies from "js-cookie";

export const useFetchPrivateChatHistory = (chatId: string | null) => {
  return useQuery({
    queryKey: ["privateChatHistory", chatId], // Tambahkan chatId ke queryKey
    queryFn: async () => {
      if (!chatId) throw new Error("Chat ID is required");

      const res = await axiosInstance.get(`/chat/history/${chatId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
      });
      console.log("private", res);
      return res.data;
    },
    enabled: !!chatId, // Query hanya akan dijalankan jika chatId ada
  });
};
