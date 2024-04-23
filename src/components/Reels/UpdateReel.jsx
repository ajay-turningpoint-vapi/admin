import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SetCONTESTObj } from "../../redux/actions/Contest/Contest.actions";
import { ReelsAdd, ReelsUpdate } from "../../redux/actions/Reels/reels.actions";
import CustomButton from "../Utility/Button";
import { DashboardBox } from "../Utility/DashboardBox";
import FileUpload from "../Utility/FileUpload";
import MultiFileUpload from "../Utility/MultipleFileUpload";
import { generateFilePath } from "../Utility/utils";
import SingleFileUpload from "../Utility/SingleFileUpload";

const UpdateReel = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isUpdateContest, setIsUpdateContest] = useState(false);
  const reelsObj = useSelector((state) => state.reels.reelsObj);
  const [disableSubmitButton, setDisableSubmitButton] = useState(false);
  const [isVideo, setIsVideo] = useState(false);
  const [displayLikeAfter, setDisplayLikeAfter] = useState(0);
  const [points, setPoints] = useState(0);
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Please Select");
  const [fileUrl, setFileUrl] = useState("");
  const [result, setResult] = useState("");

  const handleFileChange = (value) => {
    console.log(value);
    if (`${value.result}`.includes("video")) {
      setIsVideo(true);
      setFileUrl(value.file);
    } else {
      setIsVideo(false);
      setFileUrl(value.result);
    }
    setResult(value.result);
    // setFileUrl(value.result);
  };

  useEffect(() => {
    if (reelsObj) {
      setDisplayLikeAfter(reelsObj?.displayLikeAfter);
      setPoints(reelsObj?.points);
      setIsVideo(reelsObj?.isVideo);
      setFileUrl(reelsObj?.fileUrl);
      setDescription(reelsObj?.description);
      setType(reelsObj?.type);
      console.log(reelsObj, "reelsObj");
    }
    return () => {
      dispatch(SetCONTESTObj(null));
    };
  }, [reelsObj]);

  // const handleFileSet = (value) => {
  //   if (`${value.result}`.includes("video")) {
  //     if (value.duration != 0 && value.duration > 60) {
  //       setDisableSubmitButton(true)
  //       toastError("Video duration is more than 60 seconds")
  //     } else {
  //       setImageStr(value.result);
  //     }
  //     setIsVideo(true);
  //   }
  //   else {
  //     setIsVideo(false);
  //     setImageStr(value.result);
  //   }
  // };

  const handleSubmit = () => {
    let obj = {
      fileUrl: result,
      points,
      displayLikeAfter,
      isVideo,
      type,
      description,
    };

    dispatch(ReelsUpdate(obj, reelsObj._id));
    // if (name == "") {
    //   toastError("Name cannot be empty !")
    // }
    // if (description == "") {
    //   toastError("Description cannot be empty !")
    // }

    // if (!isUpdateContest) {
    //   if (imageStr == "") {
    //     toastError("Image/Video cannot be empty !")
    //   }
    // }

    // if (isUpdateContest) {
    // } else {
    // }
    // navigate(-1)
  };

  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <h5 className="blue-1 mb-4">Update Reel</h5>
          <form action="#" className="form">
            <div className="row">
              <div className="col-12 col-md-8 mb-0">
                <DashboardBox>
                  <div className="row">
                    <h5 className="blue-1 mb-4">Reel Information</h5>
                    <div className="col-md-6 mb-3">
                      <label className="mb-2">
                        Image/Video {isVideo ? "Video" : "Image"}
                        <span className="red">*</span>
                      </label>

                      <div>
                        {isVideo ? (
                          <>
                            {fileUrl && fileUrl?.name ? (
                              <div className="mb-3">
                                Your selected file is <b>{fileUrl?.name}</b>
                              </div>
                            ) : (
                              <video
                                width="220"
                                height="150"
                                src={fileUrl}
                                controls
                                autoPlay={false}
                              ></video>
                            )}
                          </>
                        ) : (
                          <>
                            {fileUrl ? (
                              <img
                                height="84px"
                                width="56px"
                                alt={"asd"}
                                src={fileUrl}
                              />
                            ) : (
                              <img
                                height="84px"
                                width="56px"
                                alt={"asd"}
                                src={fileUrl}
                              />
                            )}
                          </>
                        )}
                      </div>
                      <SingleFileUpload
                        onFileChange={handleFileChange}
                        getVideoDuration={true}
                      />
                    </div>
                    <hr />
                    <div
                      className="row d-flex"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginLeft: 10,
                      }}
                    >
                      <div className="col-12">
                        <div className="row">
                          <div className="row d-flex justify-content-between">
                            <div className="col-5">
                              <div className="row">
                                <label htmlFor="">
                                  Enter Time in seconds to display like button
                                  after
                                </label>
                                <input
                                  className="border rounded me-3 py-2"
                                  type={"number"}
                                  onChange={(e) =>
                                    setDisplayLikeAfter(e.target.value)
                                  }
                                  value={displayLikeAfter}
                                />
                              </div>
                            </div>
                            <div className="col-5">
                              <div className="row">
                                <label htmlFor="">Points</label>
                                <input
                                  className="border rounded me-3 py-2"
                                  type={"number"}
                                  onChange={(e) => setPoints(e.target.value)}
                                  value={points}
                                />
                              </div>
                            </div>
                            <div className="col-5">
                              <div className="row">
                                <label htmlFor="">Video Type</label>
                                <select
                                  className="border rounded me-3 py-2"
                                  onChange={(e) => setType(e.target.value)}
                                  value={type}
                                >
                                  <option>Jokes/Comedy Reels </option>
                                  <option value="Technical Reels">
                                    Technical Reels
                                  </option>
                                  <option value="Spiritual Reels">
                                    Spiritual Reels
                                  </option>
                                  <option value="Jokes/Comedy Reels">
                                    Jokes/Comedy Reels
                                  </option>
                                  <option value="Lifestyle Reels">
                                    Lifestyle Reels
                                  </option>
                                  <option value="Entertainment Reels">
                                    Entertainment Reels
                                  </option>
                                  <option value="nspiration/Motivational Reels">
                                    Inspiration/Motivational Reels
                                  </option>{" "}
                                  <option value=" Spiritual Reels">
                                    Spiritual Reels
                                  </option>
                                  <option value="DIY/Craft Reels">
                                    DIY/Craft Reels
                                  </option>
                                  <option value="Travel Reels">
                                    Travel Reels
                                  </option>
                                  <option value="Food/Cooking Reels">
                                    Food/Cooking Reels
                                  </option>
                                  <option value="Music/Dance Reels">
                                    Music/Dance Reels
                                  </option>
                                </select>
                              </div>
                            </div>
                            <div className="col-5">
                              <div className="row">
                                <label htmlFor="">Description</label>
                                <input
                                  className="border rounded me-3 py-2"
                                  type={"text"}
                                  onChange={(e) =>
                                    setDescription(e.target.value)
                                  }
                                  value={description}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 mt-2">
                      <CustomButton
                        btntype="button"
                        isDisabled={disableSubmitButton}
                        ClickEvent={handleSubmit}
                        isBtn
                        iconName="fa-solid fa-check"
                        btnName={"Update"}
                      />
                    </div>
                  </div>
                </DashboardBox>
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default UpdateReel;
