import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import io, { Socket } from "socket.io-client";
import { detailVideo, VideosDetail } from "../../redux/slice/videoSlice";
import { AppDispatch, RootState } from "../../redux/store";

// Khai báo kiểu cho props của component
interface VideoPageProps {
  videoId: number;
  userId?: string;
}

// Khai báo kiểu cho comment
export interface Comment {
  username: string;
  text: string;
}

// Khởi tạo kết nối Socket.io
const socket: Socket = io("http://localhost:5000");

const VideoPage: React.FC<VideoPageProps> = ({ videoId, userId }) => {
  const activeRow = useSelector((state: RootState) => state.videos.activeRow) as unknown as VideosDetail;
  const {likes,url,title,views,comments} = activeRow
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [watchTime, setWatchTime] = useState<number>(0);
  const [like, setLikes] = useState<number>(likes);
  const [commentsTmp, setComments] = useState<Comment[]>(comments);
  const [newComment, setNewComment] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  // Sử dụng useRef để lưu trạng thái đã báo lượt view (không bị reset khi re-render)
  const hasReportedView = useRef<boolean>(false);
  useEffect(() => {
    dispatch(detailVideo(Number(videoId)));

  }, [dispatch, videoId])
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
      if (!hasReportedView.current && watchPercentage >= 70) {
        socket.emit("video_watched", { userId, videoId });
        hasReportedView.current = true;
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleVideoEnd);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleVideoEnd);
    };
  }, [videoId, userId, watchTime]);

  useEffect(() => {
    // Lắng nghe sự kiện cập nhật số lượt like từ server
    socket.on(`update_likes:${videoId}`, ({ like }: { like: number }) => {
      setLikes(like);
    });
    // Lắng nghe sự kiện cập nhật comment từ server
    socket.on(`update_comments:${videoId}`, (newComment: Comment) => {
      setComments((prev) => [...prev, newComment]);
    });

    return () => {
      socket.off(`update_likes:${videoId}`);
      socket.off(`update_comments:${videoId}`);
    };
  }, [videoId]);

  // Hàm gửi like qua Socket.io
  const handleLike = () => {
    socket.emit("like_video", { userId, videoId });
  };

  // Hàm gửi comment qua Socket.io
  const handleComment = () => {
    if (!newComment.trim()) return;
    socket.emit("comment_video", { userId, videoId, text: newComment });
    setNewComment("");
  };
  return (
    <div>
      {/* Video Player */}
      <video ref={videoRef} controls src={url} />
      <p>{views}</p>
      {/* Hiển thị số like và nút like */}
      <p>👍 Likes: {like}</p>
      <button onClick={handleLike}>👍 Like</button>

      {/* Phần hiển thị comment */}
      <div>
        <h3>Comments</h3>
        <ul>
          {commentsTmp?.map((c, idx) => (
            <li key={idx}>
              <strong>{c.username}:</strong> {c.text}
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
