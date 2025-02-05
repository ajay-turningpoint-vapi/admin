import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ReelsAdd } from "../../redux/actions/Reels/reels.actions";
import CustomButton from "../Utility/Button";
import { DashboardBox } from "../Utility/DashboardBox";
import MultiFileUpload from "../Utility/MultipleFileUpload";
import { SetCONTESTObj } from "../../redux/actions/Contest/Contest.actions";
import toast from "react-hot-toast";

const AddReels = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isUpdateContest, setIsUpdateContest] = useState(false);
  const reelsObj = useSelector((state) => state.reels.reelsObj);

  const [filesArr, setFilesArr] = useState([]);

  const handleAddTimeOut = (value, index) => {
    let tempArr = [...filesArr];
    tempArr[index].displayLikeAfter = value;
    setFilesArr(tempArr);
  };

  const handleAddPoints = (value, index) => {
    let tempArr = [...filesArr];
    tempArr[index].points = value;
    setFilesArr(tempArr);
  };

  const handleVideoType = (value, index) => {
    let tempArr = [...filesArr];
    tempArr[index].type = value;

    let randomPoints;

    // Check the video type and generate points within the specified range
    switch (value) {
      case "Entertainment":
        randomPoints = Math.floor(Math.random() * (20 - 5 + 1)) + 5; // Range 5-20
        break;
      case "Knowledge Social Media":
        randomPoints = Math.floor(Math.random() * (30 - 10 + 1)) + 10; // Range 10-30
        break;
      case "Knowledge Community Member":
        randomPoints = Math.floor(Math.random() * (100 - 50 + 1)) + 50; // Range 50-100
        break;
      case "Skills Social Media":
        randomPoints = Math.floor(Math.random() * (30 - 10 + 1)) + 10; // Range 10-30
        break;
      case "Skills Community Member":
        randomPoints = Math.floor(Math.random() * (100 - 50 + 1)) + 50; // Range 50-100
        break;
      case "Promotion":
        randomPoints = Math.floor(Math.random() * (100 - 70 + 1)) + 70; // Range 70-100
        break;
      case "Special Event":
        randomPoints = Math.floor(Math.random() * (100 - 70 + 1)) + 70; // Range 70-100
        break;
      default:
        randomPoints = 0; // Default points if no type matches
    }

    // Assign the calculated random points
    tempArr[index].points = randomPoints;

    setFilesArr(tempArr);
  };

  const handleVideoTypeOld = (value, index) => {
    let tempArr = [...filesArr];
    tempArr[index].type = value;
    setFilesArr(tempArr);
  };
  const handleDescription = (value, index) => {
    let tempArr = [...filesArr];
    tempArr[index].description = value;
    setFilesArr(tempArr);
  };
  const handleDeleteItem = (index) => {
    setFilesArr(filesArr.filter((el, i) => i !== index));
  };

  const handleFileChange = (event) => {
    setFilesArr(
      event.map((el) =>
        el.isVideo
          ? {
              ...el,
              displayLikeAfter: 1,
              points: 0,
              type: "Jokes/Comedy Reels",
              description: "test",
            }
          : {
              ...el,
              displayLikeAfter: 1,
              points: 0,
              type: "Jokes/Comedy Reels",
              description: "test",
            }
      )
    );
  };

  useEffect(() => {
    if (reelsObj) {
      setIsUpdateContest(true);
    }
    return () => {
      dispatch(SetCONTESTObj(null));
    };
  }, [reelsObj]);

  const handleSubmit = () => {
    if (filesArr.length === 0) {
      toast.error("Please select the file");
      return;
    }

    // Flag to check if everything is okay
    let allFieldsFilled = true;

    filesArr.forEach((file) => {
      if (
        file.displayLikeAfter === 0 ||
        file.points === 0 ||
        file.type === "" ||
        file.description === ""
      ) {
        toast.error("Please fill in all fields for each file");
        allFieldsFilled = false; // Set flag to false if any field is missing
        return; // Exit the loop if any field is missing
      }
    });

    if (allFieldsFilled) {
      // Dispatch action only if all fields are filled for each file
      dispatch(ReelsAdd(filesArr));

      navigate(-1);
    }
  };

  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <h5 className="blue-1 mb-4"> Add New Reel</h5>
          <form action="#" className="form">
            <div className="row">
              <div className="col-12 col-md-8 mb-0">
                <DashboardBox>
                  <div className="row">
                    <h5 className="blue-1 mb-4">Reel Information</h5>
                    <div className="col-md-6 mb-3">
                      <label className="mb-2">
                        Image/Video{" "}
                        {filesArr.length > 0 && filesArr[0].isVideo
                          ? "Video"
                          : "Image"}
                        <span className="red">*</span>
                      </label>
                      <MultiFileUpload
                        onFileChange={handleFileChange}
                        getVideoDuration={true}
                        acceptImage={false}
                        multiple={true}
                      />
                    </div>
                    <hr />

                    {filesArr &&
                      filesArr.length > 0 &&
                      filesArr.map((el, index) => (
                        <div
                          className="row d-flex"
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            marginLeft: 10,
                          }}
                          key={index}
                        >
                          <div className="col-12">
                            <div className="row">
                             
                              <div className="row d-flex justify-content-between">
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
                                <div className="col-5">
                                  <div className="row">
                                    <label htmlFor="">Video Type</label>
                                    <select
                                      className="border rounded me-3 py-2"
                                      onChange={(e) =>
                                        handleVideoType(e.target.value, index)
                                      }
                                      // value={el?.type}
                                      defaultValue=""
                                    >
                                      <option value="" disabled>
                                        Select Video Type
                                      </option>
                                      <option value="Entertainment">
                                        Entertainment
                                      </option>
                                      <option value="Knowledge Social Media">
                                        Knowledge (Social Media)
                                      </option>
                                      <option value="Knowledge Community Member">
                                        Knowledge (Community Member)
                                      </option>
                                      <option value="Skills Social Media">
                                        Skills (Social Media)
                                      </option>
                                      <option value="Skills Community Member">
                                        Skills (Community Member)
                                      </option>
                                      <option value="Promotion">
                                        Promotion
                                      </option>
                                      <option value="Special Event">
                                        Special Event
                                      </option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

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
