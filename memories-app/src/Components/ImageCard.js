import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import { storage, firestore } from "../firebase_conf";
import { collection, doc, deleteDoc, onSnapshot } from 'firebase/firestore';

import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

export default function ImageCard({ numberOfPosts }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const columnsPerRow = 3;

  // const getPostsData = async () => {
  //   try {
  //     await apiData.getPosts(numberOfPosts).then((data) => {
  //       setPosts(data.json);
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const getColumnsForRow = () => {
  //   let posts = posts && posts.map((post, id) => {
  //     return (
  //       <Col>
  //         <Card key={post.id}>
  //           <Card.Body>
  //             <Card.Title>{parse(post.title.rendered)}</Card.Title>
  //             <Card.Img>{parse(post.image.rendered)}</Card.Img>
  //             <Card.Subtitle>{parse(post.location.rendered)}</Card.Subtitle>
  //             <Card.Text>{parse(post.caption.rendered)}</Card.Text>
  //             <Card.Text>{parse(post.date.rendered)}</Card.Text>
  //           </Card.Body>
  //         </Card>
  //       </Col>
  //     );
  //   });
  // };

  useEffect(() => {
    if(loading){
      const unsub = onSnapshot(collection(firestore, "NotesData"), (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
            list.push({id: doc.id, ...doc.data()})
        });
        setPosts(list);
        setLoading(false);
        },
        (error) => {
            console.log(error);
        }
        );
        return () => {
            unsub();
        };
      }
  }, [posts]);

  let post = {
    Title: "",
    Location: "",
    Date: "",
    Caption: "",
    image: "https://firebasestorage.googleapis.com/v0/b/digital-souvenir.appspot.com/o/images%2FScreen%20Shot%202022-11-15%20at%207.40.56%20PM.png?alt=media&token=2e4d2463-98f7-464e-9087-2061dfeb855c",
    id: 0
  }
  if (posts.length > 0) {
    post = posts[0]
  }

  return (
    <Container>
      <Row xs={1} md={columnsPerRow}>
        {posts && posts.map((post, id) => {
          {console.log(post);}
          <Col>
            <Card key={post.id}>
              <Card.Body>
                <Card.Title>{parse(post.Title)}</Card.Title>
                <Card.Img src={parse(post.image)} />
                <Card.Subtitle>{parse(post.Location)}</Card.Subtitle>
                <Card.Text>{parse(post.Caption)}</Card.Text>
                <Card.Text>{parse(post.Date)}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        })}
      </Row>
    </Container>
  );
}



// {console.log(post)}
// <Card key={post.id}>
//   <Card.Body>
//     <Card.Title>{parse(post.Title)}</Card.Title>
//     <Card.Img src={parse(post.image)} />
//     <Card.Subtitle>{parse(post.Location)}</Card.Subtitle>
//     <Card.Text>{parse(post.Caption)}</Card.Text>
//     <Card.Text>{parse(post.Date)}</Card.Text>
//   </Card.Body>
// </Card>