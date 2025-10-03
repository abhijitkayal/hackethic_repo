
import React, { useState, useEffect } from "react";

const Courses = () => {
  const [showEnroll, setShowEnroll] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState({ title: "", price: 0 });
  const [form, setForm] = useState({ name: "", email: "", coupon: "" });
  const [finalPrice, setFinalPrice] = useState(0);
  const [couponMsg, setCouponMsg] = useState("");
  const [enrollments, setEnrollments] = useState([]);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  const RAZORPAY_KEY = "rzp_test_RL5AnT6meWeDmw"; 
  const API_BASE_URL = "http://localhost:8000/api"; 

  const coupons = {
    SAVE10: 0.1,
    STUDENT20: 0.2,
    WELCOME50: 0.5,
  };

  useEffect(() => {
    const loadRazorpay = () => {
      return new Promise((resolve, reject) => {
        if (window.Razorpay) {
          setRazorpayLoaded(true);
          resolve();
          return;
        }

        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;

        script.onload = () => {
          setRazorpayLoaded(true);
          resolve();
        };

        script.onerror = () => {
          console.error("Failed to load Razorpay SDK");
          reject(new Error("Failed to load Razorpay SDK"));
        };

        document.body.appendChild(script);
      });
    };

    loadRazorpay().catch((error) => {
      console.error("Error loading Razorpay:", error);
      alert("Failed to load payment system. Please refresh the page.");
    });

    return () => {
      
      const script = document.querySelector(
        'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
      );
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    
    setEnrollments([]);
  }, []);

  useEffect(() => {
    if (!selectedCourse.price) return;

    const code = form.coupon.trim().toUpperCase();
    const discount = coupons[code] || 0;
    const final = Math.round(selectedCourse.price * (1 - discount));
    setFinalPrice(final);

    if (discount > 0) {
      setCouponMsg(`${Math.round(discount * 100)}% discount applied!`);
    } else if (code && code.length > 0) {
      setCouponMsg("Invalid coupon code");
    } else {
      setCouponMsg("");
    }
  }, [form.coupon, selectedCourse.price]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };


  const openEnroll = (title, price) => {
    setSelectedCourse({ title, price });
    setForm({ name: "", email: "", coupon: "" });
    setFinalPrice(price);
    setCouponMsg("");
    setShowEnroll(true);
  };


  const createOrder = async (amount, currency = "INR") => {
    try {
      console.log("Creating order for amount:", amount);

      const requestBody = {
        amount: Math.round(amount * 100),
        currency,
        course: selectedCourse.title,
        studentName: form.name.trim(),
        studentEmail: form.email.trim(),
        coupon: form.coupon.trim().toUpperCase() || null,
      };

      console.log("Request body:", requestBody);

      const response = await fetch("http://localhost:8000/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(requestBody),
      });


      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ message: "Server error" }));
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();
      console.log("Order created:", data);

      if (!data.success) {
        throw new Error(data.message || "Failed to create order");
      }

      return data;
    } catch (error) {
      console.error("Error creating order:", error);

      if (error.name === "TypeError" && error.message.includes("fetch")) {
        throw new Error(
          "Unable to connect to payment server. Please check your internet connection and try again."
        );
      }

      throw error;
    }
  };

  
  const verifyPayment = async (paymentData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/verify-payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...paymentData,
          course: selectedCourse.title,
          studentName: form.name.trim(),
          studentEmail: form.email.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ message: "Verification failed" }));
        throw new Error(errorData.message || "Payment verification failed");
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Payment verification failed");
      }

      return data;
    } catch (error) {
      console.error("Error verifying payment:", error);
      throw error;
    }
  };

  const handleSuccessfulEnrollment = (paymentId, orderId) => {
    const name = form.name.trim() || "Demo User";
    const email = form.email.trim() || "demo@example.com";
    const coupon = form.coupon.trim().toUpperCase();

    const newEnroll = {
      id: Date.now().toString(),
      title: selectedCourse.title,
      name,
      email,
      price: selectedCourse.price,
      coupon: coupon || null,
      final: finalPrice,
      date: new Date().toISOString(),
      progress: 0,
      paymentId,
      orderId,
      status: "enrolled",
    };

    const updated = [...enrollments, newEnroll];
    setEnrollments(updated);

    alert(
      `🎉 Payment Successful! Welcome to ${selectedCourse.title}!\n\nPayment ID: ${paymentId}\nOrder ID: ${orderId}`
    );
    setShowEnroll(false);
    setPaymentLoading(false);
  };

  const initiatePayment = async () => {
   
    if (!form.name.trim()) {
      alert("Please enter your name");
      return;
    }

    if (!form.email.trim()) {
      alert("Please enter your email");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email.trim())) {
      alert("Please enter a valid email address");
      return;
    }

    if (!razorpayLoaded || !window.Razorpay) {
      alert(
        "Payment system is not ready. Please refresh the page and try again."
      );
      return;
    }

    setPaymentLoading(true);

    try {
  
      const orderData = await createOrder(finalPrice);
      const order = orderData.order;

      console.log("Initiating Razorpay with order:", order);

      const options = {
        key: RAZORPAY_KEY,
        amount: order.amount,
        currency: order.currency,
        name: "CyberSec Academy",
        description: `Enrollment for ${selectedCourse.title}`,
        image: "https://via.placeholder.com/200x200/007bff/ffffff?text=CSA",
        order_id: order.id,
        handler: async function (response) {
          console.log("Payment successful:", response);
          try {
        
            const verification = await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verification.success) {
              handleSuccessfulEnrollment(
                response.razorpay_payment_id,
                response.razorpay_order_id
              );
            } else {
              throw new Error("Payment verification failed");
            }
          } catch (error) {
            console.error("Verification error:", error);
            alert(
              "Payment was processed but verification failed. Please contact support with your payment ID: " +
                response.razorpay_payment_id
            );
            setPaymentLoading(false);
          }
        },
        prefill: {
          name: form.name.trim(),
          email: form.email.trim(),
        },
        notes: {
          course: selectedCourse.title,
          coupon: form.coupon.trim() || "none",
        },
        theme: {
          color: "#007bff",
        },
        modal: {
          ondismiss: function () {
            console.log("Payment modal dismissed");
            setPaymentLoading(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", function (response) {
        console.error("Payment failed:", response);
        alert(
          `Payment Failed: ${response.error.description}\nError Code: ${response.error.code}`
        );
        setPaymentLoading(false);
      });

      rzp.open();
    } catch (error) {
      console.error("Payment initiation error:", error);
      alert(error.message || "Failed to initiate payment. Please try again.");
      setPaymentLoading(false);
    }
  };

  const previewCourse = (title) => {
    setSelectedCourse({ title, price: 0 });
    setShowPreview(true);
  };

  const courseData = [
    {
      title: "Beginner OSINT Course",
      originalPrice: 1999,
      currentPrice: 1299,
      duration: "4 weeks",
      type: "Self-paced",
      features: [
        "Intro to OSINT",
        "Legal & ethical considerations",
        "Practical labs",
      ],
      badge: { color: "#28a745", text: `₹${1299}` },
      strikethrough: true,
    },
    {
      title: "Ethical Hacking — Intermediate",
      currentPrice: 4499,
      duration: "8 weeks",
      type: "Projects",
      features: [
        "Web app pentesting",
        "Network basics & tools",
        "Report writing",
      ],
      badge: { color: "#ffc107", textColor: "#212529", text: `₹${4499}` },
    },
    {
      title: "AI in Cybersecurity — Intro",
      originalPrice: 3499,
      currentPrice: 2999,
      duration: "6 weeks",
      type: "Concepts & tools",
      features: ["ML basics", "Defensive AI", "Practical demos"],
      badge: { color: "#17a2b8", text: `₹${2999}` },
      strikethrough: true,
    },
  ];

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
        padding: "2rem 0",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2rem",
          }}
        >
          <h2 style={{ color: "#2c3e50", marginBottom: 0 }}>
            Courses & Prices
          </h2>
          <div style={{ color: "#6c757d", fontSize: "0.9rem" }}>
            Choose a plan and apply coupon at checkout
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "flex-end",
          }}
        >
          {courseData.map((course, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "white",
                padding: "1.5rem",
                borderRadius: "8px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                border: "1px solid #e9ecef",
                height: "fit-content",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "1rem",
                }}
              >
                <h5 style={{ color: "#2c3e50", margin: 0 }}>{course.title}</h5>
                <div>
                  {course.strikethrough && course.originalPrice && (
                    <>
                      <span
                        style={{
                          textDecoration: "line-through",
                          color: "#6c757d",
                        }}
                      >
                        ₹{course.originalPrice}
                      </span>{" "}
                    </>
                  )}
                  <span
                    style={{
                      backgroundColor: course.badge.color,
                      color: course.badge.textColor || "white",
                      padding: "0.25rem 0.5rem",
                      borderRadius: "4px",
                      fontSize: "0.8rem",
                    }}
                  >
                    {course.badge.text}
                  </span>
                </div>
              </div>
              <p
                style={{
                  color: "#6c757d",
                  fontSize: "0.9rem",
                  marginBottom: "1rem",
                }}
              >
                {course.duration} · {course.type} · Certificate
              </p>
              <ul
                style={{
                  fontSize: "0.9rem",
                  paddingLeft: "1.2rem",
                  marginBottom: "1.5rem",
                }}
              >
                {course.features.map((feature, featureIndex) => (
                  <li key={featureIndex}>{feature}</li>
                ))}
              </ul>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button
                  style={{
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    padding: "0.5rem 1rem",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "0.9rem",
                  }}
                  onClick={() => openEnroll(course.title, course.currentPrice)}
                >
                  Enroll Now
                </button>
                <button
                  style={{
                    backgroundColor: "transparent",
                    color: "#6c757d",
                    border: "1px solid #6c757d",
                    padding: "0.5rem 1rem",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "0.9rem",
                  }}
                  onClick={() => previewCourse(course.title)}
                >
                  Preview
                </button>
              </div>
            </div>
          ))}
        </div>

        {showEnroll && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                padding: "2rem",
                borderRadius: "8px",
                width: "90%",
                maxWidth: "500px",
                maxHeight: "90vh",
                overflow: "auto",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1.5rem",
                }}
              >
                <h5 style={{ margin: 0, color: "#2c3e50" }}>
                  Enroll — {selectedCourse.title}
                </h5>
                <button
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "1.5rem",
                    cursor: "pointer",
                    color: "#6c757d",
                  }}
                  onClick={() => {
                    setShowEnroll(false);
                    setPaymentLoading(false);
                  }}
                  disabled={paymentLoading}
                >
                  ×
                </button>
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <p>
                  <strong>{selectedCourse.title}</strong>
                </p>
                <p style={{ color: "#6c757d", fontSize: "0.9rem" }}>
                  Original Price:{" "}
                  <span style={{ fontWeight: "600" }}>
                    ₹{selectedCourse.price}
                  </span>
                </p>

                <div style={{ marginBottom: "1rem" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: "500",
                    }}
                  >
                    Your Name *
                  </label>
                  <input
                    name="name"
                    style={{
                      width: "100%",
                      padding: "0.5rem",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      fontSize: "1rem",
                      boxSizing: "border-box",
                    }}
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    disabled={paymentLoading}
                  />
                </div>

                <div style={{ marginBottom: "1rem" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: "500",
                    }}
                  >
                    Email *
                  </label>
                  <input
                    name="email"
                    type="email"
                    style={{
                      width: "100%",
                      padding: "0.5rem",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      fontSize: "1rem",
                      boxSizing: "border-box",
                    }}
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    disabled={paymentLoading}
                  />
                </div>

                <div style={{ marginBottom: "1rem" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: "500",
                    }}
                  >
                    Coupon Code (optional)
                  </label>
                  <input
                    name="coupon"
                    style={{
                      width: "100%",
                      padding: "0.5rem",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      fontSize: "1rem",
                      boxSizing: "border-box",
                    }}
                    value={form.coupon}
                    onChange={handleChange}
                    placeholder="Enter coupon code"
                    disabled={paymentLoading}
                  />
                  <div
                    style={{
                      fontSize: "0.8rem",
                      color: "#6c757d",
                      marginTop: "0.25rem",
                    }}
                  >
                    Try: SAVE10 (10% off), STUDENT20 (20% off), WELCOME50 (50%
                    off)
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: "#f8f9fa",
                    padding: "1rem",
                    borderRadius: "4px",
                    border: "1px solid #e9ecef",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <span>Course Price:</span>
                    <span>₹{selectedCourse.price}</span>
                  </div>
                  {couponMsg && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "0.5rem",
                        color: couponMsg.includes("Invalid")
                          ? "#dc3545"
                          : "#28a745",
                        fontSize: "0.9rem",
                      }}
                    >
                      <span>Coupon:</span>
                      <span>{couponMsg}</span>
                    </div>
                  )}
                  <hr
                    style={{
                      margin: "0.5rem 0",
                      border: "none",
                      borderTop: "1px solid #dee2e6",
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontWeight: "600",
                      fontSize: "1.1rem",
                      color: "#2c3e50",
                    }}
                  >
                    <span>Final Amount:</span>
                    <span>₹{finalPrice}</span>
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  justifyContent: "flex-end",
                }}
              >
                <button
                  style={{
                    backgroundColor: "#6c757d",
                    color: "white",
                    border: "none",
                    padding: "0.75rem 1.5rem",
                    borderRadius: "4px",
                    cursor: paymentLoading ? "not-allowed" : "pointer",
                    opacity: paymentLoading ? 0.6 : 1,
                  }}
                  onClick={() => {
                    setShowEnroll(false);
                    setPaymentLoading(false);
                  }}
                  disabled={paymentLoading}
                >
                  Cancel
                </button>
                <button
                  style={{
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    padding: "0.75rem 1.5rem",
                    borderRadius: "4px",
                    cursor: paymentLoading ? "not-allowed" : "pointer",
                    opacity: paymentLoading ? 0.6 : 1,
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    minWidth: "120px",
                    justifyContent: "center",
                  }}
                  onClick={initiatePayment}
                  disabled={paymentLoading}
                >
                  {paymentLoading ? (
                    <>
                      <div
                        style={{
                          width: "16px",
                          height: "16px",
                          border: "2px solid #fff",
                          borderTop: "2px solid transparent",
                          borderRadius: "50%",
                          animation: "spin 1s linear infinite",
                        }}
                      ></div>
                      Processing...
                    </>
                  ) : (
                    <>💳 Pay ₹{finalPrice}</>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

      
        {showPreview && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                padding: "2rem",
                borderRadius: "8px",
                width: "90%",
                maxWidth: "600px",
                maxHeight: "90vh",
                overflow: "auto",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1.5rem",
                }}
              >
                <h5 style={{ margin: 0, color: "#2c3e50" }}>
                  Course Preview — {selectedCourse.title}
                </h5>
                <button
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "1.5rem",
                    cursor: "pointer",
                    color: "#6c757d",
                  }}
                  onClick={() => setShowPreview(false)}
                >
                  ×
                </button>
              </div>

              <div>
                <p>
                  <strong>{selectedCourse.title}</strong>
                </p>
                <p style={{ color: "#6c757d", fontSize: "0.9rem" }}>
                  Course syllabus and structure:
                </p>

                <div style={{ marginBottom: "1.5rem" }}>
                  <h6 style={{ color: "#2c3e50", marginBottom: "0.5rem" }}>
                    Course Outline:
                  </h6>
                  <ul style={{ paddingLeft: "1.2rem" }}>
                    <li>
                      <strong>Week 1</strong> — Introduction & foundational
                      concepts
                    </li>
                    <li>
                      <strong>Week 2</strong> — Core tools & practical exercises
                    </li>
                    <li>
                      <strong>Week 3</strong> — Advanced techniques & project
                      work
                    </li>
                    <li>
                      <strong>Week 4</strong> — Capstone project & certification
                    </li>
                  </ul>
                </div>

                <div
                  style={{
                    backgroundColor: "#f8f9fa",
                    padding: "1rem",
                    borderRadius: "4px",
                    marginBottom: "1rem",
                  }}
                >
                  <h6 style={{ color: "#2c3e50", marginBottom: "0.5rem" }}>
                    What you'll learn:
                  </h6>
                  <ul style={{ paddingLeft: "1.2rem", margin: 0 }}>
                    <li>Fundamental concepts and theoretical knowledge</li>
                    <li>Hands-on practical experience with real tools</li>
                    <li>Industry best practices and ethical considerations</li>
                    <li>Real-world project applications and case studies</li>
                    <li>Professional certification upon completion</li>
                  </ul>
                </div>

                <div
                  style={{
                    backgroundColor: "#e7f3ff",
                    padding: "1rem",
                    borderRadius: "4px",
                    border: "1px solid #b3d9ff",
                  }}
                >
                  <h6 style={{ color: "#0066cc", marginBottom: "0.5rem" }}>
                    Course Features:
                  </h6>
                  <ul
                    style={{
                      paddingLeft: "1.2rem",
                      margin: 0,
                      color: "#0066cc",
                    }}
                  >
                    <li>Self-paced learning with lifetime access</li>
                    <li>Interactive labs and practical exercises</li>
                    <li>24/7 community support and discussion forums</li>
                    <li>Industry-recognized certification</li>
                    <li>Regular updates and new content additions</li>
                  </ul>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  justifyContent: "flex-end",
                  marginTop: "1.5rem",
                }}
              >
                <button
                  style={{
                    backgroundColor: "#6c757d",
                    color: "white",
                    border: "none",
                    padding: "0.75rem 1.5rem",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  onClick={() => setShowPreview(false)}
                >
                  Close
                </button>
                <button
                  style={{
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    padding: "0.75rem 1.5rem",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setShowPreview(false);
                    const course = courseData.find(
                      (c) => c.title === selectedCourse.title
                    );
                    if (course) {
                      openEnroll(course.title, course.currentPrice);
                    }
                  }}
                >
                  Enroll Now
                </button>
              </div>
            </div>
          </div>
        )}

        <div
          style={{
            position: "fixed",
            bottom: "10px",
            left: "10px",
            backgroundColor: "#343a40",
            color: "white",
            padding: "0.5rem",
            borderRadius: "4px",
            fontSize: "0.7rem",
            maxWidth: "300px",
            zIndex: 1001,
            display: "none",
          }}
        >
          <div>API: {API_BASE_URL}</div>
          <div>Razorpay: {razorpayLoaded ? "right" : "wrong"}</div>
          <div>Enrollments: {enrollments.length}</div>
        </div>

        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            
            /* Responsive design */
            @media (max-width: 768px) {
              .course-grid {
                grid-template-columns: 1fr;
              }
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default Courses;