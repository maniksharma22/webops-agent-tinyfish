import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { runAgent } from "./agent.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: "https://webops-agent-tinyfish.vercel.app"
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("WebOps Agent Server Running");
});

app.post("/run-agent", async (req, res) => {
  try {
    const { url, goal } = req.body;

    if (!url || !goal) {
      return res.status(400).json({
        status: "error",
        message: "url and goal required"
      });
    }

    await runAgent(url, goal, () => {}); 

    res.json({
      status: "success",
      message: "Agent executed"
    });

  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
});

app.post("/run-agent-stream", async (req, res) => {

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  const { url, goal } = req.body;

  try {

    res.write(`data: ${JSON.stringify({ purpose: "Connecting..." })}\n\n`);
    await new Promise(r => setTimeout(r, 800));

    res.write(`data: ${JSON.stringify({ purpose: "Initializing..." })}\n\n`);
    await new Promise(r => setTimeout(r, 800));

    res.write(`data: ${JSON.stringify({ purpose: "Analyzing..." })}\n\n`);
    await new Promise(r => setTimeout(r, 800));

    res.write(`data: ${JSON.stringify({ purpose: "Extracting..." })}\n\n`);
    await new Promise(r => setTimeout(r, 800));

    await runAgent(url, goal, (data) => {
      if (data?.result || data?.output) {
        res.write(`data: ${JSON.stringify({
          purpose: "Result",
          result: data.result || data.output
        })}\n\n`);
      }
    });

    res.end();

  } catch (error) {
    res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
    res.end();
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
