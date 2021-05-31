import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Wizard.scss";

import Choose from "./Choose/Choose";
import Edit from "./Edit/Edit";
import Share from "./Share/Share";

function Wizard(props) {
  const [step, setStep] = useState(0);
  const [image, setImage] = useState();
  const [title, setTitle] = useState("Pick a photo");
  const [crop, setCrop] = useState(false);
  const [dataURL, setDataURL] = useState();

  const handleSetImage = (newImageObj) => {
    setImage(newImageObj);
  };

  const handleCrop = () => {
    console.log(crop);
    setCrop(!crop);
  };

  let history = useHistory();

  const stepPlus = (e) => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      history.push("/");
    }
  };

  const stepMinus = () => {
    if (step > 0) {
      setStep(step - 1);
    } else {
      history.push("/");
    }
  };

  useEffect(() => {
    console.log(image)
  }, [image])

  useEffect(() => {
    renderStep();
    renderTitle();
  }, [step]);

  const exportImage = () => {

    const container = document.getElementById("image-container");

    if (container) {

      let html = container.outerHTML;
      html = html.replace(image.urlResize, image.url);

      const data = JSON.stringify({
        html: `<body style="width: ${image.origWidth}px; height: ${image.origheight}px;">
            ${html}
          </body>`,
      });
  
      fetch(`/html-to-image`, {
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((response) => response.blob())
        .then((data) => {
          console.log(data)
          setDataURL(data);
        });
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        document.body.classList.remove("no-overscroll");
        return <Choose setImage={handleSetImage} image={image} />;
      case 1:
        document.body.classList.add("no-overscroll");
        return <Edit handleCrop={handleCrop} crop={crop} image={image} />;
      case 2:
        document.body.classList.remove("no-overscroll");
        exportImage();
        return <Share dataURL={dataURL}/>;
      default:
        return <Link to="/">Go Home.</Link>;
    }
  };

  const renderTitle = () => {
    switch (step) {
      case 0:
        return setTitle("Pick a photo");
      case 1:
        return setTitle("Add Dots");
      case 2:
        return setTitle("Share");
      default:
        return setTitle("How'd you get here?");
    }
  };

  const renderNav = () => {
    if (!crop) {
      return (
        <div className="wizard-nav">
          <button className="wizard-button back" onClick={stepMinus}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button
            className="wizard-button next"
            onClick={stepPlus}
            disabled={image ? "" : true}
          >
            {step == 2 ? "Go Home" : "Next"}
          </button>
        </div>
      );
    } else {
      return (
        <div className="wizard-nav crop">
          <button className="wizard-button crop" onClick={handleCrop}>
            Done
          </button>
        </div>
      );
    }
  };

  

  return (
    <div className="wizard-container">
      {!crop && <div id="wizard-header">{title}</div>}
      <div className="wizard-body">{renderStep()}</div>
      {renderNav()}
    </div>
  );
}

export default Wizard;
