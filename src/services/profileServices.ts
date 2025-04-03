import { User } from "../redux/slice/profileSlice";
import { apiRequest } from "./apiServices";
interface responseUser  {
    success : boolean;
    user : User
}
export const mapService = {
  getUserInfo: async (params: object) => {
    const data = await apiRequest<responseUser>({
      url: "http://localhost:5000/api/user-info",
      method: "GET",
      data: { ...params },
    });
    return data.user;
  },
};
