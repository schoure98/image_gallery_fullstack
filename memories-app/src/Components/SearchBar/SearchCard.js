import React from "react";
import { useState } from "react";
import { firestore } from "../../firebase_conf";
import { Button, Card, Grid, Container, Image } from "semantic-ui-react";
import { IoMdSearch } from "react-icons/io";
import "./SearchCard.css";
import ViewCard from "../Viewcard/ViewCard";
import Autocomplete from "react-google-autocomplete";
import { doc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getDocs,
  query,
  where,
  collection,
  deleteDoc,
  updateDoc,
  setDoc,
} from "firebase/firestore";

const SearchCard = () => {
  const [searchdata, setSearchdata] = useState();
  const [formdata, setFormdata] = useState([]);
  const [open, setOpen] = useState(false);
  const [notedata, setNotedate] = useState({});

  // function to view memory card with all details
  const handleview = (cardItem) => {
    setOpen(true);
    setNotedate(cardItem);
  };

  // function to search memories with location
  const SearchvalueHandle = async (e) => {
    e.preventDefault();
    console.log("Searching the place");
    console.log(searchdata);
    const docRef = collection(firestore, "NotesData");
    const q = query(docRef, where("Location", "==", `${searchdata}`)); // query to find document for particular search location
    try {
      const doc = await getDocs(q);
      let CardList = [];
      doc.forEach((doc) => {
        CardList.push(doc.data());
        console.log("document data:", doc.data());
      });
      setFormdata(CardList);
    } catch (e) {
      console.log("Error", e);
    }
  };
  // function for deletion function 
  const deleteHandle = async (id, Title) => {
    if (window.confirm("Are you sure to Delete the Card ?")) {
      try {
        setOpen(false);
        await deleteDoc(doc(firestore, "NotesData", Title));
        setFormdata(formdata.filter((notedata) => notedata.id !== id));
      } catch (err) {
        console.log(err);
      }
    }
  };

  // updating Card
  const updateHandle = async (id, updateFormData, image, Title) => {
    console.log(updateFormData);
    if (window.confirm("Are you sure to Update the Card ?")) {
      try {
        setOpen(false);
        await deleteDoc(doc(firestore, "NotesData", Title));
        setFormdata(formdata.filter((notedata) => notedata.id !== id));
      } catch (err) {
        console.log(err);
      }
    }
    setDoc(
      doc(firestore, "NotesData", updateFormData.Title), // function to store all data into firebase firestore by assigning the document name with respect to memories title.
      {
        Title: updateFormData.Title,
        Location: updateFormData.Location,
        Date: updateFormData.Date,
        Caption: updateFormData.Caption,
        image: image,
      }
    );
    toast.success(
      "Successfully Updated !", //Receive successfully uploaded message
      {
        position: toast.POSITION.TOP_RIGHT,
      }
    );
    console.log("updated setDoc");
  };
  return (
    <div>
      <div className="form">
        <Autocomplete
          className="Searchinput"
          onPlaceSelected={(place) => {
            setSearchdata(place.formatted_address); // set Location suggestion that appeared automatically
          }}
          types={["(cities)"]}
          componentRestrictions={{ country: "us" }}
        />
        <IoMdSearch className="icon" onClick={SearchvalueHandle}></IoMdSearch>
      </div>
      <br></br>
      <div className="cardDisplay">
        <Container>
          <Card.Group>
            <Grid columns="three" stackable>
              {formdata &&
                formdata.map((cardItem) => (
                  <Grid.Column>
                    <Card
                      key={cardItem.id}
                      style={{ width: "60rem", height: "auto" }}
                    >
                      <Card.Content>
                        <Image
                          src={cardItem.image}
                          size="large"
                          style={{
                            height: "150px",
                            Width: "150px",
                            borderRadius: "0%",
                          }}
                        />
                        <Card.Header
                          style={{
                            marginTop: "10px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {cardItem.Title}
                        </Card.Header>
                      </Card.Content>
                      <Card.Content extra>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Button
                            color="purple"
                            onClick={() => handleview(cardItem)}
                            handleDelete={deleteHandle}
                            {...notedata}
                          >
                            View
                          </Button>
                          {open && (
                            <ViewCard
                              open={open}
                              setOpen={setOpen}
                              handleDelete={deleteHandle}
                              handleUpdate={updateHandle}
                              {...notedata}
                            />
                          )}
                          <br></br>
                        </div>
                      </Card.Content>
                    </Card>
                  </Grid.Column>
                ))}
            </Grid>
          </Card.Group>
        </Container>
      </div>
    </div>
  );
};

export default SearchCard;
