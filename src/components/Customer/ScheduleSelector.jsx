import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment-timezone";
import {
  Button,
  TextField,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Snackbar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const ScheduleSelector = () => {
  const [blockedTimes, setBlockedTimes] = useState([]);
  const [exemptedDates, setExemptedDates] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [newExemptedDate, setNewExemptedDate] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  useEffect(() => {
    axios
      .get("http://localhost:4023/restrictions/")
      .then((response) => {
        setBlockedTimes(response.data.blockedTimes);
        setExemptedDates(response.data.exemptedDates);
      })
      .catch((error) => console.error(error));
  }, []);

  const addBlockedTime = () => {
    if (!startTime || !endTime) {
      setSnackbar({
        open: true,
        message: "Please fill in both start and end times.",
      });
      return;
    }
    const newPeriod = { startTime, endTime };
    setBlockedTimes([...blockedTimes, newPeriod]);
    setStartTime("");
    setEndTime("");
  };

  const submitBlockedTimes = () => {
    axios
      .post("http://localhost:4023/restrictions/", {
        blockedTimes,
        exemptedDates,
      })
      .then((response) => {
        setBlockedTimes(response.data.blockedTimes);
        setSnackbar({
          open: true,
          message: "Restrictions updated successfully.",
        });
      })
      .catch((error) => console.error(error));
  };

  const deleteBlockedTime = (index) => {
    const updatedPeriods = blockedTimes.filter((_, i) => i !== index);
    setBlockedTimes(updatedPeriods);
  };

  const addExemptedDate = () => {
    if (!newExemptedDate) return;
    const updatedExemptedDates = [...exemptedDates, newExemptedDate];
    setExemptedDates(updatedExemptedDates);
    setNewExemptedDate("");
  };

  const deleteExemptedDate = (date) => {
    const updatedExemptedDates = exemptedDates.filter((d) => d !== date);
    setExemptedDates(updatedExemptedDates);
  };

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid black",
        borderRadius: "20px",
        maxWidth: "500px",
        width: "100%",
        margin: "auto",
        backgroundColor: "#fdfbfa",
      }}
    >
      <Typography variant="h5" sx={{ textAlign: "center" }}>
        Time Restrictions
      </Typography>

      <Typography variant="h6">Add Blocked Times</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Start Time"
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="End Time"
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
      </Grid>
      <Button
        variant="contained"
        color="primary"
        onClick={addBlockedTime}
        fullWidth
        style={{ marginTop: "10px" }}
      >
        Add
      </Button>

      <Typography variant="h6" style={{ marginTop: "20px" }}>
        Blocked Times
      </Typography>
      <List>
        {blockedTimes.map((period, index) => (
          <ListItem key={index}>
            <ListItemText primary={`${period.startTime} - ${period.endTime}`} />
            <IconButton edge="end" onClick={() => deleteBlockedTime(index)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>

      <Typography variant="h6" style={{ marginTop: "20px" }}>
        Add Exempted Date
      </Typography>
      <TextField
        label="Exempted Date"
        type="date"
        value={newExemptedDate}
        onChange={(e) => setNewExemptedDate(e.target.value)}
        fullWidth
        InputLabelProps={{ shrink: true }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={addExemptedDate}
        style={{ marginTop: "10px" }}
        fullWidth
      >
        Add
      </Button>

      <Typography variant="h6" style={{ marginTop: "20px" }}>
        Exempted Dates
      </Typography>
      <List>
        {exemptedDates.map((date, index) => (
          <ListItem key={index}>
            <ListItemText primary={date} />
            <IconButton edge="end" onClick={() => deleteExemptedDate(date)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>

      <Button
        variant="contained"
        color="secondary"
        onClick={submitBlockedTimes}
        style={{ marginTop: "10px" }}
        size="large"
        fullWidth
      >
        Submit
      </Button>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ open: false, message: "" })}
        message={snackbar.message}
      />
    </div>
  );
};

export default ScheduleSelector;
