import React, { useEffect, useRef } from "react";
import VideoCard from "../../../components/VideoCard";
import { AppDispatch, RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { listVideo, reset } from "../../../redux/slice/videoSlice";
interface Video {
  id: string;
  title: string;
  thumbnail: string;
  views: number;
}

const VideoList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector((state: RootState) => state.videos.data) as unknown as Video[];


  useEffect(() => {
    dispatch(listVideo());

    return () => {
        dispatch(reset()); // Đặt trong một arrow function
    };
}, [dispatch]);
  return (
    <div className="video-list">
      {data.map((video) => (
        <VideoCard {...video} />
      ))}
    </div>
  );
};

export default VideoList;