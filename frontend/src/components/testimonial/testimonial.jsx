import React from "react";

const TestimonialsAndFAQ = () => {
  return (
    <>
      {/* Testimonials Section */}
      <section id="testimonials" className="py-5">
        <h2>What Our Learners Say</h2>
        <div className="row g-3 d-flex align-items-stretch">
          <div className="col-md-6">
            <div className="testimonial">
              “The Beginner OSINT course gave me hands-on skills I could use in
              my job. Totally worth it!” — <strong>Amit</strong>
            </div>
          </div>
          <div className="col-md-6">
            <div className="testimonial">
              “Ethical Hacking course was challenging but practical. The labs
              are gold.” — <strong>Sara</strong>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-5">
        <h2>FAQ</h2>
        <div className="accordion" id="faqAccordion">
          {/* FAQ Item 1 */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="faqHeading1">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#faq1"
                aria-expanded="true"
                aria-controls="faq1"
              >
                Do I get a certificate?
              </button>
            </h2>
            <div
              id="faq1"
              className="accordion-collapse collapse show"
              aria-labelledby="faqHeading1"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                Yes, all paid courses include a certificate on completion.
              </div>
            </div>
          </div>

          {/* FAQ Item 2 */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="faqHeading2">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#faq2"
                aria-expanded="false"
                aria-controls="faq2"
              >
                Is there a refund policy?
              </button>
            </h2>
            <div
              id="faq2"
              className="accordion-collapse collapse"
              aria-labelledby="faqHeading2"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                This is a prototype demo, but in production there would be a
                standard 7-day refund guarantee.
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TestimonialsAndFAQ;
