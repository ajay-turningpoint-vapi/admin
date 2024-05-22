import React, { useState } from "react";
import { getAllContractors } from "../../services/users.service";
import DataTable from "react-data-table-component";
import CustomButton from "../Utility/Button";
import CarpenterModal from "../Utility/CarpenterModal";

export default function Contractors() {
  const [state, setState] = React.useState();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const fetchData = async () => {
    try {
      const response = await getAllContractors();

      setState(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  React.useEffect(() => {
    fetchData();
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const columns = [
    {
      name: "ID",
      cell: (row, index) => <p>{index + 1}</p>,
      sortable: true,
      width: "10%",
    },
    {
      name: "NAME",
      cell: (row) => <p>{row.name}</p>,
      width: "22%",
    },

    {
      name: "Business Name",
      cell: (row) => <p>{row.businessName}</p>,
      width: "22%",
    },
    {
      name: "Phone",
      cell: (row) => <p>{row.phone}</p>,
      width: "18%",
    },
    {
      name: "Action",
      width: "28%",
      cell: (row) => {
        return (
          <>
            {isModalOpen && (
              <CarpenterModal
                handleClose={toggleModal}
                data={row.businessName}
              />
            )}
          </>
        );
      },
    },
  ];

  return (
    <div
      className="dashboard-table dashboard-box"
      style={{ maxWidth: "900px", marginLeft: "20px" }}
    >
      <ul
        className="nav nav-pills dashboard-pills justify-content-start"
        id="pills-tab"
        role="tablist"
        style={{ marginBottom: "20px" }}
      >
        <li>
          <CustomButton
            navPills
            btnName={"All Contractors"}
            pillActive={true}
          />
        </li>
      </ul>
      <DataTable columns={columns} data={state} pagination></DataTable>
    </div>
  );
}
