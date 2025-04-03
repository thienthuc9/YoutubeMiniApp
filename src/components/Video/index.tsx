// VideoPageWrapper.tsx
import React from "react";
import { useParams } from "react-router-dom";
import VideoPage from "./DetailVideo";

const VideoPageWrapper: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Lấy "id" từ URL
  // Giả sử bạn có logic lấy userId từ context, auth, ...
  return <VideoPage videoId={Number(id!)} />;
};

export default VideoPageWrapper;
