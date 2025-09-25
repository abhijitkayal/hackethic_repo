import React, { useEffect, useState } from "react";
import Animation from '../animation/bg_animation'

const OsintAndAI = () => {
  // State for inputs
  const [mobile, setMobile] = useState("");
  const [insta, setInsta] = useState("");
  const [adhaar, setAdhaar] = useState("");
  const [mail, setMail] = useState("");
  const [loading,setLoading]=useState(true);

  // State for results
  const [mobileResult, setMobileResult] = useState("");
  const [instaResult, setInstaResult] = useState("");
  const [adhaarResult, setAdhaarResult] = useState("");
  const [mailResult, setMailResult] = useState("");


  // State for loading spinners
  const [loadingMobile, setLoadingMobile] = useState(false);
  const [loadingInsta, setLoadingInsta] = useState(false);
  const [loadingAdhaar, setLoadingAdhaar] = useState(false);
  const [loadingMail, setLoadingMail] = useState(false);

  // Handle OSINT lookup
  const handleOSINT = (e, type) => {
    e.preventDefault();

    if (type === "mobile") {
      setLoadingMobile(true);
      setMobileResult(""); // clear old result
      setTimeout(() => {
        setMobileResult(
          `Demo result for mobile: ${mobile} — public info only (demo)`
        );
        setLoadingMobile(false);
      }, 700);
    }

    if (type === "insta") {
      setLoadingInsta(true);
      setInstaResult(""); // clear old result
      setTimeout(() => {
        setInstaResult(
          `Demo result for Instagram: ${insta} — public info only (demo)`
        );
        setLoadingInsta(false);
      }, 700);
    }
        if (type === "adhaar") {
      setLoadingAdhaar(true);
      setInstaResult(""); // clear old result
      setTimeout(() => {
        setAdhaarResult(
          `Demo result for Adhaar: ${adhaar} — public info only (demo)`
        );
        setLoadingAdhaar(false);
      }, 700);
    }
      if (type === "mail") {
      setLoadingMail(true);
      setMailResult(""); // clear old result
      setTimeout(() => {
        setMailResult(
          `Demo result for mail: ${mail} — public info only (demo)`
        );
        setLoadingMail(false);
      }, 700);
    }
  };


      useEffect(() => {
        // const saved = JSON.parse(localStorage.getItem("hack_enrolls") || "[]");
        // setEnrollments(saved);
    
        // simulate loading delay (2s)
        const timer = setTimeout(() => setLoading(false), 2000);
    
        return () => clearTimeout(timer);
      }, []);

          if (loading) {
    return (
      <Animation/>
  );
};

  return (
    <section className="py-5">
      <h2 className="mb-3">OSINT Tools (React Demo)</h2>
      <div className="row g-3">
        {/* Mobile Lookup */}
        <div className="col-md-6">
          <div className="card p-3">
            <h6>Mobile Lookup</h6>
            <form onSubmit={(e) => handleOSINT(e, "mobile")}>
              <input
                className="form-control mb-2"
                placeholder="+91 98765 43210"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
              <button className="btn btn-outline-primary">Lookup</button>
            </form>
            <div className="mt-2 small">
              {loadingMobile ? (
                <div>
                  <div
                    className="spinner-border spinner-border-sm"
                    role="status"
                  ></div>{" "}
                  Fetching (demo)...
                </div>
              ) : (
                mobileResult && (
                  <div className="alert alert-info small">{mobileResult}</div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Instagram Lookup */}
        <div className="col-md-6">
          <div className="card p-3">
            <h6>Instagram Lookup</h6>
            <form onSubmit={(e) => handleOSINT(e, "insta")}>
              <input
                className="form-control mb-2"
                placeholder="username"
                value={insta}
                onChange={(e) => setInsta(e.target.value)}
              />
              <button className="btn btn-outline-primary">Lookup</button>
            </form>
            <div className="mt-2 small">
              {loadingInsta ? (
                <div>
                  <div
                    className="spinner-border spinner-border-sm"
                    role="status"
                  ></div>{" "}
                  Fetching (demo)...
                </div>
              ) : (
                instaResult && (
                  <div className="alert alert-info small">{instaResult}</div>
                )
              )}
            </div>
          </div>
        </div>

              <div className="col-md-6">
          <div className="card p-3">
            <h6>Adhaar Lookup</h6>
            <form onSubmit={(e) => handleOSINT(e, "adhaar")}>
              <input
                className="form-control mb-2"
                placeholder="1111 2222 3333"
                value={adhaar}
                onChange={(e) => setAdhaar(e.target.value)}
              />
              <button className="btn btn-outline-primary">Lookup</button>
            </form>
            <div className="mt-2 small">
              {loadingAdhaar ? (
                <div>
                  <div
                    className="spinner-border spinner-border-sm"
                    role="status"
                  ></div>{" "}
                  Fetching (demo)...
                </div>
              ) : (
               adhaarResult && (
                  <div className="alert alert-info small">{adhaarResult}</div>
                )
              )}
            </div>
          </div>
        </div>


         <div className="col-md-6">
          <div className="card p-3">
            <h6>E-mail Lookup</h6>
            <form onSubmit={(e) => handleOSINT(e, "mail")}>
              <input
                className="form-control mb-2"
                placeholder="User Mail"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
              />
              <button className="btn btn-outline-primary">Lookup</button>
            </form>
            <div className="mt-2 small">
              {loadingMail ? (
                <div>
                  <div
                    className="spinner-border spinner-border-sm"
                    role="status"
                  ></div>{" "}
                  Fetching (demo)...
                </div>
              ) : (
                mailResult && (
                  <div className="alert alert-info small">{mailResult}</div>
                )
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default OsintAndAI;
