import React from "react";
import { Modal, Header, Image, Button } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const CancelCard = () => {
    navigate("/memoryCard");
  };

  return (
    <Modal
      className="ViewCardModel"
      style={{
        height: "400px",
        marginTop: "8%",
        marginLeft: "20%",
        marginRight: "20%",
      }}
      size={"big"}
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
          }}
          wrapped
        />
        <Modal.Description>
          <Header>
            <h3>Title : {Title} </h3>
          </Header>
          <h4>Location : {Location}</h4>
          <h4>Date: {Date}</h4>
          <h4>Caption : {Caption}</h4>
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
        />
      </Modal.Actions>
    </Modal>
  );
};

export default ViewCard;
