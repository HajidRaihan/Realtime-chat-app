import { axiosInstance } from "@/lib/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useFetchUserActive = (username?: string) => {
  return useQuery({
    queryFn: async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("access_token")}`,
          },
        };

        let params = [];

        if (username) {
          params.push(`username=${username}`);
        }

        const path = `/user/active?${params.join("&")}`;

        const res = await axiosInstance.get(path, config);
        console.log(res);
        return res.data.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    queryKey: ["userActive"],
  });
};
