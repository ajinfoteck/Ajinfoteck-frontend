import React, { useEffect, useState, useRef } from "react";
import axios from "../api/axios";
import "../styles/TalentHub.css";
import { Link } from "react-router-dom";
/* ─────────────────────────────────────────
   SVG ICON COMPONENTS
───────────────────────────────────────── */

const IconClipboard = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="2" width="6" height="4" rx="1"/>
    <path d="M9 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-3"/>
    <line x1="9" y1="12" x2="15" y2="12"/>
    <line x1="9" y1="16" x2="13" y2="16"/>
  </svg>
);

const IconTarget = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="6"/>
    <circle cx="12" cy="12" r="2"/>
  </svg>
);

const IconMap = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
    <line x1="9" y1="3" x2="9" y2="18"/>
    <line x1="15" y1="6" x2="15" y2="21"/>
  </svg>
);

const IconBook = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    <line x1="9" y1="7" x2="15" y2="7"/>
    <line x1="9" y1="11" x2="12" y2="11"/>
  </svg>
);

const IconBriefcase = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2"/>
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
    <line x1="12" y1="12" x2="12" y2="12"/>
    <path d="M2 12h20"/>
  </svg>
);

const IconAward = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="6"/>
    <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
  </svg>
);

const IconBrain = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.84A2.5 2.5 0 0 1 9.5 2"/>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.84A2.5 2.5 0 0 0 14.5 2"/>
  </svg>
);

const IconCpu = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2"/>
    <rect x="9" y="9" width="6" height="6"/>
    <line x1="9" y1="1" x2="9" y2="4"/>
    <line x1="15" y1="1" x2="15" y2="4"/>
    <line x1="9" y1="20" x2="9" y2="23"/>
    <line x1="15" y1="20" x2="15" y2="23"/>
    <line x1="20" y1="9" x2="23" y2="9"/>
    <line x1="20" y1="14" x2="23" y2="14"/>
    <line x1="1" y1="9" x2="4" y2="9"/>
    <line x1="1" y1="14" x2="4" y2="14"/>
  </svg>
);

const IconTrendingUp = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
    <polyline points="17 6 23 6 23 12"/>
  </svg>
);

const IconGraduationCap = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
    <path d="M6 12v5c0 2 6 3 6 3s6-1 6-3v-5"/>
  </svg>
);

const IconShield = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <polyline points="9 12 11 14 15 10"/>
  </svg>
);

const IconBadge = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

const IconUsers = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const IconBarChart = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"/>
    <line x1="12" y1="20" x2="12" y2="4"/>
    <line x1="6" y1="20" x2="6" y2="14"/>
    <line x1="2" y1="20" x2="22" y2="20"/>
  </svg>
);

const stepIcons = [
  <IconClipboard />,
  <IconTarget />,
  <IconMap />,
  <IconBook />,
  <IconBriefcase />,
  <IconAward />,
];

const featureIcons = [
  <IconBrain />,
  <IconCpu />,
  <IconTrendingUp />,
  <IconGraduationCap />,
  <IconShield />,
  <IconBadge />,
  <IconUsers />,
  <IconBarChart />,
];

/* ─────────────────────────────────────────
   HOOKS
───────────────────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function AnimatedSection({ children, className = "", delay = 0 }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={`th-reveal ${visible ? "th-revealed" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
function TalentHub() {
  const [data, setData] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeStep, setActiveStep] = useState(null);

  useEffect(() => {
    axios.get("/api/talenthub")
      .then((res) => setData(res.data))
      .catch((err) => console.error("Error fetching TalentHub:", err));

    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!data) return (
    <div className="th-loading">
      <span className="th-loader"></span>
    </div>
  );

  return (
    <div className="th-root">

     

      {/* ── HERO ── */}
      <section className="th-hero" id="home">
        <div className="th-hero__bg">
          <div className="th-orb th-orb--1"></div>
          <div className="th-orb th-orb--2"></div>
          <div className="th-orb th-orb--3"></div>
          <div className="th-grid-overlay"></div>
        </div>
        <div className="th-hero__content">
          <div className="th-hero__badge">
            <span className="th-badge-dot"></span>
            AI-Powered Career Intelligence
          </div>
          <h1 className="th-hero__title">
            {data.page1.hero.title.split(" ").map((word, i) => (
              <span key={i} className="th-word" style={{ animationDelay: `${i * 0.08}s` }}>
                {word}&nbsp;
              </span>
            ))}
          </h1>
          <p className="th-hero__sub">{data.page1.hero.subtitle}</p>
          <p className="th-hero__desc">{data.page1.hero.description}</p>
          <div className="th-hero__cta">
            <a href={data.page1.hero.journeyButton.link} className="th-btn th-btn--solid th-btn--lg">
              <span>{data.page1.hero.journeyButton.name}</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          

<Link
  to="#pricing"
  className="th-btn th-btn--outline th-btn--lg"
  onClick={(e) => {
    e.preventDefault();
    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
  }}
>
  {data.page1.hero.pricingButton.name}
