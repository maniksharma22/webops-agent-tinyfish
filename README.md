# WebOps Agent — Autonomous Web Task Executor

WebOps Agent is an AI-powered automation platform that allows an autonomous agent to navigate real websites and perform multi-step tasks. The project is built using the TinyFish Web Agent API and demonstrates how AI agents can interact with live web interfaces to complete tasks that normally require manual work.

This project was developed for the TinyFish $2M Pre-Accelerator Hackathon.

---

## Overview

Most AI tools today generate text or analyze data but cannot actually perform work on the web. WebOps Agent bridges this gap by enabling an AI agent to browse websites, execute workflows, and extract useful information automatically.

The agent can open websites, navigate pages, and perform structured tasks while displaying the execution timeline in a visual dashboard.

---

## Key Features

* Autonomous web agent powered by TinyFish API
* Multi-step task execution on real websites
* Interactive dashboard showing agent activity
* Live timeline of actions performed by the AI agent
* Floating contextual cards during agent execution
* Clean and responsive UI

---

## Example Use Cases

The WebOps Agent can perform tasks such as:

* Searching for **Java Developer jobs on LinkedIn**
* Finding **top laptops under a specific budget on Amazon**
* Discovering **trending AI repositories on GitHub**
* Extracting structured information from websites

These examples demonstrate how AI agents can automate repetitive web workflows.

---

## Tech Stack

Frontend
React (Vite)
JavaScript
CSS

Backend
Node.js
Express.js

AI Infrastructure
TinyFish Web Agent API

---

## Project Structure

```
webops-agent-tinyfish
│
├── backend
│   ├── agent.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── frontend
│   ├── index.html
│   ├── package.json
│   └── src
│       ├── App.jsx
│       └── main.jsx
│
├── .gitignore
└── README.md
```

---

## Local Setup

### 1. Clone the Repository

```
git clone https://github.com/maniksharma22/webops-agent-tinyfish.git
cd webops-agent-tinyfish
```

---

### 2. Backend Setup

```
cd backend
npm install
```

Create a `.env` file inside the backend folder:

```
TINYFISH_API_KEY=your_api_key_here
PORT=3000
```

Run the backend server:

```
npm start
```

---

### 3. Frontend Setup

Open another terminal and run:

```
cd frontend
npm install
npm run dev
```

The frontend will run at:

```
http://localhost:5173
```

---

## Deployment

The project can be deployed using the following platforms:

Frontend
Deploy using Vercel

Backend
Deploy using Railway or Render

After deployment, update the frontend API URL to connect with the deployed backend.

---

## How It Works

1. The user enters a website and a task description.
2. The backend sends this request to the TinyFish Web Agent API.
3. The AI agent navigates the website and performs the requested workflow.
4. The dashboard displays the agent’s activity timeline in real time.

---

## Demo

Demo Video Link
(Add your demo video or tweet link here)

---

## Author

Manik Sharma
Computer Science Engineer

---

## Acknowledgement

This project was built using the TinyFish Web Agent API as part of the TinyFish Pre-Accelerator Hackathon.
