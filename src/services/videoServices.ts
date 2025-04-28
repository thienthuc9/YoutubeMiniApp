import { Videos, VideosDetail } from "../redux/slice/videoSlice";
import { apiRequest } from "./apiServices";
interface responseVideosList  {
    success : boolean;
    videos : Videos[]
}
interface paramsDetailVideo  {
  id : number;
}
export const mapService = {
  getListVideos: async () => {
    const data = await apiRequest<responseVideosList>({
      url: `http://localhost:5000/api/get-list-all`,
      method: "GET",
    });
    return data.videos;
  },
  getDetailVideos : async (params:paramsDetailVideo) => {
    const data : VideosDetail = await apiRequest({
      url: `http://localhost:5000/api/get-videos/${params.id}`,
      method: "GET",
    });
    return data;
  },
  getListVideosByUserId: async () => {
    const data = await apiRequest<responseVideosList>({
      url: `http://localhost:5000/api/get-videos-by-user`,
      method: "GET",
    });
    return data.videos;
  },
  removeVideos : async (params:paramsDetailVideo) => {
    const data = await apiRequest({
      url: `http://localhost:5000/api/remove-videos/${params.id}`,
      method: "PUT",
    });
    return data;
  },
};
