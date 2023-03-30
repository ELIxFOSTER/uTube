import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import { createNewVideo } from "../../store/videos";
import "./VideoCreateModal.css";

export default function VideoCreateModal() {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [currentStep, setCurrentStep] = useState(1);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [userId, setUserId] = useState(sessionUser?.id);
  const [thumbnail, setThumbnail] = useState(null);
  const [url, setUrl] = useState(null);
  const [errors, setErrors] = useState([]);
  const [fileSelected, setFileSelected] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (currentStep === 1 && (url || fileSelected)) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("thumbnail", thumbnail);
      formData.append("url", url);
      formData.append("user_id", userId);

      const data = await dispatch(createNewVideo(formData));

      if (data.errors) {
        setErrors(data.errors);
      } else {
        setTitle("");
        setDescription("");
        setCategory("");
        setThumbnail(null);
        setUrl(null);
        closeModal();
      }
    }
  };

  if (!sessionUser) {
    return <div>Please login or signup to create!</div>;
  }

  return (
    <div className="upload-page-wrapper">
      <div className="top-upload-container">
        <div>Upload videos</div>
        <div id="x" onClick={closeModal}>
          X
        </div>
      </div>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {currentStep === 1 && (
          <div className="upload-content-container">
            <ul>
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>{" "}
            <div
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files[0];
                if (file.type === "video/mp4") {
                  setUrl(file);
                  setCurrentStep(2);
                } else {
                  alert("Please select an .mp4 file");
                }
              }}
              onDragOver={(e) => {
                e.preventDefault();
              }}
              className="drag-drop-container"
            >
              <div className="upload-icon-container">
                <i
                  className="fa-solid fa-upload"
                  style={{ fontSize: "45px", color: "gray" }}
                  onClick={() =>
                    document.querySelector("input[name=url]").click()
                  }
                ></i>
              </div>
              <div className="upload-text-box">
                <div>Drag and drop video files to upload</div>
                <div>Your videos will be private until you publish them.</div>
              </div>
              <button
                id="select-files-button"
                onClick={() =>
                  document.querySelector("input[name=url]").click()
                }
              >
                SELECT FILES
              </button>
              <input
                name="url"
                type="file"
                accept=".mp4"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file.type === "video/mp4") {
                    setUrl(file);
                    setCurrentStep(2);
                  } else {
                    alert("Please select an .mp4 file");
                  }
                }}
                style={{ display: "none" }}
              />
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <>
            <input
              name="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="title"
              required
            />

            <input
              name="category"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="category"
              required
            />

            <input
              name="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="description"
              required
            />

            <input
              name="thumbnail"
              type="file"
              onChange={(e) => setThumbnail(e.target.files[0])}
            />

            <button type="submit">Create</button>
          </>
        )}
      </form>
      <div>
        <div>
          By submitting your videos to uTube, you acknowledge that you agree to
          uTube's Terms of Service and Community Guidelines.
        </div>
        <div>
          Please be sure not to violate others' copyright or privacy rights.
        </div>
      </div>
    </div>
  );
}
