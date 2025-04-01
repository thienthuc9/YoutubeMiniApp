import React from "react";
import { useNavigate } from "react-router-dom";

interface VideoProps {
  id: string;
  title: string;
  thumbnail: string;
  views: number;
}

const VideoCard: React.FC<VideoProps> = ({ id, title, thumbnail, views }) => {
  const navigate = useNavigate();
  const handleClick = ()=>{
    navigate(`/${id}`)
  }
  return (
    <div key={id} onClick={handleClick} className="video-card">
      <img src={thumbnail} alt={title} className="thumbnail" />
      <div className="video-info">
        <h3>{title}</h3>
        <p>{views}</p>
      </div>
    </div>
  );
};

export default VideoCard;
