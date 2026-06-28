const Record = require("../models/Record");

// CREATE (Add Data)
exports.addData = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({
        message: "Content is required"
      });
    }

    const newRecord = await Record.create({ content });

    res.status(201).json({
      message: "Data added successfully",
      data: newRecord
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
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