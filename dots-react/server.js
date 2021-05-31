const express = require('express');
const nodeHtmlToImage = require('node-html-to-image');
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(bodyParser.text()) // for parsing application/json

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

// Get list of images (resized)
app.post('/default_images', (req, res) => {
  const width = req.body;

  cloudinary.api.resources((error, result) => {
    const resourcesArray = [];
    const resources = result.resources;

    for (let i = 0; i < resources.length; i++) {
      resourcesArray.push(
        {
          public_id: resources[i].public_id,
          origWidth: resources[i].width,
          origHeight: resources[i].height,
          url: resources[i].url,
          urlResize: cloudinary.url(result.resources[i].public_id, {transformation: [
            {width: width, crop: "scale"}
          ]})
        }
      )
    }

    res.send(resourcesArray);
  });
})

app.get('/upload_image', (req, res) => {
  const imageSrc = "blob:http://localhost:3000/7fa7d86a-be8e-4235-ad46-05e5daf42155";

  cloudinary.uploader.upload(imageSrc, 
    function(error, result) {console.log(result, error)});
})

// Turn HTML into final image
app.post(`/html-to-image`, async function(req, res) {

  const htmlHead = `<head>      
      <style>
        .circle-inner {
          position: absolute;
          border-radius: 50%;
          box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.3);
        }
        .circle-inner:after {
          content: "";
          display: block;
          padding-bottom: 100%;
        }
        .circle-inner.yellow {
          background: #e4c924 !important;
        }
        .circle-inner.blue {
          background: #06b7f1 !important;
        }
        .circle-inner.aqua {
          background: #02ba96 !important;
        }
        .circle-inner.navy {
          background: #334462 !important;
        }
        .circle-inner.orange {
          background: #eb5e30 !important;
        }
        .circle-inner.red {
          background: #c93d3d !important;
        }
        .circle-inner.purple {
          background: #ab3dbd !important;
        }
        .circle-inner.green {
          background: #3f9715 !important;
        }
      </style>
    </head>`;

  const htmlBody = req.body.html

  console.log(htmlBody)
  
  const image = await nodeHtmlToImage({
    html: `<html>${htmlHead}${htmlBody}</html>`,
    type: "jpeg",
    quality: 90
  });
  res.writeHead(200, { 'Content-Type': 'image/jpeg' });
  res.end(image, 'binary');
});