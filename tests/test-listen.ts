import Zami from "../src";
import dotenv from "dotenv";

dotenv.config();

const zami = new Zami((process as any).env.ZAMI_API_SECRET);

console.log("listening");
zami.listen((message) => {
  console.log("New message: ", message);
});
