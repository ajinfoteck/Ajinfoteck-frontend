import { useEffect, useState } from "react";
import axios from "../api/axios";
import "../styles/Careers.css";
import { useRef } from "react";

const validate = (formData) => {
  const errors = {};

  if (!formData.name.trim()) {
    errors.name = "Full name is required.";
  } else if (formData.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }

  if (!formData.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!formData.phone.trim()) {
    errors.phone = "Phone number is required.";
  } else if (!/^[\d\s\+\-\(\)]{7,15}$/.test(formData.phone)) {
    errors.phone = "Enter a valid phone number.";
  }

  if (!formData.role) {
    errors.role = "Please select a role.";
  }

  if (!formData.resume) {
    errors.resume = "Please upload your resume.";
  } else {
    const allowed = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/jpeg",
    ];
    if (!allowed.includes(formData.resume.type)) {
      errors.resume = "Only PDF, Word, or JPEG files are allowed.";
    } else if (formData.resume.size > 5 * 1024 * 1024) {
      errors.resume = "File size must be under 5 MB.";
    }
  }

  return errors;
};

// ── Toast Component ──────────────────────────────────────────────────────────
const Toast = ({ toasts }) => (
  <div style={{
    position: "fixed", top: "1.25rem", right: "1.25rem",
    display: "flex", flexDirection: "column", gap: "0.6rem",
    zIndex: 9999, pointerEvents: "none",
  }}>
    {toasts.map((t) => (
      <div key={t.id} style={{
        display: "flex", alignItems: "center", gap: "0.6rem",
        padding: "0.75rem 1.1rem",
        borderRadius: "10px",
        minWidth: "260px", maxWidth: "340px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.18)",
        fontFamily: "'Montserrat', sans-serif",
        fontSize: "0.875rem", fontWeight: 500,
        color: "#fff",
        background: t.type === "success"
          ? "linear-gradient(135deg,#22c55e,#16a34a)"
          : "linear-gradient(135deg,#ef4444,#dc2626)",
        animation: "toastIn 0.3s ease",
      }}>
        <span style={{ fontSize: "1.1rem" }}>
          {t.type === "success" ? "✓" : "✕"}
        </span>
        {t.message}
      </div>
    ))}
    <style>{`
      @keyframes toastIn {
        from { opacity: 0; transform: translateX(40px); }
        to   { opacity: 1; transform: translateX(0); }
      }
    `}</style>
  </div>
);

