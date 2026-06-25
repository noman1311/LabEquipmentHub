import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import equipmentRoutes from "./routes/equipmentRoutes.js";
import rfidRoutes from "./routes/rfidRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";
import rfidWorkflowRoutes from "./routes/rfidWorkflowRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import sessionAdminRoutes from "./routes/sessionAdminRoutes.js";
import "./jobs/reminderJob.js";

dotenv.config();

const app = express();

// app.use(cors());

app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://localhost:5500",
    "https://lab-equipment-hub.vercel.app"
  ],
  credentials: true
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/equipment", equipmentRoutes);
app.use("/api/rfid", rfidRoutes);
app.use("/api/session", sessionRoutes);
app.use("/api/rfid", rfidWorkflowRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/sessions", sessionAdminRoutes);

app.get("/", (req, res) => {

  res.json({
    success: true,
    message: "Lab Equipment Hub API Running"
  });

});

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});