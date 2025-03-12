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
  getReelsType,
} from "../../services/reels.service";
import toast from "react-hot-toast";

const Reels = () => {
  const dispatch = useDispatch();
  const reelsArr = useSelector((state) => state.reels?.reels?.data) || [];
  const totalPages =
    useSelector((state) => state.reels?.reels?.totalPages) || 1;
  const [checkedReels, setCheckedReels] = useState({});
  const [reelTypes, setReelTypes] = useState([]);
  // Pagination & Sorting
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [sortBy, setSortBy] = useState("createdAt"); // Default sort column
  const [sortOrder, setSortOrder] = useState("desc"); // Default order
  const [limit, setLimit] = useState(10);
  const [selectedType, setSelectedType] = useState("");
  const currentPlayingVideo = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReelTypes = async () => {
      try {
        const response = await getReelsType();
        console.log("API Response:", response); // Check the response structure

        if (response.status === 200) {
          setReelTypes(response.data.data);
        }
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReelTypes();
  }, []);

  // API Call with Pagination & Sorting
  useEffect(() => {
    let query = `page=${currentPage}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}&reelType=${selectedType}`;
    dispatch(ReelsGet(query));
  }, [dispatch, currentPage, limit, sortBy, sortOrder, selectedType]);

  // Count the number of reels per type
  const typeCounts = useMemo(() => {
    console.log("ReelTypes inside useMemo:", reelTypes);

    const totalCount = reelTypes.reduce((sum, reel) => sum + reel.count, 0);

    return [{ type: "All", count: totalCount }, ...reelTypes];
  }, [reelTypes]);

  // Filter reels based on selected type
  const filteredReels = useMemo(() => {
    return selectedType === ""
      ? reelsArr
      : reelsArr.filter((reel) => reel.type === selectedType);
  }, [selectedType, reelsArr]);

  const handleTypeClick = (type) => {
    if (type === "All") {
      setSelectedType("");
    } else {
      setSelectedType(type);
    }
  };

  const handleEdit = (row) => {
    console.log("Row Data:", row);
    dispatch(SetReelsObj(row));
  };

  const handleVideoPlay = (id) => {
    if (currentPlayingVideo.current && currentPlayingVideo.current !== id) {
      const videoElement = document.getElementById(currentPlayingVideo.current);
      if (videoElement) videoElement.pause();
    }
    currentPlayingVideo.current = id;
  };

  const handleDeleteReels = async (reelId = null) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete the selected reels?"
    );
    if (!isConfirmed) return;

    try {
      let selectedReels = reelId
        ? [{ _id: reelId }]
        : filteredReels.filter((el) => checkedReels[el._id]);
      if (selectedReels.length === 0) {
        toastError("No reels selected for deletion.");
        return;
      }

      const { data: res } = await deleteMultipleReels({
        reelArr: selectedReels,
      });
      if (res.success) {
        toastSuccess(res.message);
        dispatch(
          ReelsGet(
            `page=${currentPage}&limit=${pageSize}&sortBy=${sortBy}&sortOrder=${sortOrder}`
          )
        );
      }
    } catch (err) {
      toastError("Error deleting reels. Please try again.");
      console.error("Delete Error:", err);
    }
  };

  const handleCheckReels = (id) => {
    setCheckedReels((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSort = (column) => {
    const order =
      sortBy === column.selector && sortOrder === "asc" ? "desc" : "asc";
    setSortBy(column.selector);
    setSortOrder(order);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleRowsPerPageChange = (newLimit) => {
    setLimit(newLimit);
    setCurrentPage(1);
  };

  const contestColumns = useMemo(
    () => [
      {
        name: "SL",
        cell: (row, index) => <p>{index + 1}</p>,
        sortable: false,
        width: "5%",
      },
      {
        name: "Points",
        selector: "points",
        cell: (row) => row?.points || "N.A.",
        sortable: true,
        width: "10%",
        sortField: "points",
      },
      {
        name: "Type",
        cell: (row) => row?.type || "N.A.",
        width: "15%",
      },
      {
        name: "Total Likes",
        selector: "likeCount",
        cell: (row) => row?.likeCount || 0,
        sortable: true,
        width: "25%",
        sortField: "totalLikes",
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
    [filteredReels, checkedReels]
  );

  if (loading) return <p>Loading...</p>;

  return (
    <main>
      <section className="product-category" style={{ minHeight: "75vh" }}>
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-12">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <h5 className="blue-1 m-0">Reels List</h5>
                <div className="d-flex gap-3">
                  <CustomButton
                    isLink
                    iconName="fa-solid fa-plus"
                    btnName="ADD NEW REEL"
                    path="/Reels/add"
                  />
                </div>
              </div>

              <div className="d-flex flex-wrap gap-3 mb-3">
                {typeCounts.map(({ type, count }) => (
                  <button
                    key={type}
                    className={`btn rounded-pill ${
                      selectedType === "" && type === "All"
                        ? "btn-primary"
                        : selectedType === type
                        ? "btn-primary"
                        : "btn-dark"
                    } text-white px-4 py-2`}
                    onClick={() => handleTypeClick(type)}
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
                  paginationTotalRows={totalPages * limit} // Adjusted for API response
                  onChangePage={handlePageChange}
                  paginationPerPage={limit}
                  onChangeRowsPerPage={handleRowsPerPageChange}
                  sortServer
                  onSort={handleSort}
                  paginationComponentOptions={{ noRowsPerPage: false }}
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
