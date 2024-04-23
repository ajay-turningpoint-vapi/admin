import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Switch } from "@mui/material";
import ActionIcon from "../Utility/ActionIcon";
import CustomButton from "../Utility/Button";
import SearchBox from "../Utility/SearchBox";
import { DashboardTable } from "../Utility/DashboardBox";
import { useDispatch, useSelector } from "react-redux";
import {
  CONTESTGet,
  SetCONTESTObj,
  CONTESTDelete,
} from "../../redux/actions/Contest/Contest.actions";
import { generateFilePath } from "../Utility/utils";
import {
  ReelsDelete,
  ReelsGet,
  SetReelsObj,
} from "../../redux/actions/Reels/reels.actions";
import { toastError, toastSuccess } from "../Utility/ToastUtils";
import {
  deleteMultipleReels,
  deleteReelsById,
} from "../../services/reels.service";

const Reels = () => {
  const dispatch = useDispatch();
  const reelsArr = useSelector((state) => state.reels.reels);
  useEffect(() => {
    dispatch(ReelsGet());
  }, []);

  const [displayReelArr, setDisplayReelArr] = useState([]);
  const [displayDeleteButton, setDisplayDeleteButton] = useState(false);

  const handleDeleteReels = async () => {
    try {
      let tempArr = displayReelArr.filter((el) => el.checked);

      let { data: res } = await deleteMultipleReels({ reelArr: tempArr });
      if (res.message) {
        toastSuccess(res.message);
        dispatch(ReelsGet());
      }
    } catch (err) {
      toastError(err);
    }
  };

  useEffect(() => {
    if (reelsArr) {
      console.log(reelsArr);
      setDisplayReelArr([...reelsArr]);
    }
  }, [reelsArr]);

  const handleEdit = (row) => {
    dispatch(SetReelsObj(row));
  };

  const handleDelete = (id) => {
    dispatch(ReelsDelete(id));
  };

  useEffect(() => {
    console.log(reelsArr, "reelsArr");
  }, [reelsArr]);

  const handleCheckReels = (row, index, e) => {
    let tempArr = displayReelArr.map((el) => {
      if (row._id == el._id) {
        el.checked = e.target.checked;
      }
      return el;
    });
    if (displayReelArr.some((el) => el.checked)) {
      setDisplayDeleteButton(true);
    } else {
      setDisplayDeleteButton(false);
    }
    setDisplayReelArr([...tempArr]);
  };

  const contest_columns = [
    {
      name: "SL",
      cell: (row, index) => (
        <input
          key={index}
          type="checkbox"
          checked={row.checked}
          onChange={(e) => handleCheckReels(row, index, e)}
        />
      ),
      sortable: true,
      width: "2%",
    },
    // {
    //   name: "ID",
    //   selector: (row, index) => index + 1,
    //   sortable: true,
    //   width: "7%",
    // },
    {
      name: "Points",
      selector: (row) => (row?.points ? row?.points : "N.A."),
      width: "5%",
    },
    {
      name: "Display Like Button After (in seconds)",
      selector: (row) =>
        row?.displayLikeAfter ? `${row?.displayLikeAfter}s` : "N.A.",
      width: "20%",
    },
    {
      name: "Type",
      selector: (row) => (row?.type ? `${row?.type}s` : "N.A."),
      width: "15%",
    },
    {
      name: "Description",
      selector: (row) => (row?.description ? `${row?.description}s` : "N.A."),
      width: "25%",
    },
    {
      name: "Image/Video",
      grow: 0,
      width: "20%",
      cell: (row) => (
        <div>
          {row.isVideo ? (
            <video
              width="220"
              height="150"
              src={row.fileUrl}
              controls
              autoPlay={false}
            ></video>
          ) : (
            // <video source={generateFilePath(row.fileUrl)}></video>
            <img height="84px" width="56px" alt={row.name} src={row.fileUrl} />
          )}
        </div>
      ),
    },
    {
      name: "Action",
      width: "10%",
      cell: (row) => (
        <ActionIcon
          isRedirected={true}
          onEditClick={() => handleEdit(row)}
          editPath={`/Reels/edit/${row._id}`}
          onDeleteClick={() => {
            // const confirmBox = window.confirm(
            //   "Do you really want to delete this Item?"
            // )
            // if (confirmBox === true) {
            //   handleDelete(row._id)
            // }
            handleDelete(row._id);
          }}
          deletePath="/Reels/View"
          remove
          edit
          Uniquekey={row.id}
        />
      ),
    },
  ];

  return (
    <main>
      <section className="product-category" style={{ minHeight: "75vh" }}>
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-12">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <h5 className="blue-1 m-0">Reels List</h5>
                <div className="d-flex gap-3">
                  {displayDeleteButton && (
                    <CustomButton
                      isLink
                      iconName="fa-solid fa-minus"
                      btnName="Delete Seclected Reels"
                      path="/Reels/View"
                      ClickEvent={() => handleDeleteReels()}
                    />
                  )}
                  <CustomButton
                    isLink
                    iconName="fa-solid fa-plus"
                    btnName="ADD NEW REEL"
                    path="/Reels/add"
                  />
                </div>
              </div>
              <DashboardTable>
                <DataTable
                  columns={contest_columns}
                  data={reelsArr && reelsArr.length > 0 ? reelsArr : []}
                  pagination
                />
              </DashboardTable>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Reels;
