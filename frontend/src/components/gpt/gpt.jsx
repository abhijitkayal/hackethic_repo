import React, { useState, useRef, useEffect } from "react";
import Animation from '../animation/bg_animation'

const AiAgent = () => {
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const chatBoxRef = useRef(null);
  const [loading,setLoading]=useState(true);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chatMessages]);
    useEffect(() => {
      const timer = setTimeout(() => setLoading(false), 2000);
  
      return () => clearTimeout(timer);
    }, []);

  const handleChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    setChatMessages((prev) => [...prev, { from: "You", text: chatInput }]);
    const userMessage = chatInput;
    setChatInput("");


    setTimeout(() => {
      let response = "Demo AI response: consider the Beginner OSINT Course for fundamentals.";
      const lower = userMessage.toLowerCase();
      if (lower.includes("course")) {
        response = "We recommend Beginner OSINT (₹1,299) or Ethical Hacking (₹4,499).";
      } else if (lower.includes("price")) {
        response = "Course prices (INR): Beginner OSINT ₹1,299; Ethical Hacking ₹4,499; AI in Cybersecurity ₹2,999.";
      }
      setChatMessages((prev) => [...prev, { from: "Bot", text: response }]);
    }, 600);
  };

  const showPrivacy = () => {
    alert("Privacy & Legal: This is a demo AI chat for learning purposes only.");
  };
     if (loading) {
    return (
      <Animation/>
  );
};

  return (
    <section id="ai" className="py-5">
      <h2>AI Agent (Mock)</h2>
      <div className="row g-3 d-flex align-items-stretch">
      
        <div className="col-md-6">
          <div className="card p-3">
            <div
              ref={chatBoxRef}
              className="chat mb-2"
              role="log"
              aria-live="polite"
              style={{ maxHeight: "300px", overflowY: "auto" }}
            >
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`mb-1 ${msg.from === "You" ? "text-end" : "text-start"}`}
                >
                  <span
                    className={`badge ${msg.from === "You" ? "bg-primary" : "bg-secondary"}`}
                  >
                    <strong>{msg.from}:</strong> {msg.text}
                  </span>
                </div>
              ))}
            </div>
            <form className="d-flex" onSubmit={handleChat}>
              <input
                type="text"
                className="form-control me-2"
                placeholder="Ask about courses, OSINT or services"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                required
              />
              <button className="btn btn-primary">Send</button>
            </form>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card p-3">
            <h6>How we support learners</h6>
            <ul className="small">
              <li>Hands-on labs & capstone</li>
              <li>Mentor feedback on projects</li>
              <li>Certificate on completion</li>
            </ul>
            <div className="mt-3">
              <button
                className="btn btn-outline-secondary"
                onClick={showPrivacy}
              >
                Privacy & Legal
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiAgent;
