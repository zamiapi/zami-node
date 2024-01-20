# Zami Node.js SDK

Node.js Library for the Zami API.

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

## Usage by network

- [WhatsApp]()
- [Instagram]()

### WhatsApp

**Sending text messages**

```js
import { Zami } from "zami";
const zami = new Zami("om-secret-abcdefhijklmnopqrstuvwxyz");
```

**Sending media messages (image/video/audio)**

```js
import { Zami } from "zami";
const Zami = new Zami("om-secret-abcdefhijklmnopqrstuvwxyz");
```

**Receiving incoming messages**

To receive messages you need to register a webhook in the dashboard. Zami will call the webhook URL and pass new message data.

It's likely during development your server will be running in localhost and not be publicly accesible, we recommend using [ngrok](https://google.com) during development to create a publicly accesible tunnel to your development server.

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
