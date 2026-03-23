import { useState, useEffect } from "react";

function App() {

  const [url, setUrl] = useState("")
  const [goal, setGoal] = useState("")
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [sitePreview, setSitePreview] = useState("generic")
  const [visibleSteps, setVisibleSteps] = useState([])
  const [showCards, setShowCards] = useState(false)
const loadingMessages = [
  "Connecting AI agent to live web...",
  "Initializing browser...",
  "Analyzing website...",
  "Extracting data..."
]

const [currentMsg, setCurrentMsg] = useState(0)

const runAgent = async () => {
  try {
    if (!url || !goal) {
      alert("Please enter website and goal first❗")
      return
    }

    setLoading(true);
    setVisibleSteps([]);
    setShowCards(true);
    setResult(null);
    setCurrentMsg(0);

    const response = await fetch("https://webops-agent-tinyfish-production-d02d.up.railway.app/run-agent-stream", {
        setTimeout(() => {
        setLoading(false);
        setVisibleSteps(prev => [
          ...prev,
          "Finalizing results...",
          "Task completed"
        ]);
      }, 15000);
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url, goal })
    });

    if (!response.ok) {
      throw new Error("Server error");
    }


 const reader = response.body.getReader();
const decoder = new TextDecoder("utf-8");

while (true) {
  const { done, value } = await reader.read();
  if (done) break;

  const chunk = decoder.decode(value);
  const lines = chunk.split("\n");

  for (let line of lines) {
    if (line.startsWith("data:")) {
      try {
        const json = JSON.parse(line.replace("data:", "").trim());

        if (json.type === "PROGRESS" && json.purpose) {
          setVisibleSteps(prev => [...prev, json.purpose]);
        }
        if (json.type === "COMPLETE") {
         setVisibleSteps(prev => [...prev, "Task completed successfully"]);
         setLoading(false);
        }

        if (json.type === "COMPLETE") {
          setLoading(false);
        }

      } catch {}
    }
  }
}

  } catch (error) {
    setResult({ error: error.message });
    setLoading(false);
    setShowCards(false);
  }
};

useEffect(() => {

  if (!loading) return

  const interval = setInterval(() => {
    setCurrentMsg(prev => {
      if (prev < loadingMessages.length - 1) return prev + 1;
      return prev;
    });
  }, 1500)

  return () => clearInterval(interval)

}, [loading])

