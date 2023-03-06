import express from "express";

import {
  getBooks,
  getBookByID,
  deleteBookByID,
  AddBook,
  updateBookByID,
} from "../helper.js";
import { auth } from "../middleware/auth.js";
const router = express.Router();

//get books
router.get("/", async (request, response) => {
  const { language, rating } = request.query;
  console.log(request.query, language);
  
  if (request.query.rating) {
    request.query.rating = +request.query.rating;
  }
  //   const book = books.filter((bk) => bk.language == language);
  const book = await getBooks(request);
  response.send(book);
});

//get book by ID
router.get("/:id", async (request, response) => {
  const { id } = request.params;
  console.log(id);
  //   const book = books.findOne((bk) => bk.id == id);
  const book = await getBookByID(id);
  book
    ? response.send(book)
    : response.status(404).send({ message: "No Books found" });
});

//delete id

router.delete("/:id", async (request, response) => {
  const { id } = request.params;
  console.log(id);
  //   const book = books.findOne((bk) => bk.id == id);
  const book = await deleteBookByID(id);
  response.send(book);
});

//Add books
//inbuilt middleware
//say data is in json
router.post("/", async (request, response) => {
  const newBook = request.body;
  console.log(newBook);
  const result = await AddBook(newBook);
  response.send(result);
});

router.put("/:id", async (request, response) => {
  const { id } = request.params;
  const updateBook = request.body;
  console.log(updateBook);
  const result = await updateBookByID(id, updateBook);
  response.send(result);
});

export const booksRouter = router;