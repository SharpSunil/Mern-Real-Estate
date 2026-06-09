import express from "express";
import cors from "cors";
import "dotenv/config";
import http from "http";
import { Server } from "socket.io";
import { connectDB } from "./config/db.js";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import propertyRouter from "./routes/property.route.js";
import inquiryRouter from "./routes/inquiry.routes.js";
import WishlistRouter from "./routes/wishlist.route.js";
import contactRouter from "./routes/contact.routes.js";
import adminRouter from "./routes/admin.route.js";
import chatRouter from "./routes/chat.routes.js";

const app = express();
const PORT = process.env.PORT || 5001;

// Database connection
connectDB();

// Middleware
const allowedOrigins = [process.env.FRONTEND_URL, "http://localhost:3000"].filter(Boolean); // Filter out undefined values
app.use(cors(
  {
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)  
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,

  }
));
app.use(express.json());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/property", propertyRouter);
app.use("/api/inquiry", inquiryRouter);
app.use("/api/wishlist", WishlistRouter);
app.use("/api/contact", contactRouter);
app.use("/api/admin", adminRouter);
app.use("/api/chat", chatRouter);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const server = http.createServer(app);
// Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"]
  },

});
io.on("connection", (socket) => {
  console.log("A user connected: " + socket.id);

  socket.on("joinChat", (chatId) => {
    socket.join(chatId);
    console.log(`User ${socket.id} joined chat ${chatId}`);
  });
  socket.on("sendMessage", (data) => {
    io.to(data.chatId).emit("receiveMessage", data);
  });
  
  socket.on("disconnect", () => {
    console.log("User disconnected: " + socket.id);
  }); 
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});