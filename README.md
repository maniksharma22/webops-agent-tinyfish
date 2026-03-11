# WebOps Agent — Autonomous Web Task Executor

WebOps Agent is an AI-powered automation platform that allows an autonomous agent to navigate real websites and perform multi-step tasks automatically.

The system uses the **TinyFish Web Agent API** to demonstrate how AI agents can interact with live web interfaces, execute workflows, and extract structured information.

This project was built for the **TinyFish $2M Pre-Accelerator Hackathon**.

---

## Live Demo

Frontend
https://webops-agent-tinyfish.vercel.app

Backend API
https://webops-agent-tinyfish-production.up.railway.app

---

## Overview

Most AI tools today generate text or analyze data, but they cannot actually **perform tasks on the web**.

WebOps Agent bridges this gap by enabling an AI agent to:

* Open websites
* Navigate through pages
* Perform multi-step actions
* Extract useful information

The system displays the entire execution process in a **visual dashboard**, making AI behavior transparent and easy to understand.

---

## Key Features

* Autonomous web agent powered by TinyFish API
* Multi-step task execution on real websites
* Interactive dashboard showing agent activity
* Real-time timeline of agent actions
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

### Frontend

* React (Vite)
* JavaScript
* CSS

### Backend

* Node.js
* Express.js

### AI Infrastructure

* TinyFish Web Agent API

---

## Project Structure

webops-agent-tinyfish
|
|-- backend
| |-- agent.js
| |-- server.js
| |-- package.json
| |-- .env.example
|
|-- frontend
| |-- index.html
| |-- package.json
| |-- src
| |-- App.jsx
| |-- main.jsx
|
|-- .gitignore
|-- README.md

---

## Local Setup

### 1. Clone the Repository

* git clone https://github.com/maniksharma22/webops-agent-tinyfish.git
* cd webops-agent-tinyfish

---

### 2. Backend Setup

* cd backend
* npm install

* Create a `.env` file:

* TINYFISH_API_KEY=your_api_key_here
* PORT=3000

Run the backend:

* npm start

---

### 3. Frontend Setup

Open a new terminal:

* cd frontend
* npm install
* npm run dev

Frontend will run at:

http://localhost:5173

---

## Deployment

* Frontend
* Deploy using **Vercel**

* Backend
* Deploy using **Railway**

After deployment, update the frontend API endpoint to point to the deployed backend.

---

## How It Works

1. User enters a website and a task description.
2. Backend sends the request to the TinyFish Web Agent API.
3. The AI agent navigates the website and performs the requested workflow.
4. The dashboard visualizes the agent’s actions step-by-step.

---

## Author

Manik Sharma
Computer Science Engineer

---

## Acknowledgement

This project was developed using the **TinyFish Web Agent API** as part of the **TinyFish Pre-Accelerator Hackathon**.





