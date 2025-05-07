import axios from "axios";
import React, { useState } from "react";
import { apiRequest } from "../services/apiServices";

const VideoUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const token = localStorage.getItem("token");
  const [isUploading, setIsUploading] = useState(false);
  const [title,setTitle] = useState<string>("");


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };
  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>)=>{
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
    <div className="flex flex-col items-center gap-4 p-5">
      <div>
        <span>Title</span>
        <input type="text" onChange={handleChangeText} value={title}></input>
      </div>
      <input type="file" accept="video/*" onChange={handleFileChange} className="border p-2" />
      <button onClick={uploadVideo} disabled={isUploading} className="bg-blue-500 text-white px-4 py-2 rounded">
        Upload
      </button>

      {videoUrl && (
        <video controls className="w-1/2">
          <source src={videoUrl} type="video/mp4" />
        </video>
      )}
      {/* Hiển thị tiến trình upload */}
      {uploadProgress > 0 && (
        <div className="w-1/2 bg-gray-200 h-4 rounded mt-2">
          <div
            className="bg-blue-500 h-full text-white text-center text-xs leading-4 rounded"
            style={{ width: `${uploadProgress}%` }}
          >
            {uploadProgress}%
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoUpload;
