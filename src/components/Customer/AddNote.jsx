import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";
import { addNotes, updateUserProfileAdmin } from "../../services/users.service";

const AddNote = ({
  open,
  handleClose,
  handleAddNote,
  userId,
  selectedUser,
}) => {
  console.log(selectedUser);

  const [noteText, setNoteText] = useState("");
  const [error, setError] = useState(""); // For input validation
  const [snackbarOpen, setSnackbarOpen] = useState(false); // For showing messages

  const handleChange = (e) => {
    setNoteText(e.target.value);
    setError(""); // Clear error when user starts typing
  };

  const handleSubmit = async () => {
    if (!noteText.trim()) {
      setError("Note cannot be empty!");
      return;
    }
  
    if (noteText.length < 5) {
      setError("Note must be at least 5 characters long.");
      return;
    }
  
    try {
      // Add note
      const response = await addNotes({ text: noteText, userId });
      handleAddNote(response.data);
  
      // Extract userId and dynamic key (either isBlocked or isActive)
      const { userId: selectedUserId, ...rest } = selectedUser;
      const key = Object.keys(rest)[0]; // Get the dynamic key (isBlocked or isActive)
      const value = rest[key]; // Get the corresponding value
  
      // Update user profile with dynamic key
      await updateUserProfileAdmin({ userId: selectedUserId, [key]: value });
  
      setNoteText(""); // Reset input field
      setSnackbarOpen(true); // Show success message
      handleClose(); // Close dialog
    } catch (error) {
      console.error("Error adding note:", error);
      setError("Failed to add note. Please try again.");
    }
  };
  

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontWeight: "bold",
            }}
          >
            ⚠️ It's mandatory to add a note to save new changes!
          </span>
        </DialogTitle>

        <DialogContent>
          <TextField
            label="Enter your note..."
            fullWidth
            margin="dense"
            variant="outlined"
            multiline
            rows={4}
            value={noteText}
            onChange={handleChange}
            error={!!error}
            helperText={error}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            Add Note
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for success message */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
          Note added successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddNote;
