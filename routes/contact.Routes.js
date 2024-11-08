const express = require("express");
const router = express.Router();

const {
  getAllContacts,
  createContact,
  updateContact,
  patchContact,
  deleteContact,
} = require("../controllers/contact.Controller"); // Adjust the path based on your directory structure

// GET (with pagination and search)
router.get("/", getAllContacts);

// POST
router.post("/", createContact);

// PUT
router.put("/:id", updateContact);

// PATCH
router.patch("/:id", patchContact);

// DELETE
router.delete("/:id", deleteContact);

module.exports = router;
