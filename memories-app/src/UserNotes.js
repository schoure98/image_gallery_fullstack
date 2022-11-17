import React, { useState } from "react";
import "./UserNotes.css";
import ImageUpload from "./ImageUpload";
import { storage } from "./firebase_conf";
import { firestore } from "./firebase_conf";
import {
    ref,
    uploadBytesResumable,
    getDownloadURL 
} from "firebase/storage";
//import firebase from "firebase";

function UsersCollectionRef() {
  const db = firestore;
  //const firestorage = storage;

  const [data, setData] = useState({
    Title: "",
    Location: "",
    Date: "",
    Caption: "",
    image: null,
  });

  function HandleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function NoteUpload(e) {
    e.preventDefault();

    //const uploadTask = ref(storage, `noteImages/ ${data.image.name}`).put(`${data.image}`);
    const uploadTask = ref(storage, `noteImages/ ${data.image.name}`).put(`${data.image}`);

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
        storage
          .ref("noteImages")
          .child(data.image.name)
          .getDownloadURL()
          .then((imageUrl) => {
            firestore
              .collection("NotesData")
              .doc(data.name)
              .set({
                Title: data.Title,
                Location: data.Location,
                Date: data.Date,
                Caption: data.Caption,
                image: imageUrl,
              })
              .then(() => {
                setData({
                  Title: "",
                  Location: "",
                  Date: "",
                  Caption: "",
                  image: null,
                });
              });
          });
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
              value={data.Title}
            ></input>
            <input
              type="text"
              onChange={HandleChange}
              placeholder="location"
              name="Location"
              value={data.Location}
            ></input>
            <input
              type="date"
              onChange={HandleChange}
              placeholder="date"
              name="Date"
              value={data.Date}
            ></input>
            <input
              type="text"
              onChange={HandleChange}
              placeholder="Caption"
              name="Caption"
              value={data.Caption}
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
              <ImageUpload setData = {setData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UsersCollectionRef;
