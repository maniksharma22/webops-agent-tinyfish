# WebOps Agent — Autonomous Web Task Executor

WebOps Agent is an AI-powered web automation application that allows an autonomous agent to navigate real websites and perform multi-step tasks automatically.

The system uses the TinyFish Web Agent API to demonstrate how AI agents can interact with real websites, complete workflows, and gather useful information from the web.

This project was built for the **TinyFish $2M Pre-Accelerator Hackathon**.

---

## Hackathon Submission

This project was created and submitted by **Manik Sharma** for the **TinyFish $2M Pre-Accelerator Hackathon (2026)**.

Demo Video  
https://www.loom.com/share/939e705a0def4dcab47f3552ac78df49

Live Application  
https://webops-agent-tinyfish.vercel.app/

X (Twitter) Post  
https://x.com/ManikSh84572221/status/2032200212278862187

---

## Live Demo

Frontend  
https://webops-agent-tinyfish.vercel.app

Backend API  
https://webops-agent-tinyfish-production.up.railway.app

---

## Overview

Most AI tools today can generate text or analyze data, but they cannot actually perform tasks on websites.

WebOps Agent demonstrates how an AI agent can interact with the live web and automate tasks that normally require manual effort.

Using the TinyFish Web Agent API, the system can:

- Open websites
- Navigate through pages
- Perform multi-step actions
- Extract useful information

The application also provides a visual dashboard where users can see the **step-by-step activity of the AI agent while it works**.

---

## Key Features

- Autonomous web agent powered by TinyFish API
- Multi-step task execution on real websites
- Interactive dashboard showing the agent’s activity
- Real-time timeline of agent actions
- Clean and responsive user interface

---

## Example Use Cases

The WebOps Agent can perform tasks such as:

- Searching for **Java Developer jobs on LinkedIn**
- Finding **top laptops under a specific budget on Amazon**
- Discovering **trending AI repositories on GitHub**
- Extracting structured information from websites

These examples show how AI agents can automate repetitive web workflows.

---

## Tech Stack

### Frontend
- React (Vite)
- JavaScript
- CSS

### Backend
- Node.js
- Express.js

### AI Infrastructure
- TinyFish Web Agent API

---

## Local Setup

### 1. Clone the Repository

```bash
git clone https://github.com/maniksharma22/webops-agent-tinyfish.git
cd webops-agent-tinyfish
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```
TINYFISH_API_KEY=your_api_key_here
PORT=3000
```

Run the backend:

```bash
npm start
```

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend will run at:

```
http://localhost:5173
```

---

## Deployment

Frontend is deployed using **Vercel**.

Backend is deployed using **Railway**.

After deployment, the frontend communicates with the deployed backend API to run the automation tasks.

---

## How It Works

1. The user enters a website URL and a task description.
2. The backend sends this request to the TinyFish Web Agent API.
3. The AI agent navigates the website and performs the requested workflow.
4. The application shows the agent’s activity step-by-step in the dashboard.

---

## Author

Manik Sharma  
Computer Science Engineer

---

## Acknowledgement

This project was developed using the **TinyFish Web Agent API** as part of the **TinyFish $2M Pre-Accelerator Hackathon**.
