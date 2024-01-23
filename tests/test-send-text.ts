import Zami from "../src";
import dotenv from "dotenv";

dotenv.config();

const zami = new Zami((process as any).env.ZAMI_API_SECRET);

console.log("listening");
zami.sendText({
  connection_id: (process as any).env.CONNECTION_ID,
  body: "hi",
  recipient: "+18296964737",
});
