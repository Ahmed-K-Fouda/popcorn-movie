import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import StarRating from "./StartRating";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

function Test() {
  const [movieRating, setMovieRating] = useState(0);

  return (
    <div>
      <StarRating maxRating={5} onMovieRating={setMovieRating}></StarRating>
      <p>This movie got {movieRating} stars</p>
    </div>
  );
}

root.render(
  <React.StrictMode>
    {/* <StarRating
      defaultRating={3}
      maxRating={5}
      messages={["terrible", "Bad", "okey", "good", "Amazing"]}
    />
    <Test /> */}
    <App />
  </React.StrictMode>
);
