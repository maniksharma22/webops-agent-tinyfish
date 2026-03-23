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

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });

      if (onData) {
        onData({ data: chunk });
      }
    }

  } catch (error) {
    console.error("Agent Error:", error);

    if (onData) {
      onData({ error: error.message });
    }
  }
};
