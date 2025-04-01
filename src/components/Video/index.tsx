// VideoPageWrapper.tsx
import React from "react";
import { useParams } from "react-router-dom";
import VideoPage from "./DetailVideo";

const VideoPageWrapper: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Lấy "id" từ URL
  // Giả sử bạn có logic lấy userId từ context, auth, ...
  const userId = "someUserId"; 

  return <VideoPage videoId={Number(id!)} userId={userId} />;
};

export default VideoPageWrapper;
