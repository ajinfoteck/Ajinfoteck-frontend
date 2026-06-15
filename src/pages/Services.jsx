import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import "../styles/Services.css";

/* SVG Icons (same as your code) */
const AIIcon = () => (
  <svg className="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a4 4 0 0 1 4 4v1h1a3 3 0 0 1 3 3v2a3 3 0 0 1-3 3h-1v1a4 4 0 0 1-8 0v-1H7a3 3 0 0 1-3-3v-2a3 3 0 0 1 3-3h1V6a4 4 0 0 1 4-4z" />
    <circle cx="9" cy="10" r="1" fill="currentColor" />
    <circle cx="15" cy="10" r="1" fill="currentColor" />
  </svg>
);

const WebMobileIcon = () => (
  <svg className="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="14" height="10" rx="2" />
    <line x1="2" y1="20" x2="16" y2="20" />
    <line x1="9" y1="14" x2="9" y2="20" />
    <rect x="17" y="8" width="5" height="9" rx="1" />
    <line x1="19" y1="16" x2="20" y2="16" />
  </svg>
);
const CreativeIcon = () => (
  <svg className="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    <path d="M15 6l3 3" />
    <path d="M20 2l1 1-1 1-1-1 1-1z" fill="currentColor" stroke="none"/>
    <path d="M4 10l1 1-1 1-1-1 1-1z" fill="currentColor" stroke="none"/>
    <path d="M18 14l1 1-1 1-1-1 1-1z" fill="currentColor" stroke="none"/>
  </svg>
);

const MarketingIcon = () => (
  <svg className="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 11l19-9-9 19-2-8-8-2z" />
  </svg>
);

const CyberSecurityIcon = () => (
  <svg className="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.5C16.5 22.15 20 17.25 20 12V6L12 2z" />
    <rect x="9" y="11" width="6" height="5" rx="1" />
    <path d="M10 11V9a2 2 0 1 1 4 0v2" />
  </svg>
);

const TransformIcon = () => (
  <svg className="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

function Services() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get("/api/services");
        setData(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchServices();
  }, []);

  if (!data) return <p>Loading...</p>;

  const icons = [
    <AIIcon />,
    <WebMobileIcon />,
    <CreativeIcon />,
    <MarketingIcon />,
    <CyberSecurityIcon />,
    <TransformIcon />
  ];

  return (
    <div id="services" className="container mt-5">

      <h2 id="center" className="fw-bold service-title mb-5 text-center">
        {data.pageTitle}
      </h2>

      <p>{data.description}</p>

      <div className="row text-center ">

        {data.services.map((service, index) => (
          <div className="col-md-4 mb-4" key={service._id}>
            <div className="service-card-wrapper">
              <div className="service-card">

                {/* FRONT */}
                <div className="card-front">
                  {icons[index]}
                  <h3>{service.title}</h3>
                  <p>{service.tagline || " "}</p>
                </div>

                {/* BACK */}
                <div className="card-back">
                  <h3>{service.title}</h3>
                  <ul>
                    {service.points.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default Services;