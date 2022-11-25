import React from "react";
import { useState } from "react";
import "../Components/SearchBar/SearchBar.css";
import { firestore } from "../firebase_conf";
import { doc, getDocs, query, where, collection,deleteDoc } from "firebase/firestore";
import { async } from "@firebase/util";
import { Modal, Button, Card, Grid, Container, Image } from "semantic-ui-react";
import { IoMdSearch } from "react-icons/io";
import "../Components/SearchCard.css";
import ViewCard from "../Components/card/ViewCard";
//import { Card } from "react-bootstrap";


const SearchCard = () => {
  const [searchdata, setSearchdata] = useState(null);
  const [searchValue, setSearchValue] = useState(false);
  const [formdata, setFormdata] = useState([]);
  const [open, setOpen] = useState(false);
  const [notedata, setNotedate] = useState({});

  const SearchHandle = (e) => {
    e.preventDefault();
    setSearchdata(e.target.value);
    setSearchValue(false);
  };
  const handleview = (cardItem) => {
    setOpen(true);
    setNotedate(cardItem);
  };
  const SearchvalueHandle = async (e) => {
    e.preventDefault();
    const docRef = collection(firestore, "NotesData");
    const q = query(docRef, where("Location", "==", `${searchdata}`));
    try {
      const doc = await getDocs(q);
      let CardList = [];
      doc.forEach((doc) => {
        CardList.push(doc.data());
        console.log("Cached document data:", doc.data());
      });
      setFormdata(CardList);
    } catch (e) {
      console.log("Error getting cached document:", e);
    }
  };
  const deleteHandle = async (id) => {
    if (window.confirm("Are you sure to Delete the Card ?")) {
      try {
        setOpen(false);
        await deleteDoc(doc(firestore, "NotesData", id));
        setFormdata(formdata.filter((notedata) => notedata.id !== id));
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div>
      <div className="form">
          <input className="nosubmit"
            class="nosubmit"
            id="search_input"
            type="search"
            placeholder="Search..."
            onChange={SearchHandle}
            value={searchdata}
          />
          <IoMdSearch className="icon" onClick={SearchvalueHandle}></IoMdSearch>
      </div>
      <br>
      </br>
      <div className="cardDisplay">
      <Container>
      <Card.Group>
        <Grid columns="three" stackable>
          {formdata &&
            formdata.map((cardItem) => (
              <Grid.Column>
                <Card key={cardItem.id} style={{ width: '60rem', height: 'auto' }}>
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
