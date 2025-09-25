// import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import "bootstrap-icons/font/bootstrap-icons.css";

// const Hero = () => {
//   // Enrollment & modal state
//   const [showEnroll, setShowEnroll] = useState(false);
//   const [showPreview, setShowPreview] = useState(false);
//   const [selectedCourse, setSelectedCourse] = useState({ title: "", price: 0 });
//   const [form, setForm] = useState({ name: "", email: "", coupon: "" });
//   const [finalPrice, setFinalPrice] = useState(0);
//   const [couponMsg, setCouponMsg] = useState("");
//   const [enrollments, setEnrollments] = useState([]);

//   // Coupons
//   const coupons = {
//     SAVE10: 0.1,
//     STUDENT20: 0.2,
//   };

//   // Load saved enrollments from localStorage
//   useEffect(() => {
//     const saved = JSON.parse(localStorage.getItem("hack_enrolls") || "[]");
//     setEnrollments(saved);
//   }, []);

//   // Update final price when coupon or course changes
//   useEffect(() => {
//     if (!selectedCourse.price) return;
//     const code = form.coupon.trim().toUpperCase();
//     const discount = coupons[code] || 0;
//     const final = Math.round(selectedCourse.price * (1 - discount));
//     setFinalPrice(final);

//     if (discount > 0) setCouponMsg(`${discount * 100}% discount applied!`);
//     else if (code) setCouponMsg("Invalid coupon code");
//     else setCouponMsg("");
//   }, [form.coupon, selectedCourse]);

//   // Handle form input changes
//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   // Open enroll modal
//   const openEnroll = (title, price) => {
//     setSelectedCourse({ title, price });
//     setForm({ name: "", email: "", coupon: "" });
//     setShowEnroll(true);
//   };

//   // Complete enrollment
//   const completeEnroll = () => {
//     const name = form.name.trim() || "Demo User";
//     const email = form.email.trim() || "demo@example.com";
//     const coupon = form.coupon.trim().toUpperCase();
//     const discount = coupons[coupon] || 0;
//     const final = Math.round(selectedCourse.price * (1 - discount));

//     const newEnroll = {
//       title: selectedCourse.title,
//       name,
//       email,
//       price: selectedCourse.price,
//       coupon: coupon || null,
//       final,
//       date: new Date().toISOString(),
//       progress: Math.floor(Math.random() * 50) + 10,
//     };

//     const updated = [...enrollments, newEnroll];
//     setEnrollments(updated);
//     localStorage.setItem("hack_enrolls", JSON.stringify(updated));

//     alert(`Enrollment successful — ₹${final}. Check Dashboard.`);
//     setShowEnroll(false);
//   };

//   // Open preview modal
//   const previewCourse = (title) => {
//     setSelectedCourse({ title, price: 0 });
//     setShowPreview(true);
//   };

//   return (
    // <section id="home" className="hero">
    //   <div className="container">
    //     <div className="row align-items-center">
    //       {/* Left Column */}
    //       <div className="col-lg-7">
    //         <h1 className="display-5">
    //           Practical, ethical OSINT & Cybersecurity learning — with hands-on
    //           projects
    //         </h1>
    //         <p className="lead muted">
    //           Courses, tools and services tailored for learners and teams. Prices
    //           shown in <strong>INR (₹)</strong>.
    //         </p>
    //         <div className="d-flex gap-2 flex-wrap">
    //           <a href="#courses" className="btn btn-light btn-lg btn-cta">
    //             <i className="bi bi-journal-bookmark me-1"></i> View Courses
    //           </a>
    //           <a href="#services" className="btn btn-light btn-lg btn-cta">
    //             <i className="bi bi-gear me-1"></i> Services & Pricing
    //           </a>
    //         </div>
    //         <p className="mt-3 small-muted">
    //           This site follows the structure you provided in the uploaded PDF (OSINT disclaimers included).
    //         </p>
    //       </div>

    //       {/* Right Column */}
    //       <div className="col-lg-5 mt-4 mt-lg-0">
    //         {/* Quick Starter Card */}
    //         <div className="card p-3">
    //           <h5 className="mb-2">Quick starter bundle</h5>
    //           <p className="small-muted mb-1">Beginner-focused</p>
    //           <div className="d-flex justify-content-between align-items-center">
    //             <div>
    //               <div className="price">₹1,299</div>
    //               <div className="small-muted">One-time, self-paced</div>
    //             </div>
    //             <div>
    //               <button
    //                 className="btn btn-primary btn-sm"
    //                 onClick={() => openEnroll("Beginner OSINT Course", 1299)}
    //               >
    //                 Enroll
    //               </button>
    //             </div>
    //           </div>
    //         </div>

    //         {/* Blog Card */}
    //         <div className="card p-3 mt-3">
    //           <h6 className="mb-1">Latest blog</h6>
    //           <div className="small-muted">
    //             How to do ethical OSINT — guidelines
    //           </div>
    //           <a className="stretched-link small" href="#osint">
    //             Read
    //           </a>
    //         </div>
    //       </div>
    //     </div>

    //     {/* Enroll Modal */}
    //     {showEnroll && (
    //       <div className="modal fade show" style={{ display: "block" }}>
    //         <div className="modal-dialog modal-lg">
    //           <div className="modal-content">
    //             <div className="modal-header">
    //               <h5 className="modal-title">Enroll — {selectedCourse.title}</h5>
    //               <button className="btn-close" onClick={() => setShowEnroll(false)}></button>
    //             </div>
    //             <div className="modal-body">
    //               <p>
    //                 <strong>{selectedCourse.title}</strong> — Price: <strong>₹{selectedCourse.price}</strong>
    //               </p>
    //               <div className="mb-2">
    //                 <label className="form-label">Your name</label>
    //                 <input
    //                   name="name"
    //                   className="form-control"
    //                   value={form.name}
    //                   onChange={handleChange}
    //                 />
    //               </div>
    //               <div className="mb-2">
    //                 <label className="form-label">Email</label>
    //                 <input
    //                   name="email"
    //                   type="email"
    //                   className="form-control"
    //                   value={form.email}
    //                   onChange={handleChange}
    //                 />
    //               </div>
    //               <div className="mb-2">
    //                 <label className="form-label">Coupon (optional)</label>
    //                 <input
    //                   name="coupon"
    //                   className="form-control"
    //                   value={form.coupon}
    //                   onChange={handleChange}
    //                   placeholder="Enter coupon code"
    //                 />
    //                 <div className="small-muted mt-1">{couponMsg}</div>
    //               </div>
    //               <p>Final price: <strong>₹{finalPrice}</strong></p>
    //             </div>
    //             <div className="modal-footer">
    //               <button className="btn btn-secondary" onClick={() => setShowEnroll(false)}>
    //                 Close
    //               </button>
    //               <button className="btn btn-primary" onClick={completeEnroll}>
    //                 Pay & Enroll
    //               </button>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     )}

    //     {/* Preview Modal */}
    //     {showPreview && (
    //       <div className="modal fade show" style={{ display: "block" }}>
    //         <div className="modal-dialog modal-lg">
    //           <div className="modal-content">
    //             <div className="modal-header">
    //               <h5 className="modal-title">Course preview — {selectedCourse.title}</h5>
    //               <button className="btn-close" onClick={() => setShowPreview(false)}></button>
    //             </div>
    //             <div className="modal-body">
    //               <p><strong>{selectedCourse.title}</strong></p>
    //               <p className="small-muted">Syllabus preview:</p>
    //               <ul>
    //                 <li>Week 1 — Intro & ethics</li>
    //                 <li>Week 2 — Tools & labs</li>
    //                 <li>Week 3 — Project work</li>
    //                 <li>Week 4 — Capstone & certificate</li>
    //               </ul>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     )}
    //   </div>
    // </section>
