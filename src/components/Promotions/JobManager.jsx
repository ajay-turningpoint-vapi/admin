
import { deleteJob, getJobsByPromotionId, pauseJob, resumeJob } from "../../services/job.services.js";
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  Grid,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import toast from "react-hot-toast";
import axios from "axios";
import { url } from "../../services/url.service.js";


const daysOfWeek = [
  { label: "Sun", value: "0" },
  { label: "Mon", value: "1" },
  { label: "Tue", value: "2" },
  { label: "Wed", value: "3" },
  { label: "Thu", value: "4" },
  { label: "Fri", value: "5" },
  { label: "Sat", value: "6" },
];

export default function CronScheduler({ promotionId }) {
  const [frequency, setFrequency] = useState("daily");
  const [minute, setMinute] = useState("0");
  const [hour, setHour] = useState("0");
  const [dayOfMonth, setDayOfMonth] = useState("1");
  const [month, setMonth] = useState("1");
  const [selectedDays, setSelectedDays] = useState([]);
  const [cron, setCron] = useState("* * * * *");
  const [jobName, setJobName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [editJobId, setEditJobId] = useState(null);

  const API_BASE_URL = `${url}`

  const refetchJobs = async () => {
    if (!promotionId?.id) return;
    try {
      const res = await getJobsByPromotionId(promotionId.id);
      setJobs(res.data);
    } catch (err) {
      toast.error("Failed to fetch scheduled jobs");
      console.error(err);
    } finally {
      setLoadingJobs(false);
    }
  };

  useEffect(() => {
    refetchJobs();
  }, [promotionId]);

  useEffect(() => {
    let cronExp = "* * * * *";
    switch (frequency) {
      case "minutely":
        cronExp = "* * * * *";
        break;
      case "every-n-minutes":
        cronExp = `*/${minute} * * * *`;
        break;
      case "hourly":
        cronExp = `${minute} * * * *`;
        break;
      case "every-n-hours":
        cronExp = `${minute} */${hour} * * *`;
        break;
      case "daily":
        cronExp = `${minute} ${hour} * * *`;
        break;
      case "weekly":
        cronExp = `${minute} ${hour} * * ${selectedDays.join(",") || "*"}`;
        break;
      case "monthly":
        cronExp = `${minute} ${hour} ${dayOfMonth} * *`;
        break;
      case "yearly":
        cronExp = `${minute} ${hour} ${dayOfMonth} ${month} *`;
        break;
      default:
        cronExp = "* * * * *";
    }
    setCron(cronExp);
  }, [frequency, minute, hour, dayOfMonth, month, selectedDays]);

  const toggleDay = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day].sort()
    );
  };

  const resetForm = () => {
    setJobName("");
    setFrequency("daily");
    setMinute("0");
    setHour("0");
    setDayOfMonth("1");
    setMonth("1");
    setSelectedDays([]);
    setEditJobId(null);
  };

  const handleSaveJob = async () => {
    if (!jobName.trim()) return toast.error("Job name is required");
    if (!promotionId?.id) return toast.error("Promotion ID is missing");

    const payload = {
      name: jobName,
      cron,
      promotionId: promotionId.id,
    };

    try {
      setIsSaving(true);
      if (editJobId) {
        await axios.put(`${API_BASE_URL}/jobs/${editJobId}`, payload);
        toast.success("Job updated");
      } else {
        await axios.post(`${API_BASE_URL}/jobs`, payload);
        toast.success("Job created");
      }
      refetchJobs();
      resetForm();
    } catch (err) {
      console.error(err);
      toast.error("Error saving job");
    } finally {
      setIsSaving(false);
    }
  };

  const handlePauseResume = async (id, isActive) => {
    try {
      isActive ? await pauseJob(id) : await resumeJob(id);
      toast.success(`Job ${isActive ? "paused" : "resumed"}`);
      refetchJobs();
    } catch (err) {
      toast.error("Failed to update job status");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      await deleteJob(id);
      toast.success("Job deleted");
      refetchJobs();
    } catch (err) {
      toast.error("Failed to delete job");
      console.error(err);
    }
  };

  const handleEdit = (job) => {
    setJobName(job.name);
    setEditJobId(job._id);
    // Optional: parse job.cron and update fields via getFrequencyFromCron()
  };

  return (
    <Box sx={{ p: 3, maxWidth: 500 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Title: {promotionId?.title}
      </Typography>

      <TextField
        fullWidth
        label="Job Name"
        value={jobName}
        onChange={(e) => setJobName(e.target.value)}
        sx={{ mb: 3 }}
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Frequency</InputLabel>
        <Select
          value={frequency}
          label="Frequency"
          onChange={(e) => setFrequency(e.target.value)}
        >
          <MenuItem value="minutely">Every Minute</MenuItem>
          <MenuItem value="every-n-minutes">Every N Minutes</MenuItem>
          <MenuItem value="hourly">Hourly</MenuItem>
          <MenuItem value="every-n-hours">Every N Hours</MenuItem>
          <MenuItem value="daily">Daily</MenuItem>
          <MenuItem value="weekly">Weekly</MenuItem>
          <MenuItem value="monthly">Monthly</MenuItem>
          <MenuItem value="yearly">Yearly</MenuItem>
        </Select>
      </FormControl>

      {(frequency !== "minutely") && (
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Hour"
              type="number"
              inputProps={{ min: 0, max: 23 }}
              value={hour}
              onChange={(e) => setHour(e.target.value)}
              disabled={frequency === "every-n-minutes"}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Minute"
              type="number"
              inputProps={{ min: 0, max: 59 }}
              value={minute}
              onChange={(e) => setMinute(e.target.value)}
            />
          </Grid>
        </Grid>
      )}

      {frequency === "weekly" && (
        <FormGroup row sx={{ mt: 2 }}>
          {daysOfWeek.map((day) => (
            <FormControlLabel
              key={day.value}
              control={
                <Checkbox
                  checked={selectedDays.includes(day.value)}
                  onChange={() => toggleDay(day.value)}
                />
              }
              label={day.label}
            />
          ))}
        </FormGroup>
      )}

      {(frequency === "monthly" || frequency === "yearly") && (
        <TextField
          fullWidth
          sx={{ mt: 2 }}
          label="Day of Month"
          type="number"
          inputProps={{ min: 1, max: 31 }}
          value={dayOfMonth}
          onChange={(e) => setDayOfMonth(e.target.value)}
        />
      )}

      {frequency === "yearly" && (
        <TextField
          fullWidth
          sx={{ mt: 2 }}
          label="Month"
          type="number"
          inputProps={{ min: 1, max: 12 }}
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />
      )}

      <Typography sx={{ mt: 3 }}>
        <strong>Cron Expression:</strong> <code>{cron}</code>
      </Typography>

      <Button
        variant="contained"
        sx={{ mt: 3 }}
        fullWidth
        onClick={handleSaveJob}
        disabled={isSaving}
      >
        {isSaving ? "Saving..." : editJobId ? "Update Job" : "Save Job"}
      </Button>

      {loadingJobs ? (
        <Typography sx={{ mt: 4 }}>Loading scheduled jobs...</Typography>
      ) : (
        <>
          <Typography sx={{ mt: 4 }} variant="h6">
            Scheduled Jobs
          </Typography>
          {jobs.length === 0 ? (
            <Typography>No jobs scheduled yet.</Typography>
          ) : (
            jobs.map((job) => (
              <Box
                key={job._id}
                sx={{
                  mt: 2,
                  p: 2,
                  border: "1px solid #ccc",
                  borderRadius: 2,
                }}
              >
                <Typography variant="subtitle1">
                  <strong>Name:</strong> {job.name}
                </Typography>
                <Typography>
                  <strong>Cron:</strong> {job.cron}
                </Typography>
                <Typography>
                  <strong>Status:</strong>{" "}
                  <span style={{ color: job.isActive ? "green" : "gray" }}>
                    {job.isActive ? "Active" : "Paused"}
                  </span>
                </Typography>
                <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
                  <Button
                    onClick={() => handlePauseResume(job._id, job.isActive)}
                    variant="contained"
                    color={job.isActive ? "warning" : "success"}
                  >
                    {job.isActive ? "Pause" : "Resume"}
                  </Button>
                  <Button
                    onClick={() => handleEdit(job)}
                    variant="contained"
                    color="info"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(job._id)}
                    variant="contained"
                    color="error"
                  >
                    Delete
                  </Button>
                </Box>
              </Box>
            ))
          )}
        </>
      )}
    </Box>
  );
}
