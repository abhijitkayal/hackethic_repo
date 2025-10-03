import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Animation from "../animation/bg_animation";

const QuoteModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [service, setService] = useState("");
  const [loading, setLoading] = useState(true);
  const [price, setPrice] = useState(0);
  const [form, setForm] = useState({ name: "", email: "", msg: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);


  const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};


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

  const sendQuote = async () => {
  if (!form.name || !form.email) {
    alert("Please fill out your name and email.");
    return;
  }

  const isLoaded = await loadRazorpayScript();
  if (!isLoaded) {
    alert("Razorpay SDK failed to load. Check your internet.");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: price, currency: "INR" }),
    });
    const order = await res.json();

    if (!order.id) {
      alert("Failed to create order");
      return;
    }

    const options = {
      key: "rzp_test_RL5AnT6meWeDmw",
      amount: order.amount,
      currency: order.currency,
      name: "CyberSec Academy",
      description: service,
      order_id: order.id,
      prefill: {
        name: form.name,
        email: form.email,
      },
      handler: function (response) {
        console.log("Payment success:", response);
        setSubmitted(true);
      },
      theme: { color: "#3399cc" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (error) {
    console.error("Payment error:", error);
  }
};

  if (loading) return <Animation />;

  return (
    <>
      <h1 className="font-bold text-black flex justify-center items-center pt-10 pb-0">
        Our Services
      </h1>

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
     

      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Request quote — {service}</h5>
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
                      <strong>{service}</strong> — Price:{" "}
                      <strong>₹{price}</strong>
                    </p>
                    <div className="mb-2">
                      <label className="form-label">Name</label>
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
                     Thanks <strong>{form.name}</strong>, payment received.
                    Confirmation sent to <strong>{form.email}</strong>.
                  </p>
                )}
              </div>
              <div className="modal-footer">
                {!submitted && (
                  <button className="btn btn-primary" onClick={sendQuote}>
                    Pay & Confirm
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
      {/* <div className="lg:flex block"> */}
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
      {/* </div> */}

      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Request quote — {service}</h5>
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
                      <strong>{service}</strong> — Price:{" "}
                      <strong>₹{price}</strong>
                    </p>
                    <div className="mb-2">
                      <label className="form-label">Name</label>
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
                    Thanks <strong>{form.name}</strong>, payment received.
                    Confirmation sent to <strong>{form.email}</strong>.
                  </p>
                )}
              </div>
              <div className="modal-footer">
                {!submitted && (
                  <button className="btn btn-primary" onClick={sendQuote}>
                    Pay & Confirm
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
  {/* <div className="lg:flex block"> */}
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
      {/* </div> */}

      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Request quote — {service}</h5>
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
                      <strong>{service}</strong> — Price:{" "}
                      <strong>₹{price}</strong>
                    </p>
                    <div className="mb-2">
                      <label className="form-label">Name</label>
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
                     Thanks <strong>{form.name}</strong>, payment received.
                    Confirmation sent to <strong>{form.email}</strong>.
                  </p>
                )}
              </div>
              <div className="modal-footer">
                {!submitted && (
                  <button className="btn btn-primary" onClick={sendQuote}>
                    Pay & Confirm
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
       </div>
    
      
    </>
  );
};

export default QuoteModal;


