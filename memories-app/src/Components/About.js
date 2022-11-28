import React from "react";
import "../Components/About.css";
import dev1 from '../Components/dev1.png'
import dev2 from '../Components/dev2.png'
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

function About() {
  return (
    <div>
         <h4 class="about">Our Team</h4>
    <div class="flex-container">
      <div>
        <MDBCard class="card-component">
          <MDBCardImage
            class="developer-img"
            src={dev1}
            alt="dev image"
          />
          <MDBCardBody>
            <MDBCardTitle>Shreya Choure</MDBCardTitle>
            <MDBCardText>
              MS Computer Science
              <MDBCardText>Portland State Univeristy</MDBCardText>
            </MDBCardText>
            <MDBCardText class="icons">
              <a href="https://www.linkedin.com/in/shreya-choure/">
                <FaLinkedin class="icon" />
              </a>
              <a href="https://github.com/schoure98">
                <FaGithub class="icon" />
              </a>
            </MDBCardText>
            <MDBBtn id="contact" href="mailto:schoure@pdx.edu">
              Contact
            </MDBBtn>
          </MDBCardBody>
        </MDBCard>
      </div>

      <div>
        <MDBCard class="card-component">
          <MDBCardImage
            class="developer-img"
            src={dev2}
            alt="dev image"
          />
          <MDBCardBody>
            <MDBCardTitle>Rutuja Padgilwar</MDBCardTitle>
            <MDBCardText>
              MS Computer Science
              <MDBCardText>Portland State Univeristy</MDBCardText>
            </MDBCardText>
           
            <MDBCardText class="icons">
              <a href="https://www.linkedin.com/in/rutuja-padgilwar/">
                <FaLinkedin class="icon" />
              </a>
              <a href="https://github.com/rutujapadgilwar">
                <FaGithub class="icon" />
              </a>
            </MDBCardText>
            <MDBBtn id="contact" href="mailto:rpadgil2@pdx.edu ">
              Contact
            </MDBBtn>
          </MDBCardBody>
        </MDBCard>
      </div>
    </div>
    </div>
  );
}

export default About;
