import React from "react";
import { Link } from "react-router-dom";
import background from "../background.jpeg";

export default function Welcome() {
  return (
    <header style={{ paddingLeft: 0 }}>
      <div
        className="p-5 text-center bg-image welcome"
        style={{ backgroundImage: `url(${background})`, height: 600 }}
      >
        <div className="mask" style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
          <div className="d-flex justify-content-center align-items-center h-100">
            <div className="text-white">
              <h1 className="animation-charcter mb-3">Welcome to Memories</h1>
              <h4 className="mb-3 quote">
                Our application is about going back to memories! Living in the
                moment is important, but there are moments where we just want to
                go back and live it once again. And we can do that with great,
                awesome pictures!
                <br />
                <br />
                "Life is shorter, live it. Love is rare, grab it. Anger is bad,
                dump it. Fear is awful, face it. Memories are sweet, cherish
                it.”
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
