import React, { useEffect, useState } from "react";
import { storage, firestore } from "../../firebase_conf";
import { Card, Grid, Container, Image } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { collection, doc, deleteDoc, onSnapshot } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../Components/MemoryCard/MemoryCard.css";
import { ImLocation } from "react-icons/im";
import { MdDateRange } from "react-icons/md";

const MemoryCard = () => {
  const [formdata, setFormdata] = useState([]);
  const [notedata, setNotedate] = useState({});
  const [loading, setLoading] = useState(false);

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

  return (
    // card components to fetch the data from database

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
                      }}
                    >
                      {cardItem.Title}
                      <br />
                    </Card.Header>
                    <Card.Meta
                      style={{
                        marginTop: "10px",
                      }}
                    >
                      <span className="date">
                        <MdDateRange /> {cardItem.Date}
                      </span>
                      <br />
                      <span className="location">
                        <ImLocation /> {cardItem.Location}
                      </span>
                    </Card.Meta>
                    <Card.Description>{cardItem.Caption}</Card.Description>
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
