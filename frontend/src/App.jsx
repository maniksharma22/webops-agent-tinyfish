import { useState, useEffect } from "react";

function App() {

  const [url, setUrl] = useState("")
  const [goal, setGoal] = useState("")
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [sitePreview, setSitePreview] = useState("generic")
  const [visibleSteps, setVisibleSteps] = useState([])
  const [showCards, setShowCards] = useState(false)


  const runAgent = async () => {

    setLoading(true)
    setShowCards(true)
    setVisibleSteps([])
    setResult(null)

    try {

      const response = await fetch("https://webops-agent-tinyfish-production.up.railway.app/run-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, goal })
      })

      const data = await response.json()
      console.log(data) // DEBUG
      setResult(data)

    } catch {
      setResult({ error: "Agent failed to run" })
    }

    // ❌ removed setLoading(false)
  }


  const parseSteps = () => {

    if (!result?.rawOutput) return []

    return result.rawOutput
      .split("\n")
      .filter(line => line.includes("PROGRESS") || line.includes("STARTED"))
      .map(line => {
        try {
          const json = JSON.parse(line.replace("data: ", ""))
          return json.purpose || json.type
        } catch {
          return null
        }
      })
      .filter(step => step && step.trim() !== "")
  }


  useEffect(() => {

    const steps = parseSteps()
    if (steps.length === 0) return

    let i = 0

    const interval = setInterval(() => {

      if (steps[i]) {
        setVisibleSteps(prev => [...prev, steps[i]])
      }

      i++

      if (i === 1) {
        setShowCards(false)
        setLoading(false) // ✅ STOP loading when steps begin
      }

      if (i >= steps.length) {
        clearInterval(interval)
      }

    }, 800)

    return () => clearInterval(interval)

  }, [result])


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

          {/* ✅ FIXED LOADING */}
          {loading && visibleSteps.length === 0 && (
            <div className="loading">
              <div className="connection-loader">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
              <p>Connecting AI agent to live web...</p>
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

    </div>
  )
}

export default App
