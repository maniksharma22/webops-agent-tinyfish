import fetch from "node-fetch";

export const runAgent = async (url, goal, onData) => {
  try {
    const response = await fetch(
      "https://agent.tinyfish.ai/v1/automation/run-sse",
      {
        method: "POST",
        headers: {
          "X-API-Key": process.env.TINYFISH_API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ url, goal })
      }
    );

    const text = await response.text();

    if (onData) {
      onData({ result: text });
    }

  } catch (error) {
    if (onData) {
      onData({ error: error.message });
    }
  }
};
