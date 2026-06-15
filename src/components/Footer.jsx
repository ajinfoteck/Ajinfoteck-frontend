import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { FaFacebookF, FaTwitter, FaInstagram, FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";
import "../styles/Footer.css";

function Footer() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const res = await axios.get("/api/footer"); // ✅ your API
        setData(res.data);
      } catch (err) {
        console.error("Error fetching footer:", err);
      }
    };

    fetchFooter();
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <footer className="footer">

      {/* TOP SECTION */}
      <div className="footer-container">

        {/* LEFT */}
        <div className="footer-col">
          <img
            src={`http://localhost:5000/${data.logo}`}
            alt="logo"
            className="footer-logo" style={{ width: "170px" }}
          />

          <p className="footer-desc">{data.description}</p>

          <div className="social-icons">
            <a href={data.socialLinks.facebook} target="_blank" rel="noopener noreferrer">
              <FaFacebookF />
            </a>
            <a href={data.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href={data.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* SERVICES */}
        <div className="footer-col">
          <h3>{data.services.title}</h3>
          <ul>
            {data.services.links.map((item, i) => (
              <li key={i}>
                <a href={item.link}>{item.name}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* USEFUL LINKS */}
        <div className="footer-col">
          <h3>{data.usefulLinks.title}</h3>
          <ul>
            {data.usefulLinks.links.map((item, i) => (
              <li key={i}>
                <a href={item.link}>{item.name}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* CONTACT */}
        <div className="footer-col " >
          <h3>CONTACT</h3>
          <p>
            <FaMapMarkerAlt style={{ marginRight: "8px",color:"#ff4949" }}/>
            {data.contact.address}
          </p>
          <p>
            <FaEnvelope style={{ marginRight: "8px",color:"#ff4949"}} />
            {data.contact.email}
          </p>
          <p>
            <FaPhone style={{ marginRight: "8px",color:"#ff4949" }} />
            {data.contact.phone}
          </p>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        {data.copyright}
      </div>

    </footer>
  );
}

export default Footer;