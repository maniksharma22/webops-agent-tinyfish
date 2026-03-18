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

    if (!response.body) {
      if (onData) onData({ error: "No response body" });
      return;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      const lines = buffer.split("\n");
      buffer = lines.pop();

      for (let line of lines) {
        if (line.startsWith("data: ")) {
          try {
            const json = JSON.parse(line.replace("data: ", ""));
            if (onData) onData(json);
          } catch {}
        }
      }
    }

  } catch (error) {
    if (onData) onData({ error: error.message });
  }
};
