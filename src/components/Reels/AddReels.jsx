import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  CONTESTAdd,
  CONTESTUpdate,
  SetCONTESTObj,
} from "../../redux/actions/Contest/Contest.actions";
import { ReelsAdd, ReelsUpdate } from "../../redux/actions/Reels/reels.actions";
import { toastError } from "../../utils/toastUtils";
import CustomButton from "../Utility/Button";
import { DashboardBox } from "../Utility/DashboardBox";
import FileUpload from "../Utility/FileUpload";
import MultiFileUpload from "../Utility/MultipleFileUpload";

const AddReels = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageStr, setImageStr] = useState("");
  const [isUpdateContest, setIsUpdateContest] = useState(false);
  const [prevImage, setPrevImage] = useState("");
  const reelsObj = useSelector((state) => state.reels.reelsObj);
  const [disableSubmitButton, setDisableSubmitButton] = useState(false);
  const [isVideo, setIsVideo] = useState(false);
  const [filesArr, setFilesArr] = useState([]);

  const handleAddTimeOut = (value, index) => {
    let tempArr = filesArr;
    tempArr[index].displayLikeAfter = value;

    setFilesArr([...tempArr]);
  };

  const handleAddPoints = (value, index) => {
    let tempArr = filesArr;
    tempArr[index].points = value;

    setFilesArr([...tempArr]);
  };

  const handleDeleteItem = (index) => {
    setFilesArr([...filesArr.filter((el, i) => i != index)]);
  };

  const handleFileChange = (event) => {
    console.log(event, "ASDASD");
    setFilesArr([
      ...event.map((el) =>
        `${el.base64}`.includes("video")
          ? { ...el, isVideo: true, displayLikeAfter: 0, points: 0 }
          : { ...el, isVideo: false, displayLikeAfter: 0, points: 0 }
      ),
    ]);
  };

  useEffect(() => {
    if (filesArr) {
      console.log(filesArr, "filesArr");
    }
  }, [filesArr]);

  useEffect(() => {
    if (reelsObj) {
      setName(reelsObj.name);
      setDescription(reelsObj.description);
      setIsUpdateContest(true);
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
    //   dispatch(ReelsUpdate(obj, reelsObj._id));
    // } else {
    dispatch(ReelsAdd(filesArr));
    // }
    navigate(-1);
  };

  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <h5 className="blue-1 mb-4"> Add New Reel</h5>
          <form action="#" className="form">
            {/* Multiple Coupon Create */}

            <div className="row">
              <div className="col-12 col-md-8 mb-0">
                <DashboardBox>
                  <div className="row">
                    <h5 className="blue-1 mb-4">Reel Information</h5>
                    {/* <div className="col-md-12">
                      <label>
                        Name <span className="red">*</span>
                      </label>
                      <input value={name} onChange={(event) => setName(event.target.value)} type="text" className="form-control" />
                    </div>
                    <div className="col-md-12">
                      <label>
                        Description <span className="red">*</span>
                      </label>
                      <input value={description} onChange={(event) => setDescription(event.target.value)} type="text" className="form-control" />
                    </div> */}

                    <div className="col-md-6 mb-3">
                      <label className="mb-2">
                        Image/Video {isVideo ? "Video" : "Image"}
                        <span className="red">*</span>
                      </label>
                      <MultiFileUpload
                        onFileChange={handleFileChange}
                        getVideoDuration={true}
                        acceptImage={true}
                        multiple={true}
                      />
                    </div>

                    <hr />

                    {filesArr &&
                      filesArr.length > 0 &&
                      filesArr.map((el, index) => {
                        return (
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
                                <button
                                  className="ms-auto col-1"
                                  style={{
                                    border: "none",
                                    outline: "none",
                                    backgroundColor: "white",
                                  }}
                                  onClick={() => handleDeleteItem(index)}
                                >
                                  x
                                </button>
                                <div className="row d-flex justify-content-between">
                                  <div className="col-5">
                                    <div className="row">
                                      <label htmlFor="">
                                        Enter Time in seconds to display like
                                        button after ({el?.link?.name})
                                      </label>
                                      <input
                                        className="border rounded me-3 py-2"
                                        type={"number"}
                                        onChange={(e) =>
                                          handleAddTimeOut(
                                            e.target.value,
                                            index
                                          )
                                        }
                                        value={el?.displayLikeAfter}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-5">
                                    <div className="row">
                                      <label htmlFor="">Points</label>
                                      <input
                                        className="border rounded me-3 py-2"
                                        type={"number"}
                                        onChange={(e) =>
                                          handleAddPoints(e.target.value, index)
                                        }
                                        value={el?.points}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}

                    <div className="col-12 mt-2">
                      <CustomButton
                        btntype="button"
                        ClickEvent={handleSubmit}
                        isBtn
                        iconName="fa-solid fa-check"
                        btnName={"Add New "}
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

export default AddReels;
