import React from "react";

const ButtonComponent = ({ openModal }) => {
  console.log(openModal);

  return <button onClick={openModal}>Open Modal</button>;
};

export default ButtonComponent;
