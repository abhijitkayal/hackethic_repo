import React, { useState } from "react";

const EnrollAndFooter = () => {
  const [enrolledCourses] = useState([
    "Beginner OSINT Course",
    "Ethical Hacking Course",
    "Penetration Testing (Standard)",
  ]);

  return (
    <>
      <a href="#courses" className="btn btn-primary btn-lg sticky-cta">
        <i className="bi bi-lightning-fill"></i> Enroll Now
      </a>

    
      <div
        className="modal fade"
        id="enrolledModal"
        tabIndex="-1"
        aria-labelledby="enrolledModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="enrolledModalLabel">
                My Enrolled Courses
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {enrolledCourses.length > 0 ? (
                <ul>
                  {enrolledCourses.map((course, index) => (
                    <li key={index} className="small-muted">
                      {course}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="small-muted">No enrolled courses yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <footer className="py-3 border-top text-center">
        <div className="container small-muted">
          © 2025 Hackethics138 — Prototype · Prices shown in INR (₹). Use
          responsibly.
        </div>
      </footer>
    </>
  );
};

export default EnrollAndFooter;
