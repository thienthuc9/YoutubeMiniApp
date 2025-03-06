import React, { useState } from "react";

const VideoUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const uploadVideo = async () => {
    if (!file) return alert("Vui lòng chọn video!");

    const formData = new FormData();
    formData.append("video", file);

    try {
      const response = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setVideoUrl(data.videoUrl);
    } catch (error) {
      console.error("Upload failed", error);
      alert("Lỗi khi upload video");
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-5">
      <input type="file" accept="video/*" onChange={handleFileChange} className="border p-2" />
      <button onClick={uploadVideo} className="bg-blue-500 text-white px-4 py-2 rounded">
        Upload
      </button>

      {videoUrl && (
        <video controls className="w-1/2">
          <source src={videoUrl} type="video/mp4" />
        </video>
      )}
    </div>
  );
};

export default VideoUpload;
