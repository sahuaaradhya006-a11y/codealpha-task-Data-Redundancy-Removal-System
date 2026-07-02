require("dotenv").config();

const app = require("./server");
const connectDB = require("./config/database");

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
