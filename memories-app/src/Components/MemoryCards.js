import React, { useEffect, useState } from "react";
import { storage, firestore } from "../firebase_conf";
import { Modal, Button, Card, Grid, Container, Image } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { collection, doc, deleteDoc, onSnapshot } from "firebase/firestore";
import ViewCard from "./card/ViewCard";
import { async } from "@firebase/util";

const MemoryCard = () => {
  const [formdata, setFormdata] = useState([]);
  const [notedata, setNotedate] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    const DisplayData = onSnapshot(
      collection(firestore, "NotesData"),
      (snapshot) => {
        let CardList = [];
        snapshot.docs.forEach((doc) => {
          CardList.push({ id: doc.id, ...doc.data() });
        });
        setFormdata(CardList);
        setLoading(false);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      DisplayData();
    };
  }, []);

  const handleview = (cardItem) => {
    setOpen(true);
    setNotedate(cardItem);
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
  const handleUpdate = () => {};

  return (
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
                      size="medium"
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
                        color="Green"
                        onClick={() => handleUpdate(cardItem)}
                      >
                        Update
                      </Button>
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
      <div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>
    </Container>
  );
};

export default MemoryCard;
