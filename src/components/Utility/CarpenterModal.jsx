import React, { useEffect } from "react";

import Button from "@material-ui/core/Button";

import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Dialog, DialogActions, Slide } from "@mui/material";
import DataTable from "react-data-table-component";
import SendIcon from "@mui/icons-material/Send";
import { getAllContractorsByNameAdmin } from "../../services/users.service";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});
export default function CarpenterModal({ data }) {
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState(null);
  const handleClickOpen = () => {
    setOpen(true);
  };
  console.log(data);
  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = async (data) => {
    try {
      const response = await getAllContractorsByNameAdmin(data);

      setState(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    fetchData(data);
  }, [data]);

  const contest_columns = [
    {
      name: "Id",
      selector: (row, index) => index + 1,
      sortable: true,
      width: "7%",
    },
    {
      name: "Name",
      selector: (row) => row.name,
      width: "15%",
    },
    {
      name: "Role",
      selector: (row) => row.role,
      width: "12%",
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
      width: "12%",
    },
    {
      name: "Email",
      selector: (row) => row.email,
      width: "22%",
    },
    {
      name: "Points",
      selector: (row) => row.points,
      width: "8%",
    },
    {
      name: "Profile",
      selector: (row) =>(row.isActive === true ? "Active" : "Block"),
      width: "10%",
    },
    {
      name: "KYC status",
      selector: (row) => row.kycStatus,
      width: "10%",
    },
  ];
  return (
    <React.Fragment>
      <Button
        startIcon={<SendIcon />}
        color="primary"
        onClick={handleClickOpen}
        style={{ marginRight: "15px" }}
      >
        View Carpenters
      </Button>
      <Dialog
        fullWidth={true}
        maxWidth={"lg"}
        TransitionComponent={Transition}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-description">
          <h6>
            Contractor :{" "}
            <b style={{ color: "#01579b", textTransform: "uppercase" }}>
              {data}
            </b>
          </h6>
        </DialogTitle>
        <DialogContent>
          <DataTable
            paginationPerPage={10}
            columns={contest_columns}
            data={state && state.length > 0 ? state : []}
            pagination
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
