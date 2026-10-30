# PeopleDots

A web app for putting coloured dots over parts of a photo, the way John Baldessari covered faces with flat dots, to see what you notice when you can't look at the obvious thing.

Baldessari found that when faces are hidden, you start reading a photo differently: posture, hands, clothing and surroundings carry the story instead. PeopleDots lets anyone try that on their own photos or on a small library of images, then save or share the result and maybe prompt someone else to try it.

## Who it's for

Anyone curious about how we read photographs: artists and photographers, art students and teachers, and people who want to make and share something on social media.

## Status

**Unfinished prototype from 2021, now being rebuilt.** The plan and checklist are in [ROADMAP.md](ROADMAP.md).

What the 2021 prototype does:

- Pick a photo from a library (served from Cloudinary).
- Add dots in eight colours, then select and drag them with touch or a mouse.
- Resize dots with a two-finger pinch (touch only).
- Toggle black and white.
- Export the result as a JPEG rendered on the server, and download it.

What it doesn't do yet:

- Upload your own photo.
- Delete or undo dots.
- Resize with a mouse or keyboard.
- Crop: the button exists but doesn't work.
- Share: the button is a stub.
- Desktop layout: portrait photos overflow the editor.
- Keep your dots if you go back from the Share step.

## Built with

**2021 prototype** (`dots-react/`)

- React 17 (Create React App 4) with Sass (`node-sass`)
- Hammer.js (`react-hammerjs`) for touch gestures, plus `react-image-crop` and Colcade
- An Express server that lists the photo library from Cloudinary and renders the final image with `node-html-to-image` (Puppeteer)

**Planned rebuild** (see [ROADMAP.md](ROADMAP.md))

- Vite, React and TypeScript, served as a static site with no server
- Pointer Events for mouse, touch and pen
- Canvas for full-resolution export in the browser, so photos never leave the device
- The Web Share API for sharing, with download as the fallback

## Repository layout

```
dots-react/           2021 prototype
  server.js           Express API: photo library (Cloudinary) and image export (Puppeteer)
  client/             React app (Create React App)
DotsNode/             First attempt (Express + EJS + embedded tweets). Superseded; will be removed.
Images/               Design assets
ROADMAP.md            Plan from here to release
```

## Running the 2021 prototype

The prototype's dependencies are from 2020–21. **Use Node.js 14.** `node-sass` 4 won't install on current Node, and Create React App 4 doesn't build on Node 17+ without workarounds. With Node 14.21 and the committed lockfiles, both installs and `npm run dev` work.

1. Switch to Node 14, for example with [nvm](https://github.com/nvm-sh/nvm):

   ```sh
   nvm install 14 && nvm use 14
   ```

2. Install the server and client dependencies. The server install downloads a Chromium build for Puppeteer.

   ```sh
   cd dots-react
   npm ci
   npm ci --prefix client
   ```

3. Configure Cloudinary, which holds the photo library:

   ```sh
   cp .env.example .env   # then fill in your Cloudinary cloud name, API key and secret
   ```

   Without Cloudinary credentials the app still starts, but the library request fails and "Pick a photo" stays on "Loading...".

4. Start both servers:

   ```sh
   npm run dev
   ```

   The React app runs at http://localhost:3000 and proxies API calls to Express on port 5000.

`DotsNode/` is not maintained. It reads Twitter API credentials from the `TWITTER_CONSUMER_KEY`, `TWITTER_CONSUMER_SECRET` and `TWITTER_BEARER_TOKEN` environment variables.

## Privacy

The 2021 prototype sends the editor's markup to its own Express server to render the export. The rebuild does everything in the browser: no uploads, no accounts, no cookies.

## License

[MIT](LICENSE) © Adam Kimmerer.

The images in this repository are original placeholders. The rebuild's photo library will use public-domain or CC0 images, with credits.

## Acknowledgements

Inspired by the work of John Baldessari (1931–2020). This project isn't affiliated with or endorsed by his estate.
