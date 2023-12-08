import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import { CONTESTAdd, CONTESTUpdate, SetCONTESTObj } from "../../redux/actions/Contest/Contest.actions";
import CustomButton from "../Utility/Button";
import { generalModelStatuses } from "../Utility/constants";
import { DashboardBox } from "../Utility/DashboardBox";
import FileUpload from "../Utility/FileUpload";
import { generateFilePath } from "../Utility/utils";
import moment from "moment"
import { toastError } from "../../utils/toastUtils";


const AddContest = () => {

  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [imageStr, setImageStr] = useState("");
  const [points, setPoints] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [description, setDescription] = useState("");
  const [rulesArr, setRulesArr] = useState([])
  const [isUpdateContest, setIsUpdateContest] = useState(false);
  const [selectedContestId, setselectedContestId] = useState("");
  const [prevImage, setPrevImage] = useState("");
  const [prizeArr, setPrizeArr] = useState([{ _id: "", name: "", description: "", image: "" }]);
  const contestObj = useSelector((state) => state.contest.ContestObj);

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");


  useEffect(() => {
    if (contestObj) {
      console.log("dfsauidshdusadhasudhasuhasoashdoh")
      setselectedContestId(contestObj._id);
      setName(contestObj.name);
      setSubtitle(contestObj.subtitle);
      setDescription(contestObj.description);
      setPoints(contestObj.points);
      let sdate = moment(contestObj.startDate).format('YYYY-MM-DD');
      let edate = moment(contestObj.endDate).format('YYYY-MM-DD');
      setStartDate(sdate);
      setEndDate(edate);
      setStartTime(contestObj?.startTime);
      setEndTime(contestObj?.endTime);
      setRulesArr(contestObj.rulesArr);
      setPrevImage(contestObj.image);
      setPrizeArr(contestObj?.prizeArr)
      // setSelectedStatus({ value: brandObj.statusInfo, label: brandObj.statusInfo });
      console.log(prizeArr, "prizearrr")
      setIsUpdateContest(true);
    }
    return () => {
      dispatch(SetCONTESTObj(null));
    };
  }, [contestObj]);

  const handleFileSet = (value) => {
    setImageStr(value);
  };

  const handleSubmit = () => {

    if (name == "") {
      toastError("Name cannot be empty");
      return;
    }

    if (points == "") {
      toastError("Points cannot be empty or must be number");
      return;
    }
    if (startDate == "") {
      toastError("start Date cannot be empty");
      return;
    }
    if (endDate == "") {
      toastError("End Date cannot be empty");
      return;
    }
    console.log(endTime, "endTime")

    if (!startTime || startTime == "") {
      toastError("Start Time cannot be empty");
      return;
    }
    if (!endTime || endTime == "") {
      toastError("End Time cannot be empty");
      return;
    }
    if (rulesArr.length == 0) {
      toastError("Rules cannot be empty");
      return
    }

    let image = imageStr ? imageStr : prevImage;

    // if(image == ''){
    //   toastError("Image cannot be empty");
    //   return
    // }

    if (prizeArr.length == 0) {
      toastError("Image cannot be empty");
      return
    }

    if (prizeArr.length > 0) {
      console.log(prizeArr)
      let blankArray = prizeArr.filter(item => item.name == '');
      console.log(blankArray, "djfoidsjfiosdfjisasd")

      if (blankArray.length > 0) {
        toastError("Prize Name cannot be empty");
        return;
      }
    }

    let obj = {
      name,
      subtitle,
      points,
      description,
      startDate,
      endDate,
      startTime,
      endTime,
      rulesArr,
      image,
      prizeArr
    };

    if (isUpdateContest) {
      console.log(selectedContestId)
      dispatch(CONTESTUpdate(obj, selectedContestId));
    } else {
      dispatch(CONTESTAdd(obj));
      setselectedContestId("");
      setName("");
      setSubtitle("");
      setDescription("");
      setPoints("");
      setStartDate(new Date());
      setEndDate(new Date());
      setStartTime("");
      setEndTime("");
      setRulesArr([]);
      setImageStr("");
      setPrizeArr([])
    }


  };

  let handleRulesArrayAdd = () => {
    setRulesArr([...rulesArr, ""])
  }

  let handleChangeRulesArr = (i, e) => {
    let newrulesArr = [...rulesArr];
    newrulesArr[i] = e.target.value;
    setRulesArr(newrulesArr);
  }

  let removeRulesFields = (i) => {
    let newrulesArr = [...rulesArr];
    newrulesArr.splice(i, 1);
    setRulesArr(newrulesArr)
  }

  let handlePrizeArrayAdd = () => {
    setPrizeArr([...prizeArr, { _id: "", name: "", description: "", image: "" }])

  }

  let handleChangePrizeArr = (i, e) => {
    let newprizeArr = [...prizeArr];
    let { name, value } = e.target;
    newprizeArr[i][name] = value;
    setPrizeArr(newprizeArr);
  }



  let removePrizeFields = (i) => {
    let newprizeArr = [...prizeArr];
    newprizeArr.splice(i, 1);
    setPrizeArr(newprizeArr)
  }

  const handlePrizeFileSet = (index, value) => {
    console.log(index, value)
    let newprizeArr = [...prizeArr];
    newprizeArr[index].image = value;
    setPrizeArr(newprizeArr);
  };



  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <h5 className="blue-1 mb-4">{isUpdateContest ? "Update" : "Add New "} Contest</h5>
          <form action="#" className="form">
            {/* Multiple Coupon Create */}

            <div className="row">
              <div className="col-12 col-md-8 mb-0">
                <DashboardBox>
                  <div className="row">
                    <h5 className="blue-1 mb-4">Contest Information</h5>
                    <div className="col-md-12">
                      <label>
                        Name <span className="red">*</span>
                      </label>
                      <input value={name} onChange={(event) => setName(event.target.value)} type="text" className="form-control" />
                    </div>
                    <div className="col-md-12">
                      <label>
                        Subtitle <span className="red">*</span>
                      </label>
                      <input value={subtitle} onChange={(event) => setSubtitle(event.target.value)} type="text" className="form-control" />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="mb-2">
                        Icon <span className="red">*</span>
                      </label>
                      <FileUpload onFileChange={handleFileSet} />
                    </div>
                    <div className="col-md-6">
                      <label>
                        Entry Points <span className="red">*</span>
                      </label>
                      <input value={parseInt(points)} onChange={(event) => setPoints(event.target.value)} type="number" className="form-control" />
                    </div>
                    <div className="col-md-6">
                      <label>
                        Start Date <span className="red">*</span>
                      </label>
                      <input value={startDate} onChange={(event) => setStartDate(event.target.value)} type="date" className="form-control" />
                    </div>
                    <div className="col-md-6">
                      <label>
                        Start Time <span className="red">*</span>
                      </label>
                      <input value={startTime} onChange={(event) => setStartTime(event.target.value)} type="time" className="form-control" />
                    </div>
                    <div className="col-md-6">
                      <label>
                        End Date <span className="red">*</span>
                      </label>
                      <input value={endDate} onChange={(event) => setEndDate(event.target.value)} type="date" className="form-control" />
                    </div>

                    <div className="col-md-6">
                      <label>
                        End Time <span className="red">*</span>
                      </label>
                      <input value={endTime} onChange={(event) => setEndTime(event.target.value)} type="time" className="form-control" />
                    </div>


                    <div className="col-md-12">
                      <label>
                        Description <span className="red">*</span>
                      </label>
                      <textarea className="form-control" onChange={(event) => setDescription(event.target.value)} value={description} ></textarea>
                    </div>
                    <div className="col-md-12">
                      <h6 className="blue-1 my-2">
                        Rules/Important Points
                      </h6>
                      {rulesArr.map((element, index) => (
                        <div className="row" key={index}>
                          <div className="col-md-8">
                            <label>Point {index + 1}  <span className="red">*</span> </label>
                            <input name="value" type="text" value={element || ""} onChange={e => handleChangeRulesArr(index, e)} className="form-control" required />
                          </div>
                          {
                            index ?
                              <div className="col-md-2">
                                <button className="btn btn-danger btn-sm mt-4" type="button" onClick={() => removeRulesFields(index)}><i className="fa-solid fa-trash"> </i> </button>
                              </div>
                              :
                              null
                          }
                        </div>
                      ))}
                    </div>
                    <div className="col-md-4">
                      <button type="button" className="btn btn-secondary btn-sm" onClick={handleRulesArrayAdd}><i className="fa-solid fa-plus"> </i> Add</button>
                    </div>


                    <div className="col-md-12">
                      <h5 className="blue-1 my-2 text-center">
                        Constest Prizes
                      </h5>
                      {prizeArr.map((prize, index) => (
                        <div className="row" key={index}>
                          <div className="col-md-12">
                            <p className="my-2">Rank {index + 1}  </p>
                          </div>
                          <div className="col-md-3">
                            <label>Name  <span className="red">*</span> </label>

                            <input name="name" type="text" value={prize.name} onChange={e => handleChangePrizeArr(index, e)} className="form-control" required />
                          </div>
                          <div className="col-md-9">
                            <label>Description <span className="red">*</span> </label>
                            <input name="description" type="text" value={prize.description} onChange={e => handleChangePrizeArr(index, e)} className="form-control" />
                          </div>

                          <div className="col-md-4">
                            <label>Image</label>
                            <FileUpload onFileChange={e => handlePrizeFileSet(index, e)} name="image" />
                          </div>
                          {
                            index ?
                              <div className="col-md-2">
                                <button className="btn btn-danger btn-sm mt-4" type="button" onClick={() => removePrizeFields(index)}><i className="fa-solid fa-trash"> </i> </button>
                              </div>
                              :
                              null
                          }
                        </div>
                      ))}
                    </div>
                    <div className="col-md-4">
                      <button type="button" className="btn btn-secondary btn-sm" onClick={handlePrizeArrayAdd}><i className="fa-solid fa-plus"> </i> Add</button>
                    </div>

                    <div className="col-12 mt-2">
                      <CustomButton btntype="button" ClickEvent={handleSubmit} isBtn iconName="fa-solid fa-check" btnName={isUpdateContest ? "Update" : "Add New "} />
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
}

export default AddContest;
