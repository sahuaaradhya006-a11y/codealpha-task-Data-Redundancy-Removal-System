const Record = require("../models/Record");
const { findDuplicate } = require("../services/redundancyService");

// CREATE (Add Data)
exports.addData = async (req, res) => {
  try {
    const { content } = req.body;

    // Get all existing records
    const records = await Record.find();

    // Check for duplicate using similarity engine
    const result = findDuplicate(content, records);

    if (result.duplicate) {
      return res.status(409).json({
        success: false,
        message: "Duplicate record detected.",
        score: result.score,
        matchedWith: result.matchedRecord?.content || ""
      });
    }

    // Save new record
    const record = await Record.create({ content });

    res.status(201).json({
      success: true,
      message: "Record added successfully.",
      data: record,
      score: 0
    });

  } catch (err) {

    if (err.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Duplicate record found."
      });
    }

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// READ (Get All Data)
exports.getData = async (req, res) => {
  try {
    const data = await Record.find().sort({ createdAt: -1 });

    res.status(200).json({
      message: "Data fetched successfully",
      data
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// UPDATE (Update Data by ID)
exports.updateData = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedData = await Record.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updatedData) {
      return res.status(404).json({
        message: "Data not found"
      });
    }

    res.status(200).json({
      message: "Data updated successfully",
      data: updatedData
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// DELETE (Remove Data by ID)
exports.deleteData = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedData = await Record.findByIdAndDelete(id);

    if (!deletedData) {
      return res.status(404).json({
        message: "Data not found"
      });
    }

    res.status(200).json({
      message: "Data deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};