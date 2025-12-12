import express from "express";
import cors from "cors";

const app = express();

// Allow frontend requests
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// Routes import
import userRouter from "./routes/user.routes.js";

// Route declarion
app.use("/api/v1/users", userRouter);

export default app;
