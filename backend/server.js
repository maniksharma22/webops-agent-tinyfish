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

    const result = await runAgent(url, goal);

    res.json(result);

  } catch (error) {

    res.status(500).json({
      status: "error",
      message: error.message
    });

  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
