const express = require("express");
const router = express.Router();

const {
  addData,
  getData,
  updateData,
  deleteData
} = require("../controllers/dataController");

// CREATE
router.post("/add", addData);

// READ ALL
router.get("/all", getData);

// UPDATE
router.put("/update/:id", updateData);

// DELETE
router.delete("/delete/:id", deleteData);

module.exports = router;