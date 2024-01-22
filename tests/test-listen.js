"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = __importDefault(require("../src"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const zami = new src_1.default(process.env.ZAMI_API_SECRET);
console.log("listening");
zami.listen((message) => {
    console.log("New message: ", message);
});
