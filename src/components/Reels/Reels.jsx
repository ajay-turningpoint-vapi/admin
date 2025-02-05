import React, { useEffect, useMemo, useRef, useState } from "react";
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

// const Reels = () => {
//   const dispatch = useDispatch();
//   const reelsArr = useSelector((state) => state.reels?.reels?.data) || [];
//   const totalPages =
//     useSelector((state) => state.reels?.reels?.totalPages) || 1;

//   console.log("reelsArr", reelsArr, "totalPages", totalPages);

//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize] = useState(10);
//   const [displayDeleteButton, setDisplayDeleteButton] = useState(false);
//   const currentPlayingVideo = useRef(null);

//   useEffect(() => {
//     let query = `page=${currentPage}`;
//     dispatch(ReelsGet(query));
//   }, [dispatch, currentPage]);

//   const handleEdit = (row) => {
//     dispatch(SetReelsObj(row));
//   };

//   const handleVideoPlay = (id) => {
//     if (currentPlayingVideo.current && currentPlayingVideo.current !== id) {
//       const videoElement = document.getElementById(currentPlayingVideo.current);
//       if (videoElement) videoElement.pause();
//     }
//     currentPlayingVideo.current = id;
//   };

//   const handleDeleteReels = async () => {
//     try {
//       const selectedReels = reelsArr.filter((el) => el.checked);
//       const { data: res } = await deleteMultipleReels({
//         reelArr: selectedReels,
//       });
//       if (res.message) {
//         toastSuccess(res.message);
//         dispatch(ReelsGet(currentPage, pageSize));
//       }
//     } catch (err) {
//       toastError(err);
//     }
//   };

