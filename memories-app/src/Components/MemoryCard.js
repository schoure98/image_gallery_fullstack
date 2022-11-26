import React, { useEffect, useState } from "react";
import { storage, firestore } from "../firebase_conf";
import { Modal, Button, Card, Grid, Container, Image } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { collection, doc, deleteDoc, onSnapshot } from "firebase/firestore";
import { async } from "@firebase/util";


const MemoryCard = () => {
  const [formdata, setFromdata] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [notedata, setNotedate] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const unsub = onSnapshot(
      collection(firestore, "NotesData"),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setFromdata(list);
        setLoading(false);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub();
    };
  }, []);
  const handleDelete = async (id) => {};
  const handleview = (item) => {};
  return (
    <div class="image-grid">
      <Container>
        <Card.Group>
          <Grid columns={3} stackable>
            {formdata &&
              formdata.map((item) => (
                <Grid.Column>
                  <Card key={item.id}>
                    
                      <Image
                        src={item.image}
                        size="medium"
                        style={{
                          height: "150px",
                          Width: "150px",
                          borderRadius: "0%",
                        }}
                      />
                      <Card.Content>
                      <Card.Header style={{ marginTop: "20px" }}>
                        {item.Title}
                      </Card.Header>

                      <Card.Description>{item.Caption}</Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      <div>
                        <Button color="purple" onClick={() => handleview(item)}>
                          View
                        </Button>
                      </div>
                    </Card.Content>
                  </Card>
                </Grid.Column>
              ))}
          </Grid>
        </Card.Group>
      </Container>
    </div>
  );
};

export default MemoryCard;
