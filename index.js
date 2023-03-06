import express from "express";
import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
import cors from "cors";
import { booksRouter } from "./routes/books.js";

dotenv.config();

const app = express();
app.use(cors());
const PORT = process.env.PORT;
//interceptor  || converting body to json
app.use(express.json());

const MONGO_URL = process.env.MONGO_URL;
//Mongo connection
async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("MongoDB is connected");
return client;
}
export const client = await createConnection();

//Rest API endpoints
//req - what we sent to server
//res - what server will send us back
app.get("/", (request, response) => {
  response.send("Hello Everyone have a great day🥳🥳😉😉");
});
app.use("/books", booksRouter);
// app.use("/users", usersRouter);
app.listen(PORT, () => console.log("Server started on port", PORT));