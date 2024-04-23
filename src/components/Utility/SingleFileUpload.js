import React, { useState } from "react";
import MultiFileUpload from "./MultipleFileUpload";
import CustomButton from "./Button";

function SingleFileUpload({ getVideoDuration, onFileChange, currentImage }) {
  const [filesArr, setFilesArr] = useState([]);

  const handleFileChange = (newFilesArr) => {
    if (newFilesArr.length > 0) {
      const result = newFilesArr[0];
      // Handle the result, you can use it as needed
      console.log(result);
      setFilesArr(newFilesArr);
      onFileChange(result);
    }
  };

  return (
    <div className="position-relative">
      <MultiFileUpload
        onFileChange={handleFileChange}
        acceptImage={true}
        multiple={false}
      />
    </div>
  );
}

export default SingleFileUpload;
