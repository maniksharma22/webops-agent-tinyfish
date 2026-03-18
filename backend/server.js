import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { runAgentStream } from "./agent.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.options("*", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.sendStatus(200);
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

  res.flushHeaders();

  await runAgentStream(url, goal, res);
});

app.get("/", (req, res) => {
  res.send("Server running");
});

app.listen(PORT, () => {
  console.log("Server started");
});
