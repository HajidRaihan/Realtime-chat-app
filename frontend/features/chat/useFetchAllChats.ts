import { axiosInstance } from "@/lib/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useFtechAllChats = () => {
  return useQuery({
    queryKey: ["allChats"],
    queryFn: async () => {
      const res = await axiosInstance("/chat/getAll", {
        headers: {
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
      });

      console.log("all chat", res.data);

      const filteredResponse = res.data.data.filter((item: any) => item.lastMessage !== null);
      return filteredResponse;
    },
  });
};