//   );
// };

// export default Hero;
  


import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import './hero.css'
import Animation from '../animation/bg_animation'
import { Link } from "react-router-dom";

const Hero = () => {

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

    const timer = setTimeout(() => setLoading(false), 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!selectedCourse.price) return;
    const code = form.coupon.trim().toUpperCase();
    const discount = coupons[code] || 0;
    const final = Math.round(selectedCourse.price * (1 - discount));
    setFinalPrice(final);

    if (discount > 0) setCouponMsg(`${discount * 100}% discount applied!`);
    else if (code) setCouponMsg("Invalid coupon code");
    else setCouponMsg("");
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
    <section id="home" className="hero">
      <div className="container">
           <section id="home" className="hero">
      <div className="container">
        <div className="row align-items-center">
        
          <div className="col-lg-7">
            <h1 className="display-5">
              Practical, ethical OSINT & Cybersecurity learning — with hands-on
              projects
            </h1>
            <p className="lead muted">
              Courses, tools and services tailored for learners and teams. Prices
              shown in <strong>INR (₹)</strong>.
            </p>
            <div className="d-flex gap-2 flex-wrap">
              <Link to="/courses" className="btn btn-light btn-lg btn-cta">
                <i className="bi bi-journal-bookmark me-1"></i> View Courses
              </Link>
              <Link to="/features" className="btn btn-light btn-lg btn-cta">
                <i className="bi bi-gear me-1"></i> Services & Pricing
              </Link>
            </div>
            <p className="mt-3 small-muted">
              This site follows the structure you provided in the uploaded PDF (OSINT disclaimers included).
            </p>
          </div>

          <div className="col-lg-5 mt-4 mt-lg-0">
        
            <div className="card p-3">
              <h5 className="mb-2">Quick starter bundle</h5>
              <p className="small-muted mb-1">Beginner-focused</p>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="price">₹1,299</div>
                  <div className="small-muted">One-time, self-paced</div>
                </div>
                <div>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => openEnroll("Beginner OSINT Course", 1299)}
                  >
                    Enroll
                  </button>
                </div>
              </div>
            </div>

            <div className="card p-3 mt-3">
              <h6 className="mb-1">Latest blog</h6>
              <div className="small-muted">
                How to do ethical OSINT — guidelines
              </div>
              <a className="stretched-link small" href="#osint">
                Read
              </a>
            </div>
          </div>
        </div>

       
        {showEnroll && (
          <div className="modal fade show" style={{ display: "block" }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Enroll — {selectedCourse.title}</h5>
                  <button className="btn-close" onClick={() => setShowEnroll(false)}></button>
                </div>
                <div className="modal-body">
                  <p>
                    <strong>{selectedCourse.title}</strong> — Price: <strong>₹{selectedCourse.price}</strong>
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
                      placeholder="Enter coupon code"
                    />
                    <div className="small-muted mt-1">{couponMsg}</div>
                  </div>
                  <p>Final price: <strong>₹{finalPrice}</strong></p>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setShowEnroll(false)}>
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
          <div className="modal fade show" style={{ display: "block" }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Course preview — {selectedCourse.title}</h5>
                  <button className="btn-close" onClick={() => setShowPreview(false)}></button>
                </div>
                <div className="modal-body">
                  <p><strong>{selectedCourse.title}</strong></p>
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
      </div>
    </section>
      </div>
    </section>
  );
};

export default Hero;
