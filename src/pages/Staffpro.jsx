import React, { useEffect, useState } from "react";
import {
  FaBrain,
  FaShieldAlt,
  FaLayerGroup,
  FaMapMarkerAlt,
  FaUserTie,
  FaIndustry,
  FaChartLine,
  FaCheckCircle,
  FaEnvelope,
  FaGlobe,
  FaPhone,
} from "react-icons/fa";
import axios from "../api/axios";
import "../styles/Staffpro.css";
import { FaThumbsUp } from "react-icons/fa";

export default function Staffpro() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchStaffPro();
  }, []);

  const fetchStaffPro = async () => {
    try {
      const res = await axios.get("/api/staffpro");
      setData(res.data); // change to res.data.data if needed
    } catch (err) {
      console.error(err);
    }
  };

  const expertiseIcons = [
  <FaBrain />,
  <FaChartLine />,
  <FaShieldAlt />,
  <FaLayerGroup />,
];

const serviceIcons = [
  <FaUserTie />,
  <FaLayerGroup />,
  <FaCheckCircle />,
  <FaIndustry />,
  <FaMapMarkerAlt />,
  <FaBrain />,
];
  if (!data) {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div 
        className="spinner-border text-primary" 
        role="status"
      >
        <span className="visually-hidden">
          Loading...
        </span>
      </div>
    </div>
  );
}

  return (
    <div id="staffpro" className="sp-container">

      {/* HERO */}
      <div className="sp-hero">
        <span className="sp-eyebrow">{data.page1.subtitle}</span>

        <h1 className="sp-hero-title">
          {data.page1.title.slice(0, 5)}
          <span className="sp-accent">
            {data.page1.title.slice(5)}
          </span>
        </h1>

        <p className="sp-hero-sub">{data.page1.description}</p>

        <p className="sp-hero-tag">
          {data.page1.p} — {data.page1.h3}
        </p>

        <div className="sp-stats">
          {data.page2.keyMetrics?.map((s, i) => (
            <div className="sp-stat" key={i}>
              <span className="sp-stat-value">{s.value}</span>
              <span className="sp-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ABOUT */}
<section className="sp-section container py-4" style={{ fontSize: "18px" }}>
  
  <h2 className="sp-section-title text-center mb-3">
    {data.page2.h2}
  </h2>

  <p className="sp-section-lead text-center px-2 px-md-5">
    {data.page2.p2}
  </p>

  <p className="sp-vision-quote text-center px-2 px-md-5">
    {data.page2.vision} — {data.page2.visiondetail}
  </p>

  {/* GRID */}
  <div className="row mt-4">
    {data.page2.expertiseContent?.map((e, i) => (
      <div
        key={i}
        className="col-12 col-sm-6 col-md-6 mb-4"
      >
        <div className="sp-expertise-card text-center h-100 p-3">
          
          <div className="sp-expertise-icon mb-2">
            {expertiseIcons[i % expertiseIcons.length]}
          </div>

          <h4 className="mt-2">{e.title}</h4>
          <p>{e.description}</p>

        </div>
      </div>
    ))}
  </div>

</section>

      {/* WHO WE SERVE */}
      <div className="sp-section">
        <h2 className="sp-section-title">{data.page3.focusTitle}</h2>

        <p className="sp-section-lead">
          {data.page3.para}
        </p>

        <h3 className="sp-sub-title">{data.page3.industriesTitle}</h3>
        <div className="sp-industry-grid">
          {data.page3.industries?.map((ind, i) => (
            <div key={i} className="sp-industry-chip">
              <FaIndustry /> {ind}
            </div>
          ))}
        </div>

        <h3 className="sp-sub-title">{data.page3.DecisionMakersTitle}</h3>
        <div className="sp-dm-grid">
          {data.page3.DecisionMakers?.map((dm, i) => (
            <div key={i} className="sp-dm-badge">
              <FaCheckCircle /> {dm}
            </div>
          ))}
        </div>
      </div>

      {/* COVERAGE */}
      <div className="sp-section" >
        <h2 className="sp-section-title">{data.page4.title}</h2>
        <p className="sp-section-lead">{data.page4.subtitle}</p>

        <div className="sp-coverage-grid">
          {data.page4.coverageCards?.map((c, i) => (
            <div className="sp-coverage-card" key={i}>
              <span className="sp-coverage-tier">{c.title}</span>
              <h4>{c.subtitle}</h4>
              <p style={{color:"orange"
              }}>{c.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SERVICES */}
      <div className="sp-section">
        <h2 className="sp-section-title">{data.page5.title}</h2>
        <p className="sp-section-lead">{data.page5.subtitle}</p>

        <div className="sp-services-grid">
          {data.page5.services?.map((s, i) => (
            <div className="sp-service-card" key={i}>
              <span className="sp-service-icon">
  {serviceIcons[i % serviceIcons.length]}
</span>
              <h4>{s.title}</h4>
              <p>{s.description}</p>
            </div>
          ))}
        </div>

        <div className="sp-advantage-bar">
          <h3>{data.page5.advantage.title}</h3>
          <ul>
            {data.page5.advantage.points?.map((p, i) => (
              <li key={i}>
                <FaCheckCircle /> {p.title}: {p.description}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* PROBLEMS & SOLUTIONS */}
      <div className="sp-section">
        <h2 className="sp-section-title">{data.page6.title}</h2>
        <p className="sp-section-lead">{data.page6.subtitle}</p>

        <div className="sp-ps-grid">
          <div>
            <h3>{data.page6.challengesTitle}</h3>
            <ul>
              {data.page6.challenges?.map((c, i) => (
                <li key={i}>▸ {c.text}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3>{data.page6.solutionsTitle}</h3>
            <ul>
              {data.page6.solutions?.map((s, i) => (
                <li key={i}>
                  <FaCheckCircle /> {s.text}
                </li>
              ))}
            </ul>
          </div>
        </div>

       <div className="sp-outcomes">
  {data.page6.metrics?.map((o, i) => (
    <div key={i}>
      <span>
        {o.value === "icon-success" ? (
          <FaThumbsUp size={26}  />
        ) : (
          o.value
        )}
      </span>
      <span>{o.label}</span>
    </div>
  ))}
</div>

        <p className="sp-result-line">{data.page6.result}</p>
      </div>

      {/* CONTACT */}
      <section className="sp-section" style={{ fontSize: "18px" }}>
        <h2 className="sp-section-title">{data.page7.title}</h2>
        <p className="sp-section-lead">{data.page7.subtitle}</p>

        <div className="sp-leadership-grid">
          {data.page7.leaders?.map((l, i) => (
            <div className="sp-leader-card" key={i}>
              <h4>{l.name}</h4>
              <span className="sp-leader-position">{l.position}</span>

              <ul>
                {l.responsibilities?.map((r, j) => (
                  <li key={j}>▸ {r}</li>
                ))}
              </ul>

              <a href={`tel:${l.mobile}`}>
                <FaPhone /> {l.mobile}
              </a>

              <a href={`mailto:${l.email}`}>
                <FaEnvelope /> {l.email}
              </a>
            </div>
          ))}
        </div>

        <div className="sp-general-contact">
          <a href={`mailto:${data.page7.generalInquiry.email}`}>
            <FaEnvelope /> {data.page7.generalInquiry.email}
          </a>

          <a
            href={`https://${data.page7.generalInquiry.website}`}
            target="_blank"
            rel="noreferrer"
          >
            <FaGlobe /> {data.page7.generalInquiry.website}
          </a>
        </div>
      </section>

    </div>
  );
}