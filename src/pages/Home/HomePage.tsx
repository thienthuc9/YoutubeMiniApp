import React from "react";
import VideoList from "./ListVideos";
import Header from "../../components/Header/Header";
import "./Home.css"; // Import file CSS

const HomePage: React.FC = () => {

  return (
    <div className="home-container">
      <Header />
      <h1>Danh sách Video</h1>
      <VideoList />
    </div>
  );
};

export default HomePage;