import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();
// to get list of books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    res.json({ count: books.length, data: books });
  } catch (error) {
    res.status(500).send("Error retrieving books");
  }
});
// to get the specified book
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).send("Book not found");
    }
    res.json(book);
  } catch (error) {
    res.status(500).send("Error retrieving book with id " + req.params.id);
  }
});

router.post("/", async (req, res) => {
  const { title, author, publishedYear } = req.body;
  try {
    if (!title || !author || !publishedYear) {
      const missingFields = [];
      if (!title) missingFields.push("title");
      if (!author) missingFields.push("author");
      if (!publishedYear) missingFields.push("publishedYear");
      throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
    }

    const newBook = { title, author, publishedYear };
    const book = await Book.create(newBook);
    res.status(201).json(book);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { title, author, publishedYear } = req.body;
    if (!title || !author || !publishedYear) {
      const missingFields = [];
      if (!title) missingFields.push("title");
      if (!author) missingFields.push("author");
      if (!publishedYear) missingFields.push("publishedYear");
      throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
    }

    const { id } = req.params;
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedBook) {
      return res.status(404).send("Book not found");
    }
    res.json(updatedBook);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).send("Book not found");
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).send("Error deleting book with id " + req.params.id);
  }
});

export default router;
