import fetch from "node-fetch";

export const runAgentStream = async (url, goal, res) => {

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

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();

    if (done) break;

    const chunk = decoder.decode(value);

    res.write(chunk); 
  }

  res.end();
};