// ── Main Component ───────────────────────────────────────────────────────────
const Careers = () => {
  const [career, setCareer] = useState(null);
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", role: "", resume: null,
  });
  const [errors, setErrors]   = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]    = useState(false);

  // ── Toast state ────────────────────────────────────────────────────────────
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = "success", duration = 3500) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), duration);
  };

  const fileInputRef = useRef(null);

  useEffect(() => { fetchCareerData(); }, []);

  const fetchCareerData = async () => {
    try {
      const res = await axios.get("/api/careers");
      setCareer(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    if (touched[name]) setErrors(validate(updated));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFormData((prev) => ({ ...prev, resume: file }));
    if (touched.resume) setErrors(validate({ ...formData, resume: file }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate(formData));
  };

  // ── Submit ─────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all fields touched so errors surface
    const allTouched = { name: true, email: true, phone: true, role: true, resume: true };
    setTouched(allTouched);

    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      showToast("Please fix the errors before submitting.", "error");
      return;
    }

    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("name",    formData.name);
    formDataToSend.append("email",   formData.email);
    formDataToSend.append("phone",   formData.phone);
    formDataToSend.append("role",    formData.role);
    formDataToSend.append("message", formData.message || "");
    formDataToSend.append("resume",  formData.resume);

    try {
      const res = await axios.post(
        "https://ajinfoteck-backend.vercel.app/api/apply",
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("SUCCESS:", res.data);
      showToast("Application submitted successfully! We'll be in touch soon. 🎉", "success");
      setSubmitted(true);
      resetForm();
    } catch (error) {
      console.error("ERROR:", error);
      const msg =
        error?.response?.data?.message ||
        "Something went wrong. Please try again.";
      showToast(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  // ── Reset ──────────────────────────────────────────────────────────────────
  const resetForm = () => {
    setFormData({ name: "", email: "", phone: "", role: "", resume: null });
    setErrors({});
    setTouched({});
    setSubmitted(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  if (!career) {
    return (
      <div className="careers-container" style={{ display: "grid", placeItems: "center", minHeight: "100vh" }}>
        <p style={{ fontFamily: "'Montserrat', sans-serif", color: "#9aa5bc", fontSize: "1rem" }}>
          Loading…
        </p>
      </div>
    );
  }

  return (
    <div className="careers-container">

      {/* ── Toast Notifications ── */}
      <Toast toasts={toasts} />

      {/* ── Banner ── */}
      <div className="careers-banner">
        <div className="badge">We're Hiring</div>
        <h1 className="career-title">{career.title}</h1>
        <p>Find a role where your skills make a real impact.</p>
      </div>

      <div className="careers-body">

        {/* ── Open Roles ── */}
        <div className="card">
          <div className="card-header">
            <div className="card-icon">
              <svg viewBox="0 0 24 24">
                <rect x="2" y="7" width="20" height="14" rx="2" />
                <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
              </svg>
            </div>
            <h2>{career.openrolesTitle}</h2>
            <span className="count">{career.openroles.length} open positions</span>
          </div>
          <ul className="roles-list">
            {career.openroles.map((role, index) => (
              <li key={index}>
                <span className="role-dot" />
                <span className="role-name">{role}</span>
                <span className="role-tag">Full-time</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Application Form ── */}
        <div className="card">
          <div className="card-header">
            <div className="card-icon">
              <svg viewBox="0 0 24 24">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <h2>Apply for a Position</h2>
          </div>

          <form className="form-body" onSubmit={handleSubmit} noValidate>

            <div className="form-row">
              {/* Name */}
              <div className={`field-group ${errors.name && touched.name ? "has-error" : ""}`}>
                <label htmlFor="name">Full Name <span className="req">*</span></label>
                <input
                  id="name" type="text" name="name"
                  placeholder={career.name}
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.name && touched.name && <span className="error-msg">{errors.name}</span>}
              </div>

              {/* Email */}
              <div className={`field-group ${errors.email && touched.email ? "has-error" : ""}`}>
                <label htmlFor="email">Email Address <span className="req">*</span></label>
                <input
                  id="email" type="email" name="email"
                  placeholder={career.email}
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email && <span className="error-msg">{errors.email}</span>}
              </div>
            </div>

            <div className="form-row">
              {/* Phone */}
              <div className={`field-group ${errors.phone && touched.phone ? "has-error" : ""}`}>
                <label htmlFor="phone">Phone Number <span className="req">*</span></label>
                <input
                  id="phone" type="text" name="phone"
                  placeholder={career.phone}
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.phone && touched.phone && <span className="error-msg">{errors.phone}</span>}
              </div>

              {/* Role */}
              <div className={`field-group ${errors.role && touched.role ? "has-error" : ""}`}>
                <label htmlFor="role">Applying For <span className="req">*</span></label>
                <div className="select-wrap">
                  <select
                    id="role" name="role"
                    value={formData.role}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="">{career.select}</option>
                    {career.roles.map((role, index) => (
                      <option key={index} value={role}>{role}</option>
                    ))}
                  </select>
                </div>
                {errors.role && touched.role && <span className="error-msg">{errors.role}</span>}
              </div>
            </div>

            {/* Resume Upload */}
            <div className={`field-group ${errors.resume && touched.resume ? "has-error" : ""}`}>
              <label>Resume / CV <span className="req">*</span></label>
              <div
                className={`file-upload-area ${formData.resume ? "has-file" : ""}`}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  name="resume"
                  accept=".pdf,.doc,.docx,.jpeg,.jpg"
                  onChange={handleFileChange}
                  onBlur={handleBlur}
                  style={{ display: "none" }}
                />
                <div className="file-upload-icon">
                  {formData.resume ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                  )}
                </div>
                <div className="file-upload-text">
                  {formData.resume
                    ? <><strong>{formData.resume.name}</strong><span>Click to change file</span></>
                    : <><strong>Click to upload your resume</strong><span>PDF, Word or image (jpeg) — max 5 MB</span></>
                  }
                </div>
              </div>
              {errors.resume && touched.resume && <span className="error-msg">{errors.resume}</span>}
            </div>

            <div className="form-divider" />

            <div className="form-footer">
              <p className="form-note">
                <span className="req">*</span> All fields are required. Reviewed within <strong>3–5 business days.</strong>
              </p>
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? "Submitting…" : career.button}
              </button>
            </div>

          </form>
        </div>

      </div>

      <div className="careers-footer">
        We are an equal opportunity employer — {new Date().getFullYear()}
      </div>

    </div>
  );
};

export default Careers;