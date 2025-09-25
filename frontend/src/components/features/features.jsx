import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Animation from '../animation/bg_animation'

const QuoteModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [service, setService] = useState("");
  const [loading, setLoading] = useState(true);
  
  const [price, setPrice] = useState(0);
  const [form, setForm] = useState({
    name: "",
    email: "",
    msg: "",
  });
  const [submitted, setSubmitted] = useState(false);
    useEffect(() => {
     
      const timer = setTimeout(() => setLoading(false), 2000);
  
      return () => clearTimeout(timer);
    }, []);

  const openQuote = (srv, prc) => {
    setService(srv);
    setPrice(prc);
    setForm({ name: "", email: "", msg: "" }); 
    setSubmitted(false);
    setShowModal(true);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sendQuote = () => {
    if (!form.name || !form.email) {
      alert("Please fill out your name and email.");
      return;
    }
    setSubmitted(true);
  };

     if (loading) {
    return (
      <Animation/>
  );
};
  return (
    <>
    
      <h1 className="font-bold text-black flex justify-center items-center pt-10 pb-0">Our Services</h1>
      <div className="lg:flex block">
     
      <div className="col-md-4 mt-5 px-3">
          <div className="card p-3 h-100">
             <h5>Incident Response — Rapid</h5>
             <div className="price">₹49,999</div>
             <p className="small-muted">
               24/7 rapid response & forensic snapshot
             </p>
             <button
               className="btn btn-primary mt-2"
               onClick={() => openQuote("Incident Response - Rapid", 49999)}
             >
               Request Quote
             </button>
           </div>
         </div>
         <div className="col-md-4 mt-10 px-3">
          <div className="card p-3 h-100">
             <h5>Incident Response — Rapid</h5>
             <div className="price">₹49,999</div>
             <p className="small-muted">
               24/7 rapid response & forensic snapshot
             </p>
             <button
               className="btn btn-primary mt-2"
               onClick={() => openQuote("Incident Response - Rapid", 49999)}
             >
               Request Quote
             </button>
           </div>
         </div>
         <div className="col-md-4 mt-10 px-3">
          <div className="card p-3 h-100">
             <h5>Incident Response — Rapid</h5>
             <div className="price">₹49,999</div>
             <p className="small-muted">
               24/7 rapid response & forensic snapshot
             </p>
             <button
               className="btn btn-primary mt-2"
               onClick={() => openQuote("Incident Response - Rapid", 49999)}
             >
               Request Quote
             </button>
           </div>
         </div>
           
      </div>
      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-lg modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Request quote — {service}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                {!submitted ? (
                  <>
                    <p>
                      <strong>{service}</strong> — Indicative price:{" "}
                      <strong>₹{price}</strong>
                    </p>

                    <div className="mb-2">
                      <label className="form-label">Company / Name</label>
                      <input
                        name="name"
                        className="form-control"
                        value={form.name}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-2">
                      <label className="form-label">Email</label>
                      <input
                        name="email"
                        type="email"
                        className="form-control"
                        value={form.email}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-2">
                      <label className="form-label">Details</label>
                      <textarea
                        name="msg"
                        className="form-control"
                        rows="3"
                        value={form.msg}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </>
                ) : (
                  <p>
                    Thanks, <strong>{form.name || "Demo"}</strong> — request
                    received. We’ll contact{" "}
                    <strong>{form.email || "demo@example.com"}</strong>.
                  </p>
                )}
              </div>

              <div className="modal-footer">
                {!submitted && (
                  <button className="btn btn-primary" onClick={sendQuote}>
                    Send request
                  </button>
                )}
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuoteModal;

