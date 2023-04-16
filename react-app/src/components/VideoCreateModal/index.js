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

      if (data) {
        setErrors(data);
      } else {
        setTitle("");
        setDescription("");
        setCategory("");
        setThumbnail(null);
        setUrl(null);
        closeModal();
        history.push('/')
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
            {errors.map((error, idx) => (
              <ul>
                <li key={idx}>{error}</li>
              </ul>
            ))}
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
            <div
              id="onetwo"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "10px",
              }}
            >
              <div>
                By submitting your videos to uTube, you acknowledge that you
                agree to uTube's Terms of Service and Community Guidelines.
              </div>
              <div>
                Please be sure not to violate others' copyright or privacy
                rights.
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="step-two-wrapper">
            <div className="stwo-title-box">
              <label style={{ fontSize: "19px", fontWeight: "600", borderBottom: '1px solid gray', padding: '10px' }}>
                Details
              </label>
              <div>
              {errors.map((error, idx) => (
              <ul>
                <li key={idx}>{error}</li>
              </ul>
            ))}
              </div>
              <input
                name="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                required
              />
            </div>
            <div className="stwo-category-box">
              {/* <label>Category</label> */}
              <input
                name="category"
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Category"
                required
              />
            </div>
            <div className="stwo-description-box">
              {/* <label>Description</label> */}
              <input
                name="description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                required
              />
            </div>
            <div className="stwo-thumbnail-box">
              <label style={{ fontSize: "17px", fontWeight: "600" }}>
                Thumbnail
              </label>
              <div id="select-thumbnail-text">
                Select or upload a picture that shows what's in your video. A
                good thumbnail stands out and draws viewers' attention.
              </div>
              {/* <input
              name="thumbnail"
              type="file"
              onChange={(e) => setThumbnail(e.target.files[0])}
            /> */}
              <button
                id="select-files-button-thumbnail"
                onClick={() =>
                  document.querySelector("input[name=thumbnail]").click()
                }
              >
                <i
                  className="fa-solid fa-file-arrow-up"
                  id="upload-thumbnail-icon"
                ></i>
                <div id="upload-thumbnail-text">Upload thumbnail</div>
              </button>
              <input
                name="thumbnail"
                type="file"
                // onChange={(e) => {
                //   const file = e.target.files[0];
                //   if (file.type === "video/mp4") {
                //     setUrl(file);
                //     setCurrentStep(2);
                //   } else {
                //     alert("Please select an .mp4 file");
                //   }
                // }}
                onChange={(e) => setThumbnail(e.target.files[0])}
                style={{ display: "none" }}
              />
            </div>
            <div className="stwo-create-box">
              <button id='stwo-button' type="submit">Create</button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
