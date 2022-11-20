import React, { useState } from "react";
import "./UserNotes.css";
import ImageUpload from "./ImageUpload";
import { storage } from "./firebase_conf";
import { firestore } from "./firebase_conf";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

function UsersCollectionRef() {
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
    console.log(name, value);
    setFromData((prev) => {
      return { ...prev, [name]: value };
    });
  }

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
      () => {
        const imagefile = ref(storage, `/images/${image.name}`);
        getDownloadURL(imagefile).then((imageUrl) => {
          setDoc(doc(firestore, "NotesData", formData.Title), {
            Title: formData.Title,
            Location: formData.Location,
            Date: formData.Date,
            Caption: formData.Caption,
            image: imageUrl,
          });
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
        window.location.reload();
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
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-right">
              <ImageUpload image={image} setImage={setImage} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UsersCollectionRef;
