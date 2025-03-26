import React, { useEffect, useRef } from "react";
import VideoList from "./ListVideos";
import Header from "../../components/Header/Header";
import "./Home.css"; // Import file CSS
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { profileUser } from "../../redux/slice/profileSlice";

const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const isFetched = useRef(false);

  useEffect(() => {
    if (!isFetched.current) {
      dispatch(profileUser());
      isFetched.current = true;
    }
  }, [dispatch]);
  return (
    <div className="home-container">
      <Header />
      <h1>Danh sách Video</h1>
      <VideoList />
    </div>
  );
};

export default HomePage;