// Loader.js
import React from "react";
import Lottie from "react-lottie";
import animationData from "./loader.json"; // Adjust the path accordingly

const Loader = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Lottie options={defaultOptions} height={150} width={150} />
    </div>
  );
};

export default Loader;
