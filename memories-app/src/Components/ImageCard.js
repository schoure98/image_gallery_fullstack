import React, { useEffect, useState } from "react";
//import data coming to the posts like import apiData
import apData from '';
import parse from "html-react-parser";

import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

export default function ImageCard({ numberOfPosts }) {
  const [posts, setPosts] = useState([]);
  const columnsPerRow = 3;

  const getPostsData = async () => {
    try {
      await apiData.getPosts(numberOfPosts).then((data) => {
        setPosts(data.json);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getColumnsForRow = () => {
    let posts = posts.map((post, id) => {
      return (
        <Col>
          <Card key={post.id}>
            <Card.Body>
              <Card.Title>{parse(post.title.rendered)}</Card.Title>
              <Card.Img>{parse(post.image.rendered)}</Card.Img>
              <Card.Subtitle>{parse(post.location.rendered)}</Card.Subtitle>
              <Card.Text>{parse(post.caption.rendered)}</Card.Text>
              <Card.Text>{parse(post.date.rendered)}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      );
    });
    return posts;
  };

  useEffect(() => {
    getPostsData();
  });

  return (
    <Container>
      <Row xs={1} md={columnsPerRow}>
        {getColumnsForRow()}
      </Row>
    </Container>
  );
}
