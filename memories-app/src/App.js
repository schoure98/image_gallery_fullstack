import { useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';
import { db } from "./firebase_conf";
import { collection, getDocs } from "firebase/firestore";
import { async } from "@firebase/util";

function App() {
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
      console.log(data.docs);

    };
    getUsers();
  }, []);

  return (
    <div className="App">
      <header>Memories - The Digital Souvenir</header>
      {users.map((user) => {
        return(
          <div>
            {" "}
            <h1> Name: {user.name}</h1>
            <h1> Age: {user.age}</h1> 
          </div>
        );
      })}
    </div>
  );
}

export default App;
