import React, { useState } from "react";
import { useEffect } from "react";
import CustomButton from "./Button";

function MultiFileUpload({ onFileChange, acceptImage, returnOriginal, multiple = false }) {
  const [filesArr, setFilesArr] = useState([]);
  const [value, setValue] = useState([]);
  const [filesConversionToJSONCompleted, setFilesConversionToJSONCompleted] = useState(false);
  const getBase64 = (file, cb) => {

    return new Promise((resolve, reject) => {

      if (!file) {
        resolve(null)
      }

      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        resolve(reader.result);
      };
      reader.onerror = function (error) {
        reject(error)
        // console.log('Error: ', error)
      };


    })
  };
  const handleFileSelection = async (event) => {
    try {

      event.preventDefault();
      let tempArr = [];
      if (event.target.files && event.target.files.length > 0) {
        for (let i = 0; i <= event.target.files.length - 1; i++) {
          const result = await getBase64(event.target.files[i])
          if (result)
            tempArr.push({ link: event.target.files[i], base64: result });
          if (i == (event.target.files.length - 1)) {
            setFilesConversionToJSONCompleted(true)
            setFilesArr([...tempArr])
            setValue("")
          }
          else {
            setFilesConversionToJSONCompleted(false)
            setValue(event.target.files[i])
          }

        }
      }
    } catch (error) {
      console.error(error)

    }
  };

  useEffect(() => {
    if (filesConversionToJSONCompleted) {
      onFileChange(filesArr);

    }
  }, [filesConversionToJSONCompleted, filesArr])




  return (
    <div className="position-relative">
      <input multiple type="file" onChange={(event) => handleFileSelection(event)} className="form-control" accept="image/png, image/gif, image/jpeg,video/mp4,video/x-m4v,video/*" />

      {/* <CustomButton isLink extraClass="position-absolute start-0 top-0 h-100 text-uppercase rounded-0" noIcon btnName="Browse" /> */}
    </div>
  );
}

export default MultiFileUpload;
