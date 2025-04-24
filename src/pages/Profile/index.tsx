import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slice/authSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { listVideoByUserId, reset } from "../../redux/slice/videoSlice";
import VideoCard from "../../components/VideoCard";
interface Video {
  id: string;
  title: string;
  thumbnail: string;
  views: number;
}
const Profile: React.FC = () => {
  const handleLogout = () => {
    dispatch(logout());
    window.location.reload();

  }
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector((state: RootState) => state.videos.data) as unknown as Video[];


  useEffect(() => {
    dispatch(listVideoByUserId());

    return () => {
      dispatch(reset()); // Đặt trong một arrow function
    };
  }, [dispatch]);
  console.log({ data })
  return (
    <div>
      Profile
      <button onClick={handleLogout}>Logout</button>
      <div>Video của bạn</div>
      <div className="video-list">
        {data.map((video) => (
          <VideoCard {...video} />
        ))}
      </div>
    </div>
  );
};

export default Profile;