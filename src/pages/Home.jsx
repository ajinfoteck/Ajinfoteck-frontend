import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import "../styles/Home.css";
import { Link } from "react-router-dom";

const words = [
  { text: "🚀 Skyrocket Growth", color: "#dc3545" },
  { text: "📊 Flawless KPIs", color: "#f6820e" },
  { text: "⚡ Zero Dependencies", color: "#4512df" },
  { text: "🖥️ Custom Dashboards", color: "#ef17c7" },
];

function Home() {
  const [i, setI] = useState(0);
  const [data, setData] = useState(null);
  const [visible, setVisible] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [subVisible, setSubVisible] = useState(false);
  const [badgeVisible, setBadgeVisible] = useState(false);
  const [btnsVisible, setBtnsVisible] = useState(false);

  const headingWords = ["Engineering", "the", "Future."];

  // rotating badge words
  useEffect(() => {
    const t = setInterval(() => {
      setI((p) => (p + 1) % words.length);
    }, 2200);
    return () => clearInterval(t);
  }, []);

  // entrance trigger
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  // word-by-word + staggered entrance for all elements
  useEffect(() => {
    if (!visible) return;
    setWordIndex(0);

    // 3 words at 600, 1800, 3000ms
    headingWords.forEach((_, idx) => {
      setTimeout(() => setWordIndex(idx + 1), 600 + idx * 1200);
    });

    // after last word (3000ms), stagger rest
    setTimeout(() => setSubVisible(true),   3200);
    setTimeout(() => setBadgeVisible(true), 4400);
    setTimeout(() => setBtnsVisible(true),  5600);
  }, [visible]);

  // fetch data
  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const res = await axios.get("/api/home");
        setData(res.data);
        
      } catch (error) {
        console.error("Error fetching home data:", error);
      }
    };
    fetchHomeData();
  }, []);

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

  const { text, color } = words[i];

  return (
    <>
      <section className={`hero-section ${visible ? "hero-visible" : ""}`}>
        {/* Background orbs */}
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />

        <div className="hero-content">

      

        
       {/* Heading — word by word */}
    <h1 className="hero-heading" style={{ whiteSpace: "nowrap" }}>
  {data.headingWords.map((word, idx) => (
    <span
      key={idx}
      className="hero-word"
      style={{
        opacity: wordIndex > idx ? 1 : 0,
        transform:
          wordIndex > idx
            ? "translateY(0) skewY(0deg)"
            : "translateY(60px) skewY(4deg)",
      }}
    >
      {word}
    </span>
  ))}
</h1>


          {/* Subtitle — same entrance animation */}
          <p
            className={`hero-subtitle entrance-word ${subVisible ? "word-entered" : ""}`}
          >
            {data.heroSubtitle}
          </p>

          {/* Rotating badge — same entrance animation */}
          <div
            className={`hero-badge entrance-word ${badgeVisible ? "word-entered" : ""}`}
          >
            <span
              key={i}
              className="badge-word"
              style={{
                color,
                textShadow: `0 0 12px ${color}88`,
              }}
            >
              {text}
            </span>
          </div>

          {/* Buttons — same entrance animation */}
          <div
            className={`hero-buttons entrance-word ${btnsVisible ? "word-entered" : ""}`}
          >
         

          </div>

        </div>
      </section>

      {/* What We Do */}
      <div className="image1">
        <div className="content-box mb-5">
          <h3 className="mb-3 heading-effect" style={{ fontSize: "34px" }}>
            {data.h2}
          </h3>
          <p className="text-content" style={{ fontSize: "25px" }}>
            {data.whatWeDoContent}
          </p>
          <ul className="custom-list mt-3" style={{ fontSize: "20px" }}>
            {data.whatWeDoPoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Industries */}
      <div className="image2">
        <div className="content-box">
          <h3 className="mb-3 heading-effect" style={{ fontSize: "34px" }}>
            {data.industries}
          </h3>
          <ul className="custom-list" style={{ fontSize: "20px" }}>
            {data.industriesPoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      </div>
      <div style={{ textAlign: "center"}}>
      <a href="/contact"> <button className="btn-primary">{data.heroCTA}</button></a></div>
      <br />
    </>
  );
}

export default Home;