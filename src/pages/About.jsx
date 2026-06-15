import React, { useEffect, useState } from "react";
import { FaUsers, FaBullseye, FaGlobe } from "react-icons/fa";
import axios from "../api/axios";
import "../styles/About.css";

const BASE_URL = "http://localhost:5000"; // 👈 Change this to your backend base URL

const About = () => {
  const [data, setData] = useState(null);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      const res = await axios.get("/api/about");
      setData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const avatarInitials = (name) =>
    name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  if (!data) return <p>Loading...</p>;

  const accentColors = [
    "#f97316",
    "#a855f7",
    "#eab308",
    "#f9a8d4",
    "#22c55e",
    "#486fdd",
  ];

  return (
    <>
      <section id="about" className="vision-container">
        <h2 className="vision-main-title">{data.title}</h2>

        <div className="vision-grid">
          <div className="vision-card">
            <FaUsers className="vision-icon" />
            <h3>{data.whoweare.title}</h3>
            <p>{data.whoweare.points.join(" ")}</p>
          </div>

          <div className="vision-card">
            <FaBullseye className="vision-icon" />
            <h3>{data.mission.title}</h3>
            <p>{data.mission.description}</p>
          </div>

          <div className="vision-card">
            <FaGlobe className="vision-icon" />
            <h3>{data.vision.title}</h3>
            <p>{data.vision.description}</p>
          </div>
        </div>
      </section>

      <section className="team-section">
        <div className="team-header">
          <h2>{data.teamTitle}</h2>
          <p>{data.description}</p>
        </div>

        <div className="team-grid">
          {data.team?.map((member, index) => {
            const color = accentColors[index % accentColors.length];

            return (
              <div
                key={member._id}
                className="team-card"
                style={{
                  "--accent": color,
                  "--card-glow": `radial-gradient(ellipse at top, ${color}15 0%, transparent 60%)`,
                }}
                onMouseEnter={() => setHovered(member._id)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="accent-bar" />

                <div className="avatar-wrap">
                  {member.profile ? (
                    <img
                      src={`${BASE_URL}/${member.profile}`}
                      alt={member.name}
                      className="avatar-image"
                      onError={(e) => {
                        // Fallback to initials if image fails to load
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                  ) : null}
                  <div
                    className="avatar-placeholder"
                    style={member.profile ? { display: "none" } : {}}
                  >
                    {member.initials || avatarInitials(member.name)}
                  </div>
                </div>

                <div className="member-name">{member.name}</div>
                <div className="member-role">{member.role}</div>

                <div className="divider" />

                <p className="member-about">{member.description}</p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default About;