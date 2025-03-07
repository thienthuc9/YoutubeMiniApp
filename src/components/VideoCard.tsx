import React from "react";

interface VideoProps {
  id: string;
  title: string;
  thumbnail: string;
  channel: string;
}

const VideoCard: React.FC<VideoProps> = ({ id, title, thumbnail, channel }) => {
  return (
    <div className="video-card">
      <img src={thumbnail} alt={title} className="thumbnail" />
      <div className="video-info">
        <h3>{title}</h3>
        <p>{channel}</p>
      </div>
    </div>
  );
};

export default VideoCard;