//   const handleCheckReels = (row, index, e) => {
//     const updatedReels = reelsArr.map((el) =>
//       el._id === row._id ? { ...el, checked: e.target.checked } : el
//     );
//     setDisplayDeleteButton(updatedReels.some((el) => el.checked));
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const contestColumns = useMemo(
//     () => [
//       {
//         name: "SL",
//         cell: (row, index) => (
//           <input
//             key={index}
//             type="checkbox"
//             checked={row.checked || false}
//             onChange={(e) => handleCheckReels(row, index, e)}
//           />
//         ),
//         sortable: false,
//         width: "5%",
//       },
//       {
//         name: "Points",
//         selector: (row) => row?.points || "N.A.",
//         sortable: true,
//         width: "10%",
//       },
//       {
//         name: "Type",
//         selector: (row) => row?.type || "N.A.",
//         width: "15%",
//       },
//       {
//         name: "Total Likes",
//         selector: (row) => row?.totalLikes || 0,
//         sortable: true,
//         width: "25%",
//       },
//       {
//         name: "Image/Video",
//         width: "20%",
//         cell: (row) => (
//           <div>
//             {row.isVideo ? (
//               <video
//                 id={row._id}
//                 width="220"
//                 height="150"
//                 src={row.fileUrl}
//                 controls
//                 onPlay={() => handleVideoPlay(row._id)}
//               />
//             ) : (
//               <img
//                 height="84px"
//                 width="56px"
//                 alt={row.name}
//                 src={row.fileUrl}
//               />
//             )}
//           </div>
//         ),
//       },
//       {
//         name: "Action",
//         width: "10%",
//         cell: (row) => (
//           <ActionIcon
//             isRedirected
//             onEditClick={() => handleEdit(row)}
//             editPath={`/Reels/edit/${row._id}`}
//             onDeleteClick={() => handleDeleteReels(row._id)}
//             deletePath="/Reels/View"
//             remove
//             edit
//             Uniquekey={row.id}
//           />
//         ),
//       },
//     ],
//     [reelsArr]
//   );

//   return (
//     <main>
//       <section className="product-category" style={{ minHeight: "75vh" }}>
//         <div className="container-fluid p-0">
//           <div className="row">
//             <div className="col-12">
//               <div className="d-flex align-items-center justify-content-between mb-4">
//                 <h5 className="blue-1 m-0">Reels List</h5>
//                 <div className="d-flex gap-3">
//                   {displayDeleteButton && (
//                     <CustomButton
//                       isLink
//                       iconName="fa-solid fa-minus"
//                       btnName="Delete Selected Reels"
//                       path="/Reels/View"
//                       ClickEvent={handleDeleteReels}
//                     />
//                   )}
//                   <CustomButton
//                     isLink
//                     iconName="fa-solid fa-plus"
//                     btnName="ADD NEW REEL"
//                     path="/Reels/add"
//                   />
//                 </div>
//               </div>
//               <DashboardTable>
//                 <DataTable
//                   columns={contestColumns}
//                   data={reelsArr || []}
//                   pagination
//                   paginationServer
//                   paginationTotalRows={totalPages}
//                   onChangePage={handlePageChange}
//                   paginationPerPage={pageSize}
//                   paginationComponentOptions={{ noRowsPerPage: true }}
//                 />
//               </DashboardTable>
//             </div>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// };

const Reels = () => {
  const dispatch = useDispatch();
  const reelsArr = useSelector((state) => state.reels?.reels?.data) || [];
  const totalPages =
    useSelector((state) => state.reels?.reels?.totalPages) || 1;

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [displayDeleteButton, setDisplayDeleteButton] = useState(false);
  const [selectedType, setSelectedType] = useState("All");

  const currentPlayingVideo = useRef(null);

  useEffect(() => {
    let query = `page=${currentPage}`;
    dispatch(ReelsGet(query));
  }, [dispatch, currentPage]);

  // Count the number of reels per type
  const typeCounts = useMemo(() => {
    const counts = reelsArr.reduce((acc, reel) => {
      const type = reel.type || "Others";
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});

    return [
      { type: "All", count: reelsArr.length },
      ...Object.entries(counts).map(([type, count]) => ({ type, count })),
    ];
  }, [reelsArr]);

  // Filter reels based on selected type
  const filteredReels = useMemo(() => {
    return selectedType === "All"
      ? reelsArr
      : reelsArr.filter((reel) => reel.type === selectedType);
  }, [selectedType, reelsArr]);

  const handleEdit = (row) => {
    dispatch(SetReelsObj(row));
  };

  const handleVideoPlay = (id) => {
    if (currentPlayingVideo.current && currentPlayingVideo.current !== id) {
      const videoElement = document.getElementById(currentPlayingVideo.current);
      if (videoElement) videoElement.pause();
    }
    currentPlayingVideo.current = id;
  };

  const handleDeleteReels = async () => {
    const isConfirmed = window.confirm("Are you sure you want to delete the selected reels?");
    if (!isConfirmed) return;
  
    try {
      const selectedReels = filteredReels.filter((el) => el.checked);
      const { data: res } = await deleteMultipleReels({
        reelArr: selectedReels,
      });
  
      if (res.message) {
        toastSuccess(res.message);
        dispatch(ReelsGet(currentPage, pageSize));
      }
    } catch (err) {
      toastError(err);
    }
  };
  

  const handleCheckReels = (row, index, e) => {
    const updatedReels = filteredReels.map((el) =>
      el._id === row._id ? { ...el, checked: e.target.checked } : el
    );
    setDisplayDeleteButton(updatedReels.some((el) => el.checked));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const contestColumns = useMemo(
    () => [
      {
        name: "SL",
        cell: (row, index) => (
          <input
            key={index}
            type="checkbox"
            checked={row.checked || false}
            onChange={(e) => handleCheckReels(row, index, e)}
          />
        ),
        sortable: false,
        width: "5%",
      },
      {
        name: "Points",
        selector: (row) => row?.points || "N.A.",
        sortable: true,
        width: "10%",
      },
      {
        name: "Type",
        selector: (row) => row?.type || "N.A.",
        width: "15%",
      },
      {
        name: "Total Likes",
        selector: (row) => row?.totalLikes || 0,
        sortable: true,
        width: "25%",
      },
      {
        name: "Image/Video",
        width: "20%",
        cell: (row) => (
          <div>
            {row.isVideo ? (
              <video
                id={row._id}
                width="220"
                height="150"
                src={row.fileUrl}
                controls
                onPlay={() => handleVideoPlay(row._id)}
              />
            ) : (
              <img
                height="84px"
                width="56px"
                alt={row.name}
                src={row.fileUrl}
              />
            )}
          </div>
        ),
      },
      {
        name: "Action",
        width: "10%",
        cell: (row) => (
          <ActionIcon
            isRedirected
            onEditClick={() => handleEdit(row)}
            editPath={`/Reels/edit/${row._id}`}
            onDeleteClick={() => handleDeleteReels(row._id)}
            deletePath="/Reels/View"
            remove
            edit
            Uniquekey={row.id}
          />
        ),
      },
    ],
    [filteredReels]
  );

  return (
    <main>
      <section className="product-category" style={{ minHeight: "75vh" }}>
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-12">
              {/* Tabs */}

              <div className="d-flex align-items-center justify-content-between mb-4">
                <h5 className="blue-1 m-0">Reels List</h5>
                <div className="d-flex gap-3">
                  {displayDeleteButton && (
                    <CustomButton
                      isLink
                      iconName="fa-solid fa-minus"
                      btnName="Delete Selected Reels"
                      path="/Reels/View"
                      ClickEvent={handleDeleteReels}
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

              <div className="d-flex gap-3 mb-3">
                {typeCounts.map(({ type, count }) => (
                  <button
                    key={type}
                    className={`btn ${
                      selectedType === type
                        ? "btn-primary"
                        : "btn-outline-primary"
                    }`}
                    onClick={() => setSelectedType(type)}
                  >
                    {type} ({count})
                  </button>
                ))}
              </div>

              <DashboardTable>
                <DataTable
                  columns={contestColumns}
                  data={filteredReels}
                  pagination
                  paginationServer
                  paginationTotalRows={totalPages}
                  onChangePage={handlePageChange}
                  paginationPerPage={pageSize}
                  paginationComponentOptions={{ noRowsPerPage: true }}
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
