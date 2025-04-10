import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import io, { Socket } from "socket.io-client";
import { detailVideo, VideosDetail } from "../../redux/slice/videoSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { User } from "../../redux/slice/profileSlice";

// Khai báo kiểu cho props của component
interface VideoPageProps {
  videoId: number;
}

// Khai báo kiểu cho comment
export interface Comment {
  user_id: string;
  content: string;
}

// Khởi tạo kết nối Socket.io
const socket: Socket = io("http://localhost:5000");

const VideoPage: React.FC<VideoPageProps> = ({ videoId }) => {
  const user = useSelector((state: RootState) => state.profile.user) as object as User || {};

  const activeRow = useSelector((state: RootState) => state.videos.activeRow) as unknown as VideosDetail;
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [watchTime, setWatchTime] = useState<number>(0);
  const [like, setLikes] = useState<number>(activeRow.likes);
  const [views, setViews] = useState<number>(activeRow.views);
  const [commentsTmp, setComments] = useState<Comment[]>(activeRow.comments);
  const [newComment, setNewComment] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  // Sử dụng useRef để lưu trạng thái đã báo lượt view (không bị reset khi re-render)
  const hasReportedView = useRef<boolean>(false);
  useEffect(() => {
    dispatch(detailVideo(Number(videoId)));

  }, [dispatch, videoId])
  useEffect(() => {
    setLikes(activeRow.likes)
    setComments(activeRow.comments)
    setViews(activeRow.views)
  }, [activeRow])
  console.log({ watchTime })
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Cập nhật thời gian xem mỗi khi video phát
    const handleTimeUpdate = () => {
      setWatchTime(video.currentTime);
    };

    // Khi video kết thúc, kiểm tra xem đã xem đủ 70% chưa
    const handleVideoEnd = () => {
      const duration = video.duration;
      const watchPercentage = (watchTime / duration) * 100;
      console.log({ watchPercentage })
      if (watchPercentage >= 70) {
        socket.emit("video_watched", { userId: user.id, videoId });
      }
    };
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleVideoEnd);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleVideoEnd);
    };
  }, [videoId, watchTime]);

  useEffect(() => {
    // Lắng nghe sự kiện cập nhật số lượt like từ server
    socket.on(`update_likes:${videoId}`, ({ likes }: { likes: number }) => {
      setLikes(likes);
    });
    // Lắng nghe sự kiện cập nhật comment từ server
    socket.on(`update_comments:${videoId}`, (newComment: Comment) => {
      setComments((prev) => [...prev, newComment]);
    });
    // Lắng nghe sự kiện cập nhật comment từ server
    socket.on(`video_views_updated:${videoId}`, ({ views }: { views: number }) => {
      setViews(views);
    });
    return () => {
      socket.off(`update_likes:${videoId}`);
      socket.off(`update_comments:${videoId}`);
    };
  }, [videoId]);
  // Hàm gửi like qua Socket.io
  const handleLike = () => {
    socket.emit("like_video", { userId: user.id, videoId });
  };

  // Hàm gửi comment qua Socket.io
  const handleComment = () => {
    if (!newComment.trim()) return;
    socket.emit("comment_video", { userId: user.id, videoId, text: newComment });
    setNewComment("");
  };
  return (
    <div>
      {/* Video Player */}
      <video ref={videoRef} controls src={activeRow.url} />
      <p>{views} Views</p>
      {/* Hiển thị số like và nút like */}
      <p>👍 Likes: {like}</p>
      <button onClick={handleLike}>👍 Like</button>

      {/* Phần hiển thị comment */}
      <div>
        <h3>Comments</h3>
        <ul>
          {commentsTmp?.map((c, idx) => (
            <li key={idx}>
              <strong>User {c.user_id}:</strong> {c.content}
            </li>
          ))}
        </ul>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
        />
        <button onClick={handleComment}>💬 Comment</button>
      </div>
    </div>
  );
};

export default VideoPage;
