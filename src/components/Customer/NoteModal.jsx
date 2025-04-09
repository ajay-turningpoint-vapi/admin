import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import axios from "axios";
import { url } from "../../services/url.service";
import toast from "react-hot-toast";

const NoteModal = ({ isOpen, onClose, onSave, data }) => {
  const [noteText, setNoteText] = useState("");
  const [noteImage, setNoteImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      resetState();
    }
  }, [isOpen]);

  const handleImageUpload = async (file) => {
    if (!file) {
      toast.error("No file selected.");
      return;
    }

    // Validate file type & size
    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error("File size must be less than 2MB.");
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("images", file);

      console.log("Uploading image...");
      const response = await axios.post(`${url}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const [generatedUrl] = response.data;
      setNoteImage(generatedUrl);
      toast.success("Image uploaded successfully!");
    } catch (error) {
      toast.error("Error uploading image. Please try again.");
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      handleImageUpload(file);
    }
  };

  const handleSave = () => {
    if (!noteText.trim()) {
      toast.error("Note text cannot be empty.");
      return;
    }

    onSave({ text: noteText, image: noteImage });
    resetState();
    onClose();
  };

  const resetState = () => {
    setNoteText("");
    setNoteImage(null);
    setImagePreview(null);
    setIsUploading(false);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        resetState();
        onClose();
      }}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>Add Note for ({data?.userObj?.name})</DialogTitle>
      <DialogContent>
        {/* Show Existing Notes Table */}
        {data?.note?.length > 0 && (
          <Table style={{ marginBottom: "16px" }}>
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Note Text</b>
                </TableCell>
                <TableCell>
                  <b>Image</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.note.map((note, index) => (
                <TableRow key={index}>
                  <TableCell>{note.text}</TableCell>
                  <TableCell>
                    {note.image ? (
                      <a
                        href={note.image}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={note.image}
                          alt="Note"
                          style={{
                            width: 60,
                            height: 60,
                            objectFit: "cover",
                            borderRadius: 5,
                          }}
                        />
                      </a>
                    ) : (
                      "No Image"
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {/* New Note Input */}
        <TextField
          label="Note Text"
          fullWidth
          multiline
          rows={4}
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          margin="normal"
        />
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "100%",
              objectFit: "contain",
              borderRadius: 5,
              marginTop: 10,
            }}
          />
        )}
        {isUploading && <h4 style={{ color: "gray" }}>Uploading...</h4>}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            resetState();
            onClose();
          }}
          color="secondary"
          disabled={isUploading}
        >
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary" disabled={isUploading}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NoteModal;
