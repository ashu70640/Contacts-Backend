const express = require("express");
const dotenv = require("dotenv").config();
const contactRoute = require("./routes/contactRoutes");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorHandler");
const { connect } = require("mongoose");
const connectDb = require("./config/dbConnections");

connectDb();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/contacts/", contactRoute);
app.use("/api/users/", userRoutes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server running on ${port}`);
});
