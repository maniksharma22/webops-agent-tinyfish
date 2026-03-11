import { exec } from "child_process";

export const runAgent = async (url, goal) => {

  return new Promise((resolve) => {

    const command = `curl -X POST "https://agent.tinyfish.ai/v1/automation/run-sse" -H "X-API-Key: ${process.env.TINYFISH_API_KEY}" -H "Content-Type: application/json" -d "{\\"url\\":\\"${url}\\",\\"goal\\":\\"${goal}\\"}"`;

    exec(command, (error, stdout, stderr) => {

      if (error) {
        resolve({
          status: "error",
          message: error.message
        });
        return;
      }

      resolve({
        status: "success",
        agent: "TinyFish Autonomous Web Agent",
        rawOutput: stdout
      });

    });

  });

};