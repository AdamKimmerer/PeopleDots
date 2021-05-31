// import { useEffect } from "react";
import "./Share.scss";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Share = ({ dataURL }) => {
  const renderURL = () => {
    console.log(dataURL);

    if (dataURL) {
      return URL.createObjectURL(dataURL);
    } else {
      return "Loading...";
    }
  };

  const tempUpload = () => {
    fetch("/upload_image")
        .then((response) => response.json())
        .then((data) => {
        console.log(data);
        });
  }

  return (
    <div className="share-container">
      <div className="share-hastag">#Hashtag</div>
      <div className="share-blurb">
        Ut et cursus aliquam tincidunt et mi est. Tincidunt sit lacus at
        fermentum porta suscipit. Tempus ultrices nisl, nullam molestie. Id
        rhoncus magnis eu et et nisl et. Lectus posuere egestas elit ultrices
        auctor erat maecenas proin eu.
      </div>
      <div className="share-image">
        {dataURL ? <img src={renderURL()} /> : "Loading..."}
      </div>
      <div className="share-button-container">
        <a href={renderURL()} download="dots-test.jpeg">
          <button className="share-button download">
            <FontAwesomeIcon icon={faDownload} />
          </button>
        </a>
        <button className="share-button tweet" onClick={tempUpload}>
          <FontAwesomeIcon icon={faTwitter} />
          &nbsp;Share
        </button>
      </div>
    </div>
  );
};

export default Share;
