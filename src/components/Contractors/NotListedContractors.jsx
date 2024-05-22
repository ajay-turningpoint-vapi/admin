import * as React from "react";
import Card from "@mui/material/Card";
import { notListedContractors } from "../../services/users.service";
import DataTable from "react-data-table-component";
import CustomButton from "../Utility/Button";

export default function NotListedContractors() {
  const [state, setState] = React.useState();
  const fetchData = async () => {
    try {
      const response = await notListedContractors();

      setState(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  React.useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      name: "ID",
      cell: (row, index) => <p>{index + 1}</p>,
      sortable: true,
      width: "15%",
    },
    {
      name: "NAME",
      cell: (row) => <p>{row.name}</p>,
      width: "30%",
    },
    {
      name: "Phone",
      cell: (row) => <p>{row.phone}</p>,
      width: "30%",
    },
    {
      name: "Carpenter Name",
      cell: (row) => <p>{row.givenName}</p>,
      width: "30%",
    },
  ];

  return (
    <div
      className="dashboard-table dashboard-box"
      style={{ maxWidth: "800px", marginLeft: "20px" }}
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
            btnName={"Not Listed Contractors"}
            pillActive={true}
          />
        </li>
      </ul>
      <DataTable columns={columns} data={state} pagination></DataTable>
    </div>
  );
}
