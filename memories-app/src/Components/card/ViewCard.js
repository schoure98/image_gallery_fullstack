import React from "react";
import { Modal, Header, Image, Button } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import "./ViewCard.css"

const ViewCard = ({ setOpen, open, image, Title, Location, Date, Caption, id, handleDelete }) => {

    const navigate = useNavigate();
    const CancelCard = () => {
        navigate("/memoryCard");
    }

    return (

    <Modal style={{height: "580px",
                   marginTop: "8%",
                   marginLeft: "20%",
                   marginRight: "20%"}}
    size={"big"}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>View</Button>}
    >
      <Modal.Header> {Title}
      </Modal.Header>
        <Modal.Content image>
            <Image
            src={image}  
            size='large' 
            style={{
                height: "400px",
                Width: "200px",
                borderRadius: "0",
            }}
            wrapped />
            <Modal.Description>
                <Header>
                    <h3>Title : {Title} </h3>
                </Header>
                <p>
                    Location : {Location}
                </p>
                <p>
                    Date: {Date}
                </p>
                <p>
                    Quote : {Caption}
                </p>
            </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
        <Button color='Black' onClick={() => setOpen(false)}>
            Cancel
        </Button>
         
        <Button color="red" 
            content="Delete"
            labelPosition="right"
            icon = "checkmark"
            onClick={() => handleDelete(id)}
        />
        </Modal.Actions>
    </Modal>
  

  );
};

export default ViewCard;
