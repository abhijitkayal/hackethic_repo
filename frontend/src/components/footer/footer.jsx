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

       <footer className="fixed bottom-0 left-0 w-full text-gray-500 text-center py-3 border bg-gray-200 ">
        <div className="text-sm">
          © 2025 Hackethicks — Prototype · Prices shown in INR (₹). Use responsibly.
        </div>
      </footer>
    </>
  );
};

export default EnrollAndFooter;
