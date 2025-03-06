import React from "react";
import VideoUpload from "../components/VideoUploads";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">YouTube Mini App</h1>
      <VideoUpload />
      <Link to="/register" className="mt-4 text-blue-500 underline">
        Đăng ký tài khoản
      </Link>
    </div>
  );
};

export default HomePage;