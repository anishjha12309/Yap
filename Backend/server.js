import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import connectToMongoDB from "./DB/connectToMongoDB.js";

const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();

// To parse the incoming request with JSON Payload
app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Listening on port ${PORT}`);
});
