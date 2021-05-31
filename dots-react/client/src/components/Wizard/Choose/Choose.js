import React, { useState, useEffect } from "react";
import Colcade from "colcade";

import "./Choose.scss";

const Choose = ({ setImage, image }) => {
  const [imageList, setImageList] = useState([]);

  const selectPhoto = (e) => {
    const selectedImage = imageList.find( ({ urlResize }) => urlResize === e.target.getAttribute("src") );

    setImage(selectedImage);
  };

  const renderList = () => {
    if (imageList.length > 0) {
      var imagesRender = imageList.map((item, i) => {
        return (
          <div key={i} className="grid-item">
            <img
              className={item === image && "active"}
              onClick={selectPhoto}
              alt="alt"
              src={item.urlResize}
            />
          </div>
        );
      });
  
      return imagesRender;
    } else {
      return "Loading..."
    }
  };

  useEffect(() => {
    const width = (window.innerWidth > 700 ? 700 : window.innerWidth )

    fetch(`/default_images`, {
      method: "POST",
      body: width.toString(),
      headers: {
        "Content-type": "text/plain",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setImageList(data);
      });
  }, [])

  useEffect(() => {
    console.log(imageList)

    if (imageList.length > 0) {
      var colc = new Colcade(".grid", {
        columns: ".grid-col",
        items: ".grid-item",
      });

      let uploadDocument = new DOMParser().parseFromString('<div className="grid-item upload-test">Upload</div>', 'text/html');
      let uploadNode = uploadDocument.body.firstChild;

      console.log(uploadNode)

      colc.prepend(uploadNode) 
    }

    setImage("");
  }, [imageList]);

  return (
    <div className="photo-container">
      <div className="photo-search">
        <input type="text" placeholder="Search" />
      </div>
      <div className="photo-lists grid">
        {/* Columns */}
        <div className="grid-col grid-col--1"></div>
        <div className="grid-col grid-col--2"></div>
        {/* Items */}
        {renderList()}
      </div>
    </div>
  );
};

export default Choose;
