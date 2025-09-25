import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Animation from '../animation/bg_animation';

const Courses = () => {
  const [showEnroll, setShowEnroll] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState({ title: "", price: 0 });
  const [form, setForm] = useState({ name: "", email: "", coupon: "" });
  const [finalPrice, setFinalPrice] = useState(0);
  const [couponMsg, setCouponMsg] = useState("");
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const coupons = {
    SAVE10: 0.1,
    STUDENT20: 0.2,
  };

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("hack_enrolls") || "[]");
    setEnrollments(saved);
  }, []);
    useEffect(() => {
      const saved = JSON.parse(localStorage.getItem("hack_enrolls") || "[]");
      setEnrollments(saved);
  
      const timer = setTimeout(() => setLoading(false), 2000);
  
      return () => clearTimeout(timer);
    }, []);

  useEffect(() => {
    if (!selectedCourse.price) return;
    const code = form.coupon.trim().toUpperCase();
    const discount = coupons[code] || 0;
    const final = Math.round(selectedCourse.price * (1 - discount));
    setFinalPrice(final);

    if (discount > 0) {
      setCouponMsg(`${discount * 100}% discount applied!`);
    } else if (code) {
      setCouponMsg("Invalid coupon code");
    } else {
      setCouponMsg("");
    }
  }, [form.coupon, selectedCourse]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const openEnroll = (title, price) => {
    setSelectedCourse({ title, price });
    setForm({ name: "", email: "", coupon: "" });
    setShowEnroll(true);
  };

  const completeEnroll = () => {
    const name = form.name.trim() || "Demo User";
    const email = form.email.trim() || "demo@example.com";
    const coupon = form.coupon.trim().toUpperCase();
    const discount = coupons[coupon] || 0;
    const final = Math.round(selectedCourse.price * (1 - discount));

    const newEnroll = {
      title: selectedCourse.title,
      name,
      email,
      price: selectedCourse.price,
      coupon: coupon || null,
      final,
      date: new Date().toISOString(),
      progress: Math.floor(Math.random() * 50) + 10,
    };

    const updated = [...enrollments, newEnroll];
    setEnrollments(updated);
    localStorage.setItem("hack_enrolls", JSON.stringify(updated));

    alert(`Enrollment successful — ₹${final}. Check Dashboard.`);
    setShowEnroll(false);
  };


  const previewCourse = (title) => {
    setSelectedCourse({ title, price: 0 });
    setShowPreview(true);
  };
    if (loading) {
    return (
      <Animation/>
  );
};
  return (
    <>
    
   
 
    <section id="courses" className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Courses & Prices</h2>
        <div className="small-muted">
          Choose a plan and apply coupon at checkout
        </div>
      </div>

      <div className="row g-3 d-flex align-items-stretch">
        {/* Course 1 */}
        <div className="col-md-4">
          <div className="card p-3 h-100">
            <div className="d-flex justify-content-between">
              <h5>Beginner OSINT Course</h5>
              <div>
                <span className="text-decoration-line-through">₹1,999</span>{" "}
                <span className="badge bg-success">₹1,299</span>
              </div>
            </div>
            <p className="small-muted">4 weeks · Self-paced · Certificate</p>
            <ul className="small">
              <li>Intro to OSINT</li>
              <li>Legal & ethical considerations</li>
              <li>Practical labs</li>
            </ul>
            <div className="mt-3 d-flex gap-2">
              <button
                className="btn btn-primary"
                onClick={() => openEnroll("Beginner OSINT Course", 1299)}
              >
                Enroll
              </button>
              <button
                className="btn btn-outline-secondary"
                onClick={() => previewCourse("Beginner OSINT Course")}
              >
                Preview
              </button>
            </div>
          </div>
        </div>

        {/* Course 2 */}
        <div className="col-md-4">
          <div className="card p-3 h-100">
            <div className="d-flex justify-content-between">
              <h5>Ethical Hacking — Intermediate</h5>
              <div>
                <span className="badge bg-warning text-dark">₹4,499</span>
              </div>
            </div>
            <p className="small-muted">8 weeks · Projects · Certificate</p>
            <ul className="small">
              <li>Web app pentesting</li>
              <li>Network basics & tools</li>
              <li>Report writing</li>
            </ul>
            <div className="mt-3 d-flex gap-2">
              <button
                className="btn btn-primary"
                onClick={() =>
                  openEnroll("Ethical Hacking — Intermediate", 4499)
                }
              >
                Enroll
              </button>
              <button
                className="btn btn-outline-secondary"
                onClick={() => previewCourse("Ethical Hacking — Intermediate")}
              >
                Preview
              </button>
            </div>
          </div>
        </div>

        {/* Course 3 */}
        <div className="col-md-4">
          <div className="card p-3 h-100">
            <div className="d-flex justify-content-between">
              <h5>AI in Cybersecurity — Intro</h5>
              <div>
                <span className="text-decoration-line-through">₹3,499</span>{" "}
                <span className="badge bg-info text-dark">₹2,999</span>
              </div>
            </div>
            <p className="small-muted">6 weeks · Concepts & tools</p>
            <ul className="small">
              <li>ML basics</li>
              <li>Defensive AI</li>
              <li>Practical demos</li>
            </ul>
            <div className="mt-3 d-flex gap-2">
              <button
                className="btn btn-primary"
                onClick={() => openEnroll("AI in Cybersecurity — Intro", 2999)}
              >
                Enroll
              </button>
              <button
                className="btn btn-outline-secondary"
                onClick={() => previewCourse("AI in Cybersecurity — Intro")}
              >
                Preview
              </button>
            </div>
          </div>
        </div>
      </div>

      {showEnroll && (
        <div
          className="modal fade show"
          style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Enroll — {selectedCourse.title}
                </h5>
                <button
                  className="btn-close"
                  onClick={() => setShowEnroll(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  <strong>{selectedCourse.title}</strong>
                </p>
                <p className="small-muted">
                  Price: <span className="fw-semibold">₹{selectedCourse.price}</span>
                </p>

                <div className="mb-2">
                  <label className="form-label">Your name</label>
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
                  <label className="form-label">Coupon (optional)</label>
                  <input
                    name="coupon"
                    className="form-control"
                    value={form.coupon}
                    onChange={handleChange}
                  />
                </div>

                <div className="mt-2 small-muted">
                  Final price: <strong>₹{finalPrice}</strong>{" "}
                  {couponMsg && <span>({couponMsg})</span>}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowEnroll(false)}
                >
                  Close
                </button>
                <button className="btn btn-primary" onClick={completeEnroll}>
                  Pay & Enroll
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showPreview && (
        <div
          className="modal fade show"
          style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Course preview — {selectedCourse.title}
                </h5>
                <button
                  className="btn-close"
                  onClick={() => setShowPreview(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  <strong>{selectedCourse.title}</strong>
                </p>
                <p className="small-muted">Syllabus preview:</p>
                <ul>
                  <li>Week 1 — Intro & ethics</li>
                  <li>Week 2 — Tools & labs</li>
                  <li>Week 3 — Project work</li>
                  <li>Week 4 — Capstone & certificate</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
     </>
  );
};

export default Courses;
