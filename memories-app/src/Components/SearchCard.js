import React from "react";
import { useState } from "react";
import "../Components/SearchBar/SearchBar.css";
import { firestore } from "../firebase_conf";
import { doc, getDocs, query, where, collection } from "firebase/firestore";
import { async } from "@firebase/util";
import { Modal, Button, Card, Grid, Container, Image } from "semantic-ui-react";
import { IoMdSearch } from "react-icons/io";
import "../Components/SearchCard.css";
import ViewCard from "../Components/card/ViewCard";

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
  return (
    <div>
      <div className="search-card">
     
          <input
            class="nosubmit"
            id="search_input"
            type="search"
            placeholder="Search..."
            onChange={SearchHandle}
            value={searchdata}
          />
          <IoMdSearch className="icon" onClick={SearchvalueHandle}></IoMdSearch>
        
        <br></br>
        <br></br>
      </div>

      <Container>
      <Card.Group>
        <Grid columns="three" stackable>
          {formdata &&
            formdata.map((cardItem) => (
              <Grid.Column>
                <Card key={cardItem.id}>
                  <Card.Content>
                    <Image
                      src={cardItem.image}
                      size="big"
                      style={{
                        height: "100px",
                        Width: "350px",
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
                      >
                        View
                      </Button>
                      {open && (
                        <ViewCard
                          open={open}
                          setOpen={setOpen}
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
      <div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>
    </Container>
    </div>
  );
};

export default SearchCard;
