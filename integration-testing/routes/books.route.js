const express = require("express");

const router = express.Router();
const bookData = require("../mock/books.json");
const { check, validationResult } = require('express-validator');

router.get("/", (req, res) => {
    res.json(bookData);
});

router.put("/:bookid", (req, res) => {
    const { bookid } = req.params;
});
module.exports = router;
