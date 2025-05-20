import React from "react";
import { useNavigate } from "react-router-dom";

interface VideoProps {
  id: string;
  title: string;
  url: string;
  views: number;
}

const VideoCard: React.FC<VideoProps> = ({ id, title, url, views }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/${id}`)
  }
  return (
    <div key={id} onClick={handleClick} className="video-card">
      <video
        src={url}
        className="w-96 h-72 rounded-lg shadow-lg"
      />
      <div className="video-info">
        <h3>{title}</h3>
        <p>{views} views</p>
      </div>
    </div>
  );
};

export default VideoCard;