return (

  <div className="app">

    <div className="header">
      <h1>WebOps Agent</h1>
      <p className="subtitle">
        Autonomous AI Web Agent powered by TinyFish
      </p>
      <div className="ai-status">AI Agent Online</div>
    </div>

    <div className="dashboard">

      <div className="left-panel">

        <h3>Example Tasks</h3>

        <button className="task-btn"
          onClick={() => {
            setUrl("https://amazon.com")
            setGoal("Find top 5 laptops under $1000")
            setSitePreview("amazon")
          }}>
          Amazon Laptop Search
        </button>

        <button className="task-btn"
          onClick={() => {
            setUrl("https://linkedin.com")
            setGoal("Find Java developer jobs in India")
            setSitePreview("linkedin")
          }}>
          LinkedIn Jobs
        </button>

        <button className="task-btn"
          onClick={() => {
            setUrl("https://github.com")
            setGoal("Find trending AI repositories")
            setSitePreview("github")
          }}>
          GitHub AI Repos
        </button>

        <h4>Website</h4>

        <input
          value={url}
          placeholder="Enter website..."
          onChange={(e) => setUrl(e.target.value)}
        />

        <h4>Agent Goal</h4>

        <textarea
          value={goal}
          placeholder="Describe the task..."
          onChange={(e) => setGoal(e.target.value)}
        />

        <button className="run-btn" onClick={runAgent}>
          Run Autonomous Agent
        </button>

      </div>

      <div className="right-panel">

        {showCards && (
          <div className="floating-container">
            <div className="floating-card">AI Web Data</div>
            <div className="floating-card second">Automation</div>
          </div>
        )}

        <h3>Agent Activity</h3>

        {loading && (
          <div className="loading">
            <div className="connection-loader">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
            <p>{loadingMessages[currentMsg]}</p>
          </div>
        )}

        <div className="steps-container">

        {visibleSteps.map((step, i) => (
          <div key={i} className="step">
            ● {step}
          </div>
        ))}

          {result?.error && (
            <p className="error">{result.error}</p>
          )}

        </div>
      </div>
    </div>
      
      <style>{`
      
        body{
        margin:0;
        background:#0f172a;
        font-family:Inter,sans-serif;
        overflow-x:hidden;
        }
        
        .app{
        min-height:100vh;
        color:white;
        }
        
        .header{
        padding:30px 50px;
        }
        
        .subtitle{
        color:#94a3b8;
        margin-top:4px;
        }
        
        .ai-status{
        margin-top:10px;
        display:inline-block;
        padding:4px 12px;
        border-radius:20px;
        background:#1e293b;
        border:1px solid #334155;
        color:#38bdf8;
        font-size:12px;
        }
        
        .dashboard{
        display:grid;
        grid-template-columns:380px 1350px;
        gap:30px;
        padding:0 50px 40px 50px;
        }
        
        
        /* LEFT PANEL */
        
        .left-panel{
        background:#1e293b;
        padding:22px;
        border-radius:10px;
        display:flex;
        flex-direction:column;
        gap:12px;
        }
        
        .left-panel h4{
        margin-top:10px;
        }
        
        input,textarea{
        width:100%;
        padding:10px 12px;
        border-radius:6px;
        border:none;
        background:#020617;
        color:white;
        box-sizing:border-box;
        }
        
        textarea{
        height:90px;
        resize:none;
        }
        
        .task-btn{
        background:#020617;
        border:none;
        color:white;
        padding:10px;
        border-radius:6px;
        cursor:pointer;
        }
        
        .task-btn:hover{
        background:#0f172a;
        }
        
        .run-btn{
        margin-top:10px;
        padding:12px;
        border:none;
        border-radius:6px;
        background:#3b82f6;
        color:white;
        cursor:pointer;
        }
        
        .run-btn:hover{
        background:#2563eb;
        }
        
        
        /* RIGHT PANEL */
        
        .right-panel{
        background:#1e293b;
        padding:22px;
        border-radius:10px;
        width:1350px;
        height:calc(100vh - 150px);
        position:relative;
        overflow:hidden;
        }
        
        
        /* FLOATING CARDS */
        
        .floating-container{
        position:absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
        pointer-events:none;
        }
        
        .floating-card{
        position:absolute;
        width:260px;
        height:120px;
        border-radius:12px;
        background:rgba(255,255,255,0.04);
        // backdrop-filter:blur(18px);
        // filter:blur(1px);
        opacity:.28;
        display:flex;
        align-items:center;
        justify-content:center;
        font-size:14px;
        opacity:.35;
        animation:float 10s infinite ease-in-out;
        transform:rotate(-8deg);
        }
        
        .floating-card.second{
        top:260px;
        right:120px;
        transform:rotate(7deg);
        animation-delay:2s;
        }
        
        
        .floating-card:first-child{
        top:80px;
        left:200px;
        }
        
        .linkedin{border:1px solid #0a66c2;color:#0a66c2;}
        .github{border:1px solid white;color:white;}
        .amazon{border:1px solid #ff9900;color:#ff9900;}
        
        @keyframes float{
        
        0%{
        transform:translate(0px,0px) rotate(-8deg);
        }
        
        25%{
        transform:translate(25px,-20px) rotate(-6deg);
        }
        
        50%{
        transform:translate(-20px,-35px) rotate(-9deg);
        }
        
        75%{
        transform:translate(-25px,15px) rotate(-6deg);
        }
        
        100%{
        transform:translate(0px,0px) rotate(-8deg);
        }
        
        }
        
        
        /* STEPS */
        
        .steps-container{
        margin-top:12px;
        height:100%;
        overflow-y:auto;
        }
        
        .step{
        padding:10px;
        border-bottom:1px solid #334155;
        animation:fadeIn .5s ease;
        }
        
        @keyframes fadeIn{
        from{opacity:0;transform:translateY(10px)}
        to{opacity:1;transform:translateY(0)}
        }
        
        
        /* LOADER */
        
        .connection-loader{
        display:flex;
        gap:10px;
        margin-top:10px;
        }
        
        .dot{
        width:12px;
        height:12px;
        background:#3b82f6;
        border-radius:50%;
        animation:pulse 1s infinite;
        }
        
        .dot:nth-child(2){animation-delay:.2s}
        .dot:nth-child(3){animation-delay:.4s}
        
        @keyframes pulse{
        0%{transform:scale(.6);opacity:.4}
        50%{transform:scale(1.2);opacity:1}
        100%{transform:scale(.6);opacity:.4}
        }
        
        .error{
        color:#ff6b6b;
        margin-top:10px;
        }
        
        
        /* RESPONSIVE */
        
        @media(max-width:1024px){
        
        .dashboard{
        grid-template-columns:1fr;
        }
        
        .right-panel{
        width:100%;
        height:auto;
        }
        
        }
        
        @media(max-width:480px){
        
        .header{
        padding:20px;
        }
        
        .dashboard{
        padding:0 20px 40px 20px;
        }
        
        }
        
        `}
      </style>
        
  </div>

  )
}
export default App
