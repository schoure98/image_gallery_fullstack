import React from "react";
import { Link } from "react-router-dom";
import background from "../background.jpeg";

export default function Welcome() {
  return (
    <header style={{ paddingLeft: 0 }}>
      <div
        className="p-5 text-center bg-image welcome"
        style={{ backgroundImage: `url(${background})`, height: 550, opacity:0.9 }}
      >
        <div className="mask" style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
          <div className="d-flex justify-content-center align-items-center h-100">
            <div className="text-white">
              <h1 className="animation-charcter mb-3">Welcome to Memories</h1>
              <h4 className="mb-3 quote">
                Our application is about travel memories. Being new to the city and country we are exploring new places and destinations every weekend!
                We are trying to gather the moments, to cherish forever!
              </h4>
              <Link
                to="/memoryCard"
                className="btn btn-outline-light btn-lg gallery"
                role="button"
              >
                Gallery
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
