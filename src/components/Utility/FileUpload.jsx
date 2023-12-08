import React, { useState } from "react";
import CustomButton from "./Button";

function FileUpload({ getVideoDuration, onFileChange }) {
  const [file, setFile] = useState("");

  const getBase64 = (file, cb) => {
    let reader = new FileReader();
    var duration = 0
    reader.readAsDataURL(file);
    reader.onload = function () {
      console.log(reader)
      var media = new Audio(reader.result);
      media.onloadedmetadata = function () {
        duration = media.duration
        cb({ result: reader.result, file: file, duration: duration && duration != 0 ? duration : 0 });
      };
      if (getVideoDuration) {
        cb({ result: reader.result, file: file, duration: duration && duration != 0 ? duration : 0 });
      }
      else {
        cb(reader.result);
      }
    };
    reader.onerror = function (error) {
      // console.log('Error: ', error)
    };
  };
  const handleFileSelection = (event) => {
    if (event.target.files[0]) {


      var video = document.createElement('video');
      video.preload = 'metadata';
      console.log("asdsd")
      video.onloadedmetadata = function () {
        window.URL.revokeObjectURL(video.src);
        var duration = video.duration;
        console.log(duration, "duration")
      }
      getBase64(event.target.files[0], (result) => {
        setFile(event.target.files[0]);
        let tempResult = result;

        tempResult.files = event.target.files[0]
        onFileChange(tempResult);
      });
    }
  };
  return (
    <div className="position-relative">
      <input type="file" onChange={(event) => handleFileSelection(event)} className="form-control" />
      <CustomButton isLink extraClass="position-absolute start-0 top-0 h-100 text-uppercase rounded-0" noIcon btnName="Browse" />
    </div>
  );
}

export default FileUpload;
