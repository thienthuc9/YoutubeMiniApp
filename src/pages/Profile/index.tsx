import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slice/authSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { listVideoByUserId, reset } from "../../redux/slice/videoSlice";
import VideoCard from "../../components/VideoCard";
import { mapService } from "../../services/videoServices";
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

  const deleteVideo = async (videoId: string) => {
    try {
      const confirmed = window.confirm("Bạn có chắc muốn xóa video này?");
      if (!confirmed) return;

      const res = await mapService.removeVideos({ id: Number(videoId) });
      console.log(res)

      alert("Đã xóa video thành công!");
      dispatch(listVideoByUserId());
      // Cập nhật UI sau khi xóa (ví dụ refetch list)
    } catch (error) {
      console.error("Xóa video thất bại", error);
      alert("Lỗi khi xóa video");
    }
  };
  return (
    <div>
      Profile
      <div>Video của bạn</div>
      <div className="video-list">
        {data.map((video) => (
          <>
            <VideoCard {...video} />
            <button onClick={() => deleteVideo((video.id))}>Delete</button>
          </>
        ))}
      </div>
      <button onClick={handleLogout}>Logout</button>

    </div>
    
  );
};

export default Profile;