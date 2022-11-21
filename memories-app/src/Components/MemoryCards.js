import React, { useEffect, useState } from 'react'
import { storage, firestore } from "../firebase_conf";
import { Modal, Button, Card, Grid, Container, Image  } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { collection, doc, deleteDoc, onSnapshot } from 'firebase/firestore';
import ViewCard from './card/ViewCard';
import { async } from '@firebase/util';


const MemoryCard = () => {
    const [formdata, setFormdata] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [notedata, setNotedate] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        const unsub = onSnapshot(collection(firestore, "NotesData"), (snapshot) => {
            let list = [];
            snapshot.docs.forEach((doc) => {
                list.push({id: doc.id, ...doc.data()})
            });
            setFormdata(list);
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

    const handleview = (item) => {
        setOpen(true);
        setNotedate(item);
    }
    const handleDelete = async(id) => {
        if(window.confirm("Are you sure to delete the memory ?")){
            try{
                setOpen(false);
                await deleteDoc(doc(firestore,"NotesData", id));
                setFormdata(formdata.filter((notedata) => notedata.id !== id));
            }catch (err) {
                console.log(err);
            }
        }
        
    }
    const handleUpdate = () => {

    }
    
  return (
    <Container>
        <Card.Group>
            <Grid columns={3} stackable>
                {formdata && formdata.map((item) => (
                    <Grid.Column>
                        <Card key={item.id}>
                            <Card.Content>
                                <Image 
                                src={item.image}
                                size="medium"
                                style={{
                                    height: "150px",
                                    Width: "150px",
                                    borderRadius: "0%",
                                }}
                                />
                                <Card.Header style={{ marginTop: "40px"}}>
                                    {item.Title}
                                </Card.Header>
                                <Card.Description>{item.Caption}</Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <div>
                                    <Button color="Green"
                                        onClick={() => handleUpdate(item)}
                                    >
                                        Update
                                    </Button>
                                    <Button color="purple"
                                        onClick={() => handleview(item)}
                                    >
                                        View
                                    </Button>
                                    {open && (
                                        <ViewCard
                                            open={open}
                                            setOpen={setOpen}
                                            handleDelete={handleDelete}
                                            {...notedata}
                                        />
                                    )}
                                </div>
                            </Card.Content>

                        </Card>
                    </Grid.Column>
                ))}
            </Grid>
        </Card.Group>
    </Container>
  )
}

export default MemoryCard