</Link>
          </div>
          <div className="th-hero__stats">
            {data.page1.stats.map((s, i) => (
              <div className="th-hero__stat" key={i}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6-STEP JOURNEY ── */}
      <section className="th-section" id="journey">
        <div className="th-container">
          <AnimatedSection className="th-section__head">
            <p className="th-eyebrow">How It Works</p>
            <h2 className="th-section__title">{data.page2.title}</h2>
            <p className="th-section__sub">{data.page2.subtitle}</p>
          </AnimatedSection>
          <div className="th-steps">
            {data.page2.steps.map((step, i) => (
              <AnimatedSection key={step.stepNumber} delay={i * 80}>
                <div
                  className={`th-step-card ${activeStep === i ? "th-step-card--active" : ""}`}
                  onMouseEnter={() => setActiveStep(i)}
                  onMouseLeave={() => setActiveStep(null)}
                >
                  <div className="th-step-card__num">{String(step.stepNumber).padStart(2, "0")}</div>
                  <div className="th-step-card__icon">{stepIcons[i]}</div>
                  <h3 className="th-step-card__title">{step.title}</h3>
                  <p className="th-step-card__desc">{step.description}</p>
                  <ul className="th-step-card__list">
                    {step.points.map((pt, j) => (
                      <li key={j}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <div className="th-step-card__glow"></div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="th-section th-section--alt" id="features">
        <div className="th-container">
          <AnimatedSection className="th-section__head">
            <p className="th-eyebrow">Platform Features</p>
            <h2 className="th-section__title">{data.page3.title}</h2>
            <p className="th-section__sub">{data.page3.subtitle}</p>
          </AnimatedSection>
          <div className="th-features">
            {data.page3.features.map((f, i) => (
              <AnimatedSection key={i} delay={i * 60}>
                <div className="th-feature-card">
                  <div className="th-feature-card__icon">{featureIcons[i]}</div>
                  <h3 className="th-feature-card__title">{f.title}</h3>
                  <p className="th-feature-card__desc">{f.description}</p>
                  <div className="th-feature-card__line"></div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="th-section" id="pricing">
        <div className="th-container">
          <AnimatedSection className="th-section__head">
            <p className="th-eyebrow">Pricing</p>
            <h2 className="th-section__title">{data.page4.title}</h2>
            <p className="th-section__sub">{data.page4.subtitle}</p>
          </AnimatedSection>
          <div className="th-plans">
            {data.page4.plans.map((plan, i) => (
              <AnimatedSection key={i} delay={i * 100}>
                <div className={`th-plan ${plan.badge ? "th-plan--featured" : ""}`}>
                  {plan.badge && <div className="th-plan__badge">{plan.badge}</div>}
                  <div className="th-plan__header">
                    <h3 className="th-plan__name">{plan.name}</h3>
                    <div className="th-plan__price">
                      <span className="th-plan__amount">{plan.price}</span>
                      <span className="th-plan__period">{plan.duration}</span>
                    </div>
                    <p className="th-plan__desc">{plan.description}</p>
                  </div>
                  <ul className="th-plan__features">
                    {plan.features.map((f, j) => (
                      <li key={j}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button className={`th-btn th-plan__btn ${plan.badge ? "th-btn--solid" : "th-btn--outline"}`}>
                    {plan.button.text}
                  </button>
                  <div className="th-plan__glow"></div>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection>
            <div className="th-enterprise">
              <div className="th-enterprise__left">
                <p className="th-eyebrow">Enterprise</p>
                <h3>{data.page4.enterprise.title}</h3>
                <p>{data.page4.enterprise.description}</p>
              </div>
              <button className="th-btn th-btn--solid">{data.page4.enterprise.button.text}</button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="th-section th-section--alt" id="testimonials">
        <div className="th-container">
          <AnimatedSection className="th-section__head">
            <p className="th-eyebrow">Success Stories</p>
            <h2 className="th-section__title">{data.page5.title}</h2>
            <p className="th-section__sub">{data.page5.subtitle}</p>
          </AnimatedSection>
          <div className="th-testimonials">
            {data.page5.stories.map((s, i) => (
              <AnimatedSection key={i} delay={i * 100}>
                <div className="th-testi">
                  <div className="th-testi__stars">★★★★★</div>
                  <p className="th-testi__quote">"{s.quote}"</p>
                  <div className="th-testi__footer">
                    <div className="th-testi__avatar">{s.avatar}</div>
                    <div className="th-testi__info">
                      <strong>{s.name}</strong>
                      <span>{s.role}</span>
                    </div>
                  </div>
                  <div className="th-testi__stats">
                    <div className="th-testi__stat">
                      <strong>{s.stats.careerFit}</strong><span>Career Fit</span>
                    </div>
                    <div className="th-testi__stat">
                      <strong>{s.stats.package}</strong><span>Package</span>
                    </div>
                    <div className="th-testi__stat">
                      <strong>{s.stats.time}</strong><span>Timeline</span>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="th-cta">
        <div className="th-orb th-orb--cta1"></div>
        <div className="th-orb th-orb--cta2"></div>
        <div className="th-container th-cta__inner">
          <AnimatedSection>
            <h2 className="th-cta__title">{data.h1}</h2>
            <p className="th-cta__desc">{data.description}</p>
            <div className="th-cta__btns">
              <button className="th-btn th-btn--solid th-btn--lg">{data.signupButton}</button>
     <a        
  href="#pricing"
  className="th-btn th-btn--outline th-btn--lg"
  onClick={(e) => {
    e.preventDefault();
    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
  }}
>
  {data.plansButton}
</a>
            </div>
          </AnimatedSection>
        </div>
      </section>

    

    </div>
  );
}

export default TalentHub;