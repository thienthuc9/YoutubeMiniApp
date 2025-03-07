import React from "react";
import VideoCard from "../../../components/Video/VideoCard";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  channel: string;
}

const videoData: Video[] = [
    {
      id: "1",
      title: "React TypeScript Tutorial",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
      channel: "Tech Channel",
    },
    {
      id: "2",
      title: "Learn Node.js in 10 Minutes",
      thumbnail: "https://img.youtube.com/vi/3S8a180uYBM/mqdefault.jpg",
      channel: "Code Academy",
    },
    {
      id: "3",
      title: "Next.js vs React - What to Choose?",
      thumbnail: "https://img.youtube.com/vi/Qh3YoAuiS5M/mqdefault.jpg",
      channel: "Dev Insights",
    },
  ];

const VideoList: React.FC = () => {
  return (
    <div className="video-list">
      {videoData.map((video) => (
        <VideoCard key={video.id} {...video} />
      ))}
    </div>
  );
};

export default VideoList;