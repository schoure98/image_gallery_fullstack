import './App.css';
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { async } from "@firebase/util";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "./firebase_conf";
import { firestore } from './firebase_conf';
import { v4 } from "uuid";

function App() {
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(firestore, "users");
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [notes, setNotes] = useState([]);

  const result = () => {
    uploadFile();
    alert("Image Uploaded");
  };

  const imagesListRef = ref(storage, "images/");
  
  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        firestore.collection("notes").doc(notes.name).set(image = url);
        //Code for uploading to firestore
        
        //alert(url);
       });
    });
  };

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
          return url;
        });
      });
    });

    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
      console.log(data.docs);
    };
    getUsers();
  }, []);

  return (
    <div className="App">
      {users.map((user) => {
        return(
          <div>
            {" "}
            <h1> Name: {user.name}</h1>
            <h1> Age: {user.age}</h1> 
          </div>
        );
      })}
      <input
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />
      <button onClick={result}> Upload Image</button>
      {imageUrls.map((url) => {
        return <img src={url} />;
      })}
    </div>
  );
}

export default App;
