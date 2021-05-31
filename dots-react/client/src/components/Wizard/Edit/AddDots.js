import React, { useEffect, useState, useRef } from "react";
import { faCropAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Hammer from "react-hammerjs";

import "./AddDots.scss";

const AddDots = ({
  image,
  crop,
  handleToggleCrop,
  handleAddCircle,
  handleIncreaseCounter,
  circles,
  circleCounter,
}) => {
  //State declarations

  const [selected, setSelected] = useState(null);
  const [bw, setBw] = useState(false);
  const [ratio, setRatio] = useState();

  //Ref declerations
  const imageRef = useRef();
  const imageContainerRef = useRef();

  const createCircle = (e) => {
    const container = document.getElementById("inner-container");

    const defaultCircleWidth = 60;
    const containerWidth = container.getBoundingClientRect().width;
    const containerHeight = container.getBoundingClientRect().height;

    const circleObject = {
      id: circleCounter,
      color: e.target.id,
      zIndex: 100 + circleCounter,
      space: {
        left: 0,
        top: 0,
        width: 0,
      },
    };

    const initialCirclePosX =
      (containerWidth / 2 - defaultCircleWidth / 2) / containerWidth;
    const initialCirclePosY =
      (containerHeight / 2 - defaultCircleWidth / 2) / containerHeight;
    const initialCircleWidth = defaultCircleWidth / containerHeight;

    circleObject.space.left = initialCirclePosX * 100;
    circleObject.space.top = initialCirclePosY * 100;
    circleObject.space.width = initialCircleWidth * 100;

    handleAddCircle([...circles, circleObject]);
    setSelected(circleCounter.toString());
    handleIncreaseCounter(() => circleCounter + 1);
  };

  const renderCircles = () => {
    if (circles.length > 0) {
      var currentCircles = circles.map((item, i) => {
        return (
          <div
            key={i}
            id={`new-circle-${item.id}`}
            className={
              selected == item.id
                ? `circle-inner active ${item.color}`
                : `circle-inner ${item.color}`
            }
            style={{
              width: item.space.width + "%",
              left: item.space.left + "%",
              top: item.space.top + "%",
              zIndex: item.zIndex,
            }}
            onClick={handleSelect}
          ></div>
        );
      });

      return currentCircles;
    }
  };

  const handleSelect = (e) => {
    const id = e.target.id.replace("new-circle-", "");

    e.target.style.zIndex = `10${circleCounter}`;

    setSelected(id);
    handleIncreaseCounter(() => circleCounter + 1);
  };

  const handleDeselect = (e) => {
    if (e.target === e.currentTarget) {
      setSelected(null);
    }
  };

  const handlePan = (e) => {
    if (selected !== null) {
      const activeDot = document.getElementById(`new-circle-${selected}`);

      const selectedCircle = circles.findIndex((item) => item.id == selected);

      const percentDeltaX = (e.deltaX / activeDot.parentNode.offsetWidth) * 100;
      const percentDeltaY =
        (e.deltaY / activeDot.parentNode.offsetHeight) * 100;

      const newLeft = circles[selectedCircle].space.left + percentDeltaX;
      const newTop = circles[selectedCircle].space.top + percentDeltaY;

      if (newTop > 0 && newTop < 100) {
        activeDot.style.top = newTop + "%";
      }
      if (newLeft > 0 && newLeft < 100) {
        activeDot.style.left = newLeft + "%";
      }
    }
  };

  const handlePinch = (e) => {
    if (selected !== null) {
      const activeDot = document.getElementById(`new-circle-${selected}`);

      const selectedCircle = circles.findIndex((item) => item.id == selected);

      const percentPinch = circles[selectedCircle].space.width * e.scale;
      const percentMove = percentPinch / 2;

      console.log(activeDot.style.top);
      //console.log(percentMove)

      if (percentPinch > 5) {
        activeDot.style.width = percentPinch + "%";
        // activeDot.style.top = percentMove + "px";
        // activeDot.style.left = percentMove + "px";
      }
    }
  };

  const handleEventEnd = () => {
    if (selected !== null) {
      const activeDot = document.getElementById(`new-circle-${selected}`);

      const selectedCircle = circles.findIndex((item) => item.id == selected);

      var newCircles = [...circles];
      newCircles[selectedCircle].zIndex = activeDot.style.zIndex;
      newCircles[selectedCircle].space = {
        left: (activeDot.offsetLeft / activeDot.parentNode.offsetWidth) * 100,
        top: (activeDot.offsetTop / activeDot.parentNode.offsetHeight) * 100,
        width: activeDot.style.width.replace("%", ""),
      };

      handleAddCircle(newCircles);
    }
  };

  const toggleBW = () => {
    setBw(!bw);
  };

  const toggleCrop = () => {
    handleToggleCrop(!crop);
  };

  const getImageDetails = () => {
    let img = new Image();
    img.src = image;
    img.onload = () =>
      setRatio(img.width / imageRef.current.getBoundingClientRect().width);
  };

  return (
    <React.Fragment>
      <Hammer
        onPinch={handlePinch}
        onPinchEnd={handleEventEnd}
        onPan={handlePan}
        onPanEnd={handleEventEnd}
        options={{
          touchAction: "compute",
          recognizers: {
            pinch: {
              enable: true,
            },
            pan: {
              threshold: 20,
            },
          },
        }}
      >
        <div id="inner-container" onClick={handleDeselect}>
          {/* <button
            onClick={exportImage}
            style={{
              position: "absolute",
              top: "20px",
              left: "20px",
            }}
          >
            Export
          </button> */}
          <div 
            id="image-container"
            style={{ position: "relative" }}
          >
            {renderCircles()}
            <img
              ref={imageRef}
              src={image.url}
              onClick={handleDeselect}
              style={
                bw ? { filter: "grayscale(100%)" } : { filter: "grayscale(0%)" }
              }
            />
          </div>
        </div>
      </Hammer>

      <div id="controls-container">
        <div id="controls-container-left">
          <div onClick={toggleCrop}>
            <FontAwesomeIcon icon={faCropAlt} />
          </div>
          <div
            onClick={toggleBW}
            style={bw ? { textDecoration: `line-through` } : {}}
          >
            B&amp;W
          </div>
        </div>
        <div id="controls-container-right">
          <div className="circle">
            <div id="yellow" onClick={createCircle}></div>
          </div>
          <div className="circle">
            <div id="blue" onClick={createCircle}></div>
          </div>
          <div className="circle">
            <div id="aqua" onClick={createCircle}></div>
          </div>
          <div className="circle">
            <div id="navy" onClick={createCircle}></div>
          </div>
          <div className="circle">
            <div id="orange" onClick={createCircle}></div>
          </div>
          <div className="circle">
            <div id="red" onClick={createCircle}></div>
          </div>
          <div className="circle">
            <div id="purple" onClick={createCircle}></div>
          </div>
          <div className="circle">
            <div id="green" onClick={createCircle}></div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AddDots;
