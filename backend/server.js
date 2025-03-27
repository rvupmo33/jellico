import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import blogRoutes from "./routes/blog.route.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use("/api/blogs", blogRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log("Running on http://localhost:3000");
});

// fXSPsKtsRyxVhDJO
