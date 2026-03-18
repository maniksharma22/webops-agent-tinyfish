import fetch from "node-fetch";

export const runAgent = async (url, goal) => {

  try {

    const response = await fetch(
      "https://agent.tinyfish.ai/v1/automation/run",
      {
        method: "POST",
        headers: {
          "X-API-Key": process.env.TINYFISH_API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          url: url,
          goal: goal
        })
      }
    );

    const data = await response.json();

    return {
      status: "success",
      agent: "TinyFish Autonomous Web Agent",
      rawOutput: JSON.stringify(data, null, 2)
    };

  } catch (error) {

    return {
      status: "error",
      message: error.message
    };

  }

};
