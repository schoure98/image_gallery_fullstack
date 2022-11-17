import React, { useState } from "react";
import "./InputMemoryForm.css";
import ImageUpload from "./ImageUpload";
import { storage, firestore } from "../../firebase_conf";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "../../Pages/Home/HomePage";
import {
  useNavigate,
} from 'react-router-dom';

function InputMemoryForm() {
  const navigate = useNavigate();
  const [formData, setFromData] = useState({
    Title: "",
    Location: "",
    Date: "",
    Caption: "",
    image: null,
  });
  const [image, setImage] = useState();

  function HandleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setFromData((prev) => {
      return { ...prev, [name]: value };
    });
  }
  const showToastMessage = () => {
    toast.success("Success Notification !", {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const CancelForm = () => {
    // 👇️ navigate programmatically
    navigate('/');
  };
  function NoteUpload(e) {
    e.preventDefault();

    console.log("start of Image upload");
    console.log(image);
    // async magic goes here...
    if (image.name === null) {
      console.error(`not an image, the image file is a ${typeof image.name}`);
    }
    //Uploading image into storage.
    const storageRef = ref(storage, `/images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        let progress;
        progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
      },
      (err) => {
        console.log(err);
      },
      async () => {
        const imagefile = ref(storage, `/images/${image.name}`);
        getDownloadURL(imagefile).then((imageUrl) => {
          setDoc(doc(firestore, "NotesData", formData.Title), {
            Title: formData.Title,
            Location: formData.Location,
            Date: formData.Date,
            Caption: formData.Caption,
            image: imageUrl,
          });
          toast.success("Successly Uploaded !", {
            position: toast.POSITION.TOP_RIGHT,
          });
          console.log("Setting setDoc");
        });

        // rest form
        setFromData({
          Title: "",
          Location: "",
          Date: "",
          Caption: "",
          image: null,
        });
        setImage(null);
      }
    );
  }
  return (
    <div className="user-note-collection-main">
      <div className="container" id="container">
        <div className="form-container collection-container">
          <form action="#">
            <input
              type="text"
              onChange={HandleChange}
              placeholder="Title"
              name="Title"
              value={formData.Title}
            ></input>
            <input
              type="text"
              onChange={HandleChange}
              placeholder="location"
              name="Location"
              value={formData.Location}
            ></input>
            <input
              type="date"
              onChange={HandleChange}
              placeholder="date"
              name="Date"
              value={formData.Date}
            ></input>
            <input
              type="text"
              onChange={HandleChange}
              placeholder="Caption"
              name="Caption"
              value={formData.Caption}
            ></input>
            <button style={{ marginTop: "10px" }} onClick={NoteUpload}>
              {" "}
              Submit
            </button>
            <button style={{ marginTop: "10px" }} 
            onClick={CancelForm}>
              {" "}
              Cancel
            </button>

          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-right">
              <ImageUpload image={image} setImage={setImage} />
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InputMemoryForm;