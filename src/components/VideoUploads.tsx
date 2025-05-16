import axios from "axios";
import React, { useState } from "react";
import { apiRequest } from "../services/apiServices";

const VideoUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const token = localStorage.getItem("token");
  const [isUploading, setIsUploading] = useState(false);
  const [title, setTitle] = useState<string>("");


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };
  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }
  const uploadVideo = async () => {
    if (!file) return alert("Vui lòng chọn video!");
    setIsUploading(true);

    try {
      // 📌 Bước 1: Lấy Signed URL từ BE
      const data = await apiRequest<{ uploadUrl: string, filePath: string }>({
        url: "http://localhost:5000/api/get-upload-url",
        method: "GET",
      });

      if (!data.uploadUrl || !data.filePath) {
        return alert("Không lấy được URL upload");
      }
      // 📌 Bước 2: Upload video lên Google Cloud Storage
      await axios.put(data.uploadUrl, file, {
        headers: { "Content-Type": "video/mp4" },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          }
        },
      });

      // 📌 Bước 3: Gửi URL về Backend để lưu vào DB
      const publicUrl = `https://storage.googleapis.com/app-yt-mini/${data.filePath}`;
      await apiRequest({
        url: "http://localhost:5000/api/save-videos",
        method: "POST",
        data: { videoUrl: publicUrl, title: title }
      });
      alert("Upload thành công!");
      setFile(null);
      setUploadProgress(0);
      setVideoUrl(publicUrl)
      setIsUploading(false);
    } catch (error) {
      console.error("Upload thất bại", error);
      alert("Lỗi khi upload video");
    }
  };
  return (
    <div className="flex flex-col items-center gap-6 p-8 max-w-xl mx-auto bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800">Upload Video</h2>

      <div className="w-full">
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          onChange={handleChangeText}
          value={title}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
          placeholder="Enter video title..."
        />
      </div>

      <div className="w-full">
        <label className="block text-sm font-medium text-gray-700 mb-1">Select video file</label>
        <input
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          className="w-full text-black border border-gray-300 rounded-lg px-4 py-2 file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-gray-500 file:text-white file:rounded file:cursor-pointer hover:file:bg-gray-600"
        />
      </div>

      <button
        onClick={uploadVideo}
        disabled={isUploading}
        className={`w-full text-center py-2 rounded-lg font-semibold text-white ${isUploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'
          }`}
      >
        {isUploading ? 'Uploading...' : 'Upload'}
      </button>

      {/* Hiển thị tiến trình upload */}
      {uploadProgress > 0 && (
        <div className="w-full mt-2">
          <div className="w-full bg-gray-200 h-4 rounded-lg overflow-hidden">
            <div
              className="bg-red-500 h-full text-xs font-semibold text-white text-center"
              style={{ width: `${uploadProgress}%` }}
            >
              {uploadProgress}%
            </div>
          </div>
        </div>
      )}

      {/* Preview video sau khi upload */}
      {videoUrl && (
        <video controls className="w-full rounded-lg mt-4 shadow-md">
          <source src={videoUrl} type="video/mp4" />
          Trình duyệt của bạn không hỗ trợ video.
        </video>
      )}
    </div>

  );
};

export default VideoUpload;
