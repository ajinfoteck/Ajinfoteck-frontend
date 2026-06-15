import { useEffect, useState } from "react";
import axios from "../api/axios";
import "../styles/Contact.css";
import emailjs from "@emailjs/browser";
import { useRef } from "react";

const validate = (formData) => {
  const errors = {};
  if (!formData.name.trim()) errors.name = "Name is required.";
  if (!formData.email.trim()) errors.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
    errors.email = "Enter a valid email address.";
  return errors;
};

const Contact = () => {
  const [contact, setContact] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toasts, setToasts] = useState([]);
  const formRef = useRef(null);

  useEffect(() => {
    fetchContactData();
  }, []);

  const fetchContactData = async () => {
    try {
      const res = await axios.get("/api/contact");
      setContact(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const showToast = (type, message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
  };

  const handleChange = (e) => {
    const updated = { ...formData, [e.target.name]: e.target.value };
    setFormData(updated);
    if (touched[e.target.name]) setErrors(validate(updated));
  };

  const handleBlur = (e) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
    setErrors(validate(formData));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true });
    const errs = validate(formData);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);

    try {
      await emailjs.sendForm(
        "service_8w98t2u",
        "template_zrvz2gl",
        formRef.current,
        "PAEyuDtZN9-V45Uhw"
      );

      showToast("success", "Message sent! We'll get back to you shortly.");
      setSubmitted(true);
      console.log("Email sent");
      resetForm();

    } catch (err) {
      console.log("EmailJS Error:", err);
      showToast("error", "Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", message: "" });
    setErrors({});
    setTouched({});
    setSubmitted(false);
  };

  if (!contact) {
    return (
      <div className="contact-container" style={{ display: "grid", placeItems: "center", minHeight: "100vh" }}>
        <p style={{ fontFamily: "'Montserrat', sans-serif", color: "#7a8fae", fontSize: "1rem" }}>Loading…</p>
      </div>
    );
  }

  return (
    <div className="contact-container">

      {/* ── Banner ── */}
      <div className="contact-banner">
        <div className="contact-badge">Get in Touch</div>
        <h1 className="contact-title">{contact.title}</h1>
        <p>{contact.responseMessage}</p>
      </div>

      <div className="contact-body">
        <div className="contact-grid">

          {/* ── Info Card ── */}
          <div className="card info-card">
            <div className="card-header">
              <div className="card-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <h2>{contact.title}</h2>
            </div>
            <div className="info-body">

              <div className="info-item">
                <div className="info-icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div className="info-text">
                  <span className="info-label">{contact.locationTitle}</span>
                  <span className="info-value">{contact.address}</span>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.9 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 5.99 5.99l1.09-1.09a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div className="info-text">
                  <span className="info-label">Phone</span>
                  <span className="info-value">{contact.phone}</span>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div className="info-text">
                  <span className="info-label">Email</span>
                  <span className="info-value">{contact.email}</span>
                </div>
              </div>

            </div>
          </div>

          {/* ── Form Card ── */}
          <div className="card form-card">
            <div className="card-header">
              <div className="card-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <h2>{contact.form.title}</h2>
            </div>

            {submitted ? (
              <div className="success-state">
                <div className="success-icon">✓</div>
                <h3>Message Sent!</h3>
                <p>Thanks, <strong>{formData.name}</strong>! We'll get back to you shortly.</p>
                <button className="submit-btn" onClick={resetForm}>Send Another Message</button>
              </div>
            ) : (
              <form ref={formRef} className="contact-form" onSubmit={handleSubmit} noValidate>

                <div className="field-group" style={{ gridColumn: "1 / -1" }}>
                  <label htmlFor="name">{contact.form.namelabel} <span className="req">*</span></label>
                  <input
                    id="name" type="text" name="name"
                    placeholder={contact.form.namelabel}
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.name && touched.name ? "has-error" : ""}
                  />
                  {errors.name && touched.name && <span className="error-msg">{errors.name}</span>}
                </div>

                <div className="field-group" style={{ gridColumn: "1 / -1" }}>
                  <label htmlFor="email">{contact.form.emaillabel} <span className="req">*</span></label>
                  <input
                    id="email" type="email" name="email"
                    placeholder={contact.form.emaillabel}
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.email && touched.email ? "has-error" : ""}
                  />
                  {errors.email && touched.email && <span className="error-msg">{errors.email}</span>}
                </div>

                <div className="field-group" style={{ gridColumn: "1 / -1" }}>
                  <label htmlFor="message">{contact.form.messagelabel}</label>
                  <textarea
                    id="message" name="message"
                    placeholder="Write your message here…"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                  />
                </div>

                <div className="form-footer">
                  <p className="form-note"><span className="req">*</span> Required fields</p>
                  <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? "Sending…" : contact.form.button}
                  </button>
                </div>

              </form>
            )}
          </div>

        </div>
      </div>

      {/* ── Toasts ── */}
      <div className="toast-wrapper">
        {toasts.map((t) => (
          <div key={t.id} className={`toast ${t.type}`}>
            <span className="toast-icon">{t.type === "success" ? "✓" : "✕"}</span>
            <span>{t.message}</span>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Contact;