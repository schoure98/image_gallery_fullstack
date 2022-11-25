import React from "react";
import { Modal, Header, Image, Button } from "semantic-ui-react";
import "./ViewCard.css";

const ViewCard = ({
  image,
  Title,
  Location,
  Date,
  Caption,
  setOpen,
  open,
  id,
  handleDelete,
    }) => {
 

  return (
    <Modal
      style={{
        height: "400px",
        marginTop: "8%",
        marginLeft: "20%",
        marginRight: "0%",
      }}
      size={"small"}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>View</Button>}
    >
      <Modal.Header> {Title}</Modal.Header>
      <Modal.Content image>
        <Image
          src={image}
          size="large"
          style={{
            borderRadius: "0",
            backgroundColor: "white",
            zIndex: "1px"
          }}
          wrapped
        />
        <Modal.Description>
            {console.log(Title, Location)}
          <Header>
            <h3>Title : {Title} </h3>
          </Header>
          <Header>
            <p>Location : {Location}</p>
            <p>Date: {Date}</p>
            <p>Caption : {Caption}</p>
          </Header>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="Black" onClick={() => setOpen(false)}>
          Cancel
        </Button>

        <Button
          color="red"
          content="Delete"
          labelPosition="right"
          icon="checkmark"
          onClick={() => handleDelete(id)}
        > Delete
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ViewCard;
