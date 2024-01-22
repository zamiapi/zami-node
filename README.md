# Zami Node.js SDK

Node.js Library for the Zami API. Currently supports WhatsApp and Instagram. Support for LinkedIn, X, Telegram, Signal and Messenger is coming soon.

## Install

```bash
npm install --save zami
# or
yarn add zami
```

## Setup

First you need to get an API secret, you can get one by [clicking here](https://zamiapi.com)

```node
import { Zami } from "zami";
const zami = new Zami("om-secret-abcdefhijklmnopqrstuvwxyz");
```

Once you have an API secret and you've logged in to the dashboard you should create your first connection, a connection represents an account you've connected to Zami to send and receive messages, it could be a WhatsApp number or Instagram account.

## Usage

**Sending text messages**

```js
import { Zami } from "zami";
const zami = new Zami("om-secret-abcdefhijklmnopqrstuvwxyz");

zami.sendText({
  connection_id: "<connection_id>",
  recipient: "+18096968926",
  body: "Hello from Zami",
});
```

**Sending media messages (image/video/audio)**

```js
import { Zami } from "zami";
import fs from "fs/promises";
const zami = new Zami("om-secret-abcdefhijklmnopqrstuvwxyz");

async function send() {
  const buffer = await readFile("path/to/image.png");
  await zami.sendMedia({
    connection_id: "<connection_id>",
    media: buffer,
    content_type: "image/png",
    recipient: "+18096968926",
  });
}

send();
```

**Receiving incoming messages**

```js
import { Zami } from "zami";
import fs from "fs/promises";
const zami = new Zami("om-secret-abcdefhijklmnopqrstuvwxyz");

zami.listen((message) => {
  console.log("New message: " + JSON.stringify(message));
});
```

Alternatively you can register a webhook in the dashboard, Zami will call the webhook URL and pass new message data.

If you decide with the webhook route, it's likely during development your server will be running in localhost and not be publicly accesible, we recommend using [ngrok](https://google.com) during development to create a publicly accesible tunnel to your development server.

The sample script below creates a /webhook endpoint which you can register in the dashboard to test and see incoming message data.

```js
const express = require("express");
const app = express();

app.use(express.json());

app.post("/webhook", (req, res) => {
  console.log("Received webhook:", req.body);
  res.status(200).send("Data received");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```
