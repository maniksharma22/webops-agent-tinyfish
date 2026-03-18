import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import compression from "compression";
import { runAgentStream } from "./agent.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: "*"
}));

app.use(compression());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("WebOps Agent Server Running");
});

app.post("/run-agent-stream", async (req, res) => {

  const { url, goal } = req.body;

  if (!url || !goal) {
    return res.status(400).json({
      status: "error",
      message: "url and goal required"
    });
  }

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");

  res.flushHeaders();

  await runAgentStream(url, goal, res);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
