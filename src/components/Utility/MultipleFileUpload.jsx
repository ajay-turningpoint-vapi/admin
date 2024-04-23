import React, { useState, useEffect } from "react";
import { url } from "../../services/url.service";
import toast from "react-hot-toast";
import Lottie from "react-lottie";
import animationData from "../Utility/loader1.json";
function MultiFileUpload({
  onFileChange,
  getVideoDuration,
  acceptImage,
  multiple = false,
}) {
  const [filesArr, setFilesArr] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleFileSelection = async (event) => {
    try {
      event.preventDefault();
      setUploading(true); // Set uploading to true when starting file upload
      let tempArr = [];

      if (event.target.files && event.target.files.length > 0) {
        const formData = new FormData();

        for (let i = 0; i < event.target.files.length; i++) {
          formData.append("images", event.target.files[i]);
        }

        const response = await fetch(`${url}/upload`, {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const fileUrls = await response.json();
          tempArr = fileUrls.map((url) => ({
            fileUrl: url,
            isVideo: url.endsWith(".mp4"),
            displayLikeAfter: 0,
            points: 0,
          }));
        } else {
          const errorMessage = await response.text();
          throw new Error(errorMessage || "Failed to upload files");
        }
      }

      setFilesArr(tempArr);
      onFileChange(tempArr);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to upload files");
    } finally {
      setUploading(false); // Set uploading to false when file upload completes
    }
  };

  useEffect(() => {
    if (filesArr) {
      console.log(filesArr, "filesArr");
    }
  }, [filesArr]);

  return (
    <div className="position-relative">
      <input
        multiple={multiple}
        type="file"
        onChange={(event) => handleFileSelection(event)}
        className="form-control"
        accept={acceptImage ? "image/*" : "video/*"}
      />
      {uploading && (
        <div className="loader">
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: animationData, // Your animation JSON data
            }}
            height={70} // Adjust as needed
            width={70} // Adjust as needed
            style={{margin:"15px"}}
          />
        </div>
      )}
    </div>
  );
}

export default MultiFileUpload;
