import React, { useEffect, useState } from "react";
import Animation from '../animation/bg_animation'

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading,setLoading]=useState(true);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };
  useEffect(() => {
       
        const timer = setTimeout(() => setLoading(false), 2000);
    
        return () => clearTimeout(timer);
      }, []);
         if (loading) {
    return (
      <Animation/>
  );
};

  return (
    <section className="py-5 bg-dark text-light">
      <div className="container">
        <h2 className="text-center fw-bold mb-4">Contact Us</h2>
        {submitted ? (
          <div className="alert alert-success">✅ Thank you! We’ll reply soon.</div>
        ) : (
          <form onSubmit={handleSubmit} className="w-75 mx-auto">
            <input 
              type="text" 
              className="form-control mb-3" 
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input 
              type="email" 
              className="form-control mb-3" 
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <textarea 
              className="form-control mb-3" 
              name="message"
              placeholder="Your Message"
              rows="4"
              value={form.message}
              onChange={handleChange}
              required
            ></textarea>
            <button className="btn btn-info w-100">Send</button>
          </form>
        )}
      </div>
    </section>
  );
};

export default Contact;
