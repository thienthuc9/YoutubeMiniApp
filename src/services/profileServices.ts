import { User } from "../redux/slice/profileSlice";
import { apiRequest } from "./apiServices";

export const mapService = {
  getUserInfo: async (params: object) => {
    const data = await apiRequest<User>({
      url: "http://localhost:5000/api/user-info",
      method: "GET",
      data: { ...params },
    });
    return data;
  },
};
