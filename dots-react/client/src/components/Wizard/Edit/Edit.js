import React, { useState, useEffect } from "react";

import Crop from "./Crop";
import AddDots from "./AddDots";

import "./Edit.scss";

const Edit = ({ image, handleCrop, crop }) => {
  const [circles, setCircles] = useState([]);
  const [circleCounter, setCircleCounter] = useState(0);

  const toggleCrop = () => {
    console.log(crop)
    handleCrop();
  };

  const addCircle = (object) => {
    setCircles(object);
  };

  const increaseCounter = (newCounter) => {
    setCircleCounter(newCounter);
  };

  const renderState = () => {
    if (crop) {
      return (
        <Crop 
          image={image}
        />);
    } else {
      return (
        <AddDots 
          crop={crop} 
          image={image}
          circles={circles}
          circleCounter={circleCounter} 
          handleToggleCrop={toggleCrop} 
          handleAddCircle={addCircle}
          handleIncreaseCounter={increaseCounter} 
        />
      );
    }
  };

  return <div id="mobile-container">{renderState()}</div>;
};

export default Edit;
