import { Videos } from "../redux/slice/videoSlice";
import { apiRequest } from "./apiServices";
interface paramsListVideos  {
    id : string;
}
interface responseVideosList  {
    success : boolean;
    videos : Videos[]
}
export const mapService = {
  getListVideos: async () => {
    const data = await apiRequest<responseVideosList>({
      url: `http://localhost:5000/api/get-list-all`,
      method: "GET",
    });
    return data.videos;
  },
};
