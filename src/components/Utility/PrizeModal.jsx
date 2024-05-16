import React from "react";

import Button from "@material-ui/core/Button";

import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Dialog, DialogActions } from "@mui/material";
import DataTable from "react-data-table-component";

export default function PrizeModal({ data }) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
console.log(data);
  const contest_columns = [
    {
      name: "Rank",
      selector: (row, index) => row.rank,
      sortable: true,
      width: "10%",
    },
    {
      name: "Image",
      grow: 0,
      width: "20%",
      cell: (row) => (
        <img height="90px" width="90px" alt={row.name} src={row.image} />
      ),
    },
    {
      name: "Name",
      selector: (row) => row.name,
      width: "20%",
    },
    {
      name: "Description",
      selector: (row) => row.description,
      width: "20%",
    },
  ];
  return (
    <React.Fragment>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
        style={{ marginRight: "15px" }}
      >
        Prizes
      </Button>
      <Dialog
        fullWidth={true}
        maxWidth={"md"}
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">Prizes List</DialogTitle>
        <DialogContent>
          <DataTable
            paginationPerPage={10}
            columns={contest_columns}
            data={data && data.length > 0 ? data : []}
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
