import express from "express";
import cors from "cors";
import "dotenv/config";
import http from "http";
import { connectDB } from "./config/db.js";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import propertyRouter from "./routes/property.route.js";
import inquiryRouter from "./routes/inquiry.routes.js";
import WishlistRouter from "./routes/wishlist.route.js";
import contactRouter from "./routes/contact.routes.js";

const app = express();
const PORT = process.env.PORT || 5001;

// Database connection
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/property", propertyRouter);
app.use("/api/inquiry", inquiryRouter);
app.use("/api/wishlist", WishlistRouter);
app.use("/api/contact", contactRouter);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});