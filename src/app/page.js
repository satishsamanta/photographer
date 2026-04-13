"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [loadingDone, setLoadingDone] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightboxMedia, setLightboxMedia] = useState(null);
  const [counters, setCounters] = useState({ projects: 0, clients: 0, awards: 0 });
  const statsRef = useRef(null);
  const [statsAnimated, setStatsAnimated] = useState(false);

  // Loading screen
  useEffect(() => {
    const timer = setTimeout(() => setLoadingDone(true), 2200);
    return () => clearTimeout(timer);
  }, []);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Counter animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !statsAnimated) {
          setStatsAnimated(true);
          animateCounters();
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [statsAnimated]);

  const animateCounters = () => {
    const targets = { projects: 500, clients: 200, awards: 25 };
    const duration = 2000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setCounters({
        projects: Math.floor(targets.projects * eased),
        clients: Math.floor(targets.clients * eased),
        awards: Math.floor(targets.awards * eased),
      });

      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  };

  // Scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [loadingDone]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const portfolioItems = [
    { id: 1, title: "Royal Wedding Ceremony", category: "weddings", image: "/images/portfolio-wedding.png" },
    { id: 2, title: "Brand Commercial", category: "ads", image: "/images/portfolio-ad.png" },
    { id: 3, title: "Corporate Summit 2024", category: "corporate", image: "/images/portfolio-corporate.png" },
    { id: 4, title: "Fashion Editorial", category: "fashion", image: "/images/portfolio-fashion.png" },
    { id: 5, title: "Luxury Destination Wedding", category: "weddings", image: "/images/hero-bg.png" },
    { id: 6, title: "Celebrity Brand Shoot", category: "ads", image: "/images/founder.png" },
    { id: 7, title: "Urban Fashion Lookbook", category: "fashion", image: "/photos/447961063_989868746481102_1711626812262892299_n.jpg" },
    { id: 8, title: "Pre-Wedding Cinematic", category: "weddings", image: "/photos/482211349_9236485556407167_243713869168393571_n.jpg" },
    { id: 9, title: "Corporate Event Highlights", category: "corporate", image: "/photos/492380641_1242459877888653_6882821371512764498_n.jpg" },
    { id: 10, title: "Fashion Week Backstage", category: "fashion", image: "/photos/654804070_18101558786495313_4351414341198947237_n.webp" },
    { id: 11, title: "Influencer Ad Campaign", category: "ads", image: "/photos/655042902_18120232798624424_2090919431757806110_n.webp" },
    { id: 12, title: "Editorial Magazine Cover", category: "fashion", image: "/photos/655117234_18093714361869852_5230654291795419148_n.webp" },
    { id: 13, title: "Luxury Hotel Promo", category: "ads", image: "/photos/655455522_18094432271028364_1996730010848560113_n.webp" },
    { id: 14, title: "Intimate Wedding Vows", category: "weddings", image: "/photos/656866250_18110782519695872_4093416340793227629_n.webp" },
    { id: 15, title: "Lifestyle Branding", category: "corporate", image: "/photos/669928916_18583871479029690_6792122528868172703_n.webp" },
    { id: 16, title: "High-End Car Commercial", category: "ads", image: "/photos/AQN75XakLdkkIAmI7HwrbVI3RkU8ENs6d_MS_ex8IYIPjLVUvyhBwccgSmrwDxlfk_16q1SAefBvs_XO94UoBNXn.mp4" },
    { id: 17, title: "Couture Design Runway", category: "fashion", image: "/photos/AQOTj11qxTYLBa3QzyOKw6HSKqJMsIw6rNadL46qcgn3cKZNyzxLZf3fh2P4Knltw5ZlzxaJPni4qD0H5fmjEaci_x9lBhXD3pxnw-k.mp4" },
    { id: 18, title: "Brand Identity Shoot", category: "corporate", image: "/photos/Book Your Brand Shoot with Us !!!Let your brand speak through visuals that sell stories, not ju.heic" }
  ];

  const filteredPortfolio = activeFilter === "all"
    ? portfolioItems.slice(0, 6)
    : portfolioItems.filter((item) => item.category === activeFilter);

  return (
    <>
      {/* ====== LOADING SCREEN ====== */}
      <div className={`loading-screen ${loadingDone ? "hidden" : ""}`}>
        <div className="loading-logo">Renaissance</div>
        <div className="loading-bar">
          <div className="loading-bar-inner"></div>
        </div>
      </div>

      {/* ====== FLOATING ICONS ====== */}
      <div className="floating-icons">
        <a
          href="https://facebook.com/renaissanceentertainment"
          target="_blank"
          rel="noopener noreferrer"
          className="floating-icon facebook"
          id="floating-facebook"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          <span className="tooltip">Connect on Facebook</span>
        </a>
        <a 
          href="https://youtube.com/@renaissanceentertainment" 
          target="_blank"
          rel="noopener noreferrer"
          className="floating-icon youtube" 
          id="floating-youtube"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C.001 8.083 0 12 0 12s.001 3.917.501 5.814a3.016 3.016 0 0 0 2.122 2.136C4.495 20.5 12 20.5 12 20.5s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C23.999 15.917 24 12 24 12s-.001-3.917-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
          <span className="tooltip">Watch on YouTube</span>
        </a>
        <a
          href="https://instagram.com/renaissanceentertainment"
          target="_blank"
          rel="noopener noreferrer"
          className="floating-icon instagram"
          id="floating-instagram"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
          </svg>
          <span className="tooltip">Follow on Instagram</span>
        </a>
      </div>

      {/* ====== BACK TO TOP ====== */}
      <button
        className={`back-to-top ${showBackToTop ? "visible" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        id="back-to-top"
      >
        ↑
      </button>

      {/* ====== NAVBAR ====== */}
      <nav className={`navbar ${isScrolled ? "scrolled" : ""}`} id="navbar">
        <div className="container">
          <a className="nav-logo" onClick={() => scrollTo("hero")}>
            <span className="logo-icon">R</span>
            <span className="logo-text">Renaissance</span>
          </a>

          <div className={`nav-links ${menuOpen ? "open" : ""}`}>
            <a href="#">About Us</a>
            <a href="#">About Founder</a>
            <a href="#">Photography</a>
            <a href="#">Cinema</a>
            <a href="#">Digital Agency</a>
            <a href="#">Freelance Work</a>
            <a href="#" className="nav-cta">Contact Us</a>
          </div>

          <div
            className={`menu-toggle ${menuOpen ? "active" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            id="menu-toggle"
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      {/* ====== HERO SECTION ====== */}
      <section className="hero" id="hero">
        <div className="hero-bg">
          <Image
            src="/images/hero-bg.png"
            alt="Cinematic production background"
            fill
            priority
            style={{ objectFit: "cover", filter: "brightness(0.4)" }}
          />
        </div>
        <div className="hero-overlay"></div>

        <div className="hero-particles">
          {[
            { l: 5, d: 8, dl: 0.2, w: 2.3, h: 3.1 },
            { l: 12, d: 14, dl: 2.5, w: 4.1, h: 2.8 },
            { l: 20, d: 9, dl: 1.0, w: 3.5, h: 4.2 },
            { l: 28, d: 11, dl: 4.7, w: 2.6, h: 3.7 },
            { l: 35, d: 7, dl: 3.2, w: 4.8, h: 2.1 },
            { l: 42, d: 15, dl: 0.8, w: 3.2, h: 4.5 },
            { l: 50, d: 10, dl: 5.5, w: 2.9, h: 3.3 },
            { l: 58, d: 12, dl: 1.8, w: 4.3, h: 2.5 },
            { l: 65, d: 8, dl: 4.0, w: 3.7, h: 4.9 },
            { l: 72, d: 13, dl: 2.2, w: 2.2, h: 3.0 },
            { l: 78, d: 9, dl: 5.0, w: 4.6, h: 2.7 },
            { l: 85, d: 16, dl: 0.5, w: 3.0, h: 4.4 },
            { l: 90, d: 7, dl: 3.8, w: 2.5, h: 3.9 },
            { l: 15, d: 11, dl: 1.3, w: 4.0, h: 2.3 },
            { l: 38, d: 14, dl: 4.5, w: 3.4, h: 4.7 },
            { l: 55, d: 8, dl: 2.0, w: 2.8, h: 3.6 },
            { l: 68, d: 10, dl: 5.2, w: 4.4, h: 2.9 },
            { l: 82, d: 13, dl: 0.3, w: 3.1, h: 4.1 },
            { l: 95, d: 9, dl: 3.5, w: 2.4, h: 3.4 },
            { l: 48, d: 12, dl: 1.6, w: 4.2, h: 2.6 },
          ].map((p, i) => (
            <span
              key={i}
              className="particle"
              style={{
                left: `${p.l}%`,
                animationDuration: `${p.d}s`,
                animationDelay: `${p.dl}s`,
                width: `${p.w}px`,
                height: `${p.h}px`,
              }}
            />
          ))}
        </div>

        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            Premium Entertainment Agency
          </div>

          <h1 className="hero-title">
            <span className="line">We Don&apos;t Create Content.</span>
            <span className="line">
              We Create <span className="highlight">Experiences.</span>
            </span>
          </h1>

          <p className="hero-subtitle">
            From cinematic weddings to high-impact ad campaigns, we craft visual
            stories that move hearts and build brands.
          </p>

          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => scrollTo("portfolio")} id="hero-cta-work">
              🎥 View Our Work
            </button>
            <button className="btn-outline" onClick={() => scrollTo("contact")} id="hero-cta-quote">
              📞 Get a Quote
            </button>
          </div>
        </div>

        <div className="hero-scroll">
          <span>Scroll</span>
          <div className="scroll-line"></div>
        </div>
      </section>

      {/* ====== MARQUEE ====== */}
      <div className="marquee-section">
        <div className="marquee-track">
          {[...Array(2)].map((_, setIdx) => (
            <span key={setIdx} style={{ display: "contents" }}>
              {["Film Production", "Wedding Cinematography", "Celebrity Management", "Brand Strategy", "Event Production", "Fashion Shoots", "Corporate Films", "Music Videos"].map(
                (item, i) => (
                  <span className="marquee-item" key={`${setIdx}-${i}`}>
                    {item} <span className="dot"></span>
                  </span>
                )
              )}
            </span>
          ))}
        </div>
      </div>

      {/* ====== ABOUT SECTION ====== */}
      <section className="about section-padding" id="about">
        <div className="container">
          <div className="about-grid">
            <div className="about-image animate-on-scroll">
              <div className="about-image-wrapper">
                <img
                  src="/images/about-team.png"
                  alt="Renaissance Entertainment creative team"
                  style={{ objectFit: "cover", width: "100%", height: "500px" }}
                />
              </div>
              <div className="about-image-frame"></div>
              <div className="about-experience-badge">
                <span className="number">8+</span>
                <span className="text">Years</span>
              </div>
            </div>

            <div className="about-content animate-on-scroll">
              <span className="section-label">Our Story</span>
              <h2 className="section-title">
                Crafting Visual Legacies Since Day One
              </h2>
              <p className="about-text">
                Born from a restless passion for storytelling, Renaissance
                Entertainment isn&apos;t just another production house — we&apos;re
                architects of emotion. Every frame we shoot, every event we
                curate, and every brand we build carries the weight of our
                artistic vision.
              </p>
              <p className="about-text">
                From intimate weddings to grand corporate campaigns, we bring a
                cinematic eye to everything we touch. Our team of visionaries,
                technical experts, and creative strategists work in harmony to
                deliver experiences that transcend the ordinary.
              </p>

              <div className="about-stats" ref={statsRef}>
                <div className="stat-item">
                  <div className="stat-number">{counters.projects}+</div>
                  <div className="stat-label">Projects</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">{counters.clients}+</div>
                  <div className="stat-label">Happy Clients</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">{counters.awards}+</div>
                  <div className="stat-label">Awards</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== SERVICES SECTION ====== */}
      <section className="services section-padding" id="services">
        <div className="container">
          <div className="services-header animate-on-scroll">
            <span className="section-label" style={{ justifyContent: "center" }}>
              What We Do
            </span>
            <h2 className="section-title">Our Premium Services</h2>
            <p className="section-subtitle">
              We offer a complete suite of creative services designed to elevate
              your brand and create unforgettable moments.
            </p>
          </div>

          <div className="services-grid">
            {[
              {
                icon: "🎬",
                title: "Film Production",
                desc: "From concept to screen — ad films, music videos, short films, and documentaries with Hollywood-grade production quality.",
              },
              {
                icon: "💍",
                title: "Wedding & Event Management",
                desc: "Luxury wedding cinematography and full-service event management that turns your special day into a cinematic masterpiece.",
              },
              {
                icon: "📸",
                title: "Photoshoots & Portfolio",
                desc: "Professional portfolio shoots, fashion editorials, product photography, and creative portraits that tell your unique story.",
              },
              {
                icon: "🌟",
                title: "Celebrity Management",
                desc: "End-to-end artist management, public appearances, brand endorsements, and career strategy for rising and established talent.",
              },
              {
                icon: "📢",
                title: "Branding & PR",
                desc: "Strategic brand positioning, digital identity design, press coverage, and media relations that amplify your presence.",
              },
              {
                icon: "🎯",
                title: "Digital Marketing",
                desc: "Data-driven social media campaigns, content strategy, influencer partnerships, and performance marketing for maximum ROI.",
              },
            ].map((service, index) => (
              <div
                className="service-card animate-on-scroll"
                key={index}
                style={{ animationDelay: `${index * 0.1}s` }}
                id={`service-${index}`}
              >
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
                <span className="service-explore">
                  Explore <span className="arrow">→</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== PORTFOLIO SECTION ====== */}
      <section className="portfolio section-padding" id="portfolio">
        <div className="container">
          <div className="portfolio-header animate-on-scroll">
            <span className="section-label" style={{ justifyContent: "center" }}>
              Our Work
            </span>
            <h2 className="section-title">
              Featured <span className="gold-text">Showreel</span>
            </h2>
            <p className="section-subtitle">
              A glimpse into our world of visual storytelling. Each project is a
              testament to our commitment to excellence.
            </p>
          </div>

          <div className="portfolio-filters animate-on-scroll">
            {[
              { key: "all", label: "All Projects" },
              { key: "weddings", label: "Weddings" },
              { key: "ads", label: "Ad Films" },
              { key: "corporate", label: "Corporate" },
              { key: "fashion", label: "Fashion" },
            ].map((filter) => (
              <button
                key={filter.key}
                className={`filter-btn ${activeFilter === filter.key ? "active" : ""}`}
                onClick={() => setActiveFilter(filter.key)}
                id={`filter-${filter.key}`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div 
            className={`portfolio-grid ${filteredPortfolio.length >= 5 ? 'bento-layout' : 'standard-layout'}`}
            key={activeFilter}
          >
            {filteredPortfolio.map((item, index) => (
              <div 
                className="portfolio-item animate-pop" 
                key={item.id} 
                id={`portfolio-${item.id}`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setLightboxMedia(item.image)}
              >
                {item.image.endsWith('.mp4') ? (
                  <video
                    src={item.image}
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                ) : (
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                  />
                )}
                <div className="portfolio-number">{String(index + 1).padStart(2, '0')}</div>
                <div className="portfolio-tag">{item.category}</div>
                <div className="portfolio-corner top-left"></div>
                <div className="portfolio-corner bottom-right"></div>
                <div className="portfolio-overlay">
                  <h4>{item.title}</h4>
                  <span className="category">{item.category}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="portfolio-view-all animate-on-scroll">
            <button className="btn-view-all" id="view-all-projects">
              <span>View All Projects</span>
              <span className="arrow-icon">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* ====== TESTIMONIALS ====== */}
      <section className="testimonials section-padding" id="testimonials">
        <div className="container">
          <div className="testimonials-header animate-on-scroll">
            <span className="section-label" style={{ justifyContent: "center" }}>
              Client Love
            </span>
            <h2 className="section-title">What Our Clients Say</h2>
            <p className="section-subtitle">
              Every project is a partnership. Here&apos;s what our clients have to say
              about working with us.
            </p>
          </div>

          <div className="testimonials-grid">
            {[
              {
                text: "Renaissance turned our wedding into a cinematic masterpiece. Every frame, every moment — pure magic. We couldn't have asked for a better team.",
                name: "Priya & Rahul",
                role: "Wedding Client",
                initial: "PR",
              },
              {
                text: "Their creative vision for our brand campaign was exceptional. The production quality exceeded our expectations and delivered incredible ROI.",
                name: "Arjun Mehta",
                role: "CEO, TechVault India",
                initial: "AM",
              },
              {
                text: "Working with Renaissance was seamless. From celebrity coordination to event execution, they handled everything with impeccable professionalism.",
                name: "Sneha Kapoor",
                role: "Talent Manager",
                initial: "SK",
              },
            ].map((testimonial, index) => (
              <div
                className="testimonial-card animate-on-scroll"
                key={index}
                style={{ animationDelay: `${index * 0.15}s` }}
                id={`testimonial-${index}`}
              >
                <div className="testimonial-stars">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <p className="testimonial-text">{testimonial.text}</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">{testimonial.initial}</div>
                  <div className="testimonial-author-info">
                    <h5>{testimonial.name}</h5>
                    <span>{testimonial.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== WHY CHOOSE US ====== */}
      <section className="why-choose section-padding" id="why-choose">
        <div className="container">
          <div className="why-choose-header animate-on-scroll">
            <span className="section-label" style={{ justifyContent: "center" }}>
              Why Us
            </span>
            <h2 className="section-title">The Renaissance Difference</h2>
            <p className="section-subtitle">
              What sets us apart isn&apos;t just our work — it&apos;s our unwavering
              commitment to excellence in every detail.
            </p>
          </div>

          <div className="why-choose-grid">
            {[
              {
                icon: "🎯",
                title: "Creative Direction",
                desc: "Every project starts with a bold creative vision tailored to your brand.",
              },
              {
                icon: "🎥",
                title: "In-house Production",
                desc: "Full production capabilities under one roof — no outsourcing, no compromises.",
              },
              {
                icon: "⚡",
                title: "Fast Delivery",
                desc: "Tight deadlines? We thrive under pressure with rapid turnaround times.",
              },
              {
                icon: "🌍",
                title: "Premium Quality",
                desc: "International-grade output with attention to every single frame and pixel.",
              },
            ].map((item, index) => (
              <div
                className="why-card animate-on-scroll"
                key={index}
                style={{ animationDelay: `${index * 0.1}s` }}
                id={`why-${index}`}
              >
                <div className="why-icon">{item.icon}</div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== CTA SECTION ====== */}
      <section className="cta-section" id="cta">
        <div className="cta-bg"></div>
        <div className="container">
          <div className="cta-content animate-on-scroll">
            <h2 className="cta-title">
              Let&apos;s Create Something{" "}
              <span className="gold-text">Extraordinary</span>
            </h2>
            <p className="cta-subtitle">
              Your vision deserves a team that&apos;s as passionate about your story
              as you are. Let&apos;s bring it to life together.
            </p>
            <div className="cta-buttons">
              <button className="btn-primary" onClick={() => scrollTo("contact")} id="cta-quote-btn">
                Get a Free Quote
              </button>
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
                id="cta-whatsapp-btn"
              >
                💬 WhatsApp Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ====== CONTACT SECTION ====== */}
      <section className="contact section-padding" id="contact">
        <div className="container">
          <div className="animate-on-scroll">
            <span className="section-label">Get In Touch</span>
          </div>

          <div className="contact-grid">
            <div className="contact-info animate-on-scroll">
              <h3>
                Let&apos;s Start a <span className="gold-text">Conversation</span>
              </h3>
              <p>
                Whether you have a project in mind or just want to explore
                possibilities, we&apos;d love to hear from you. Reach out and let&apos;s
                create something remarkable.
              </p>

              <div className="contact-detail" id="contact-phone">
                <div className="contact-detail-icon">📞</div>
                <div>
                  <h5>Phone</h5>
                  <p>+91 99999 99999</p>
                </div>
              </div>

              <div className="contact-detail" id="contact-email">
                <div className="contact-detail-icon">✉️</div>
                <div>
                  <h5>Email</h5>
                  <p>hello@renaissanceentertainment.in</p>
                </div>
              </div>

              <div className="contact-detail" id="contact-location">
                <div className="contact-detail-icon">📍</div>
                <div>
                  <h5>Location</h5>
                  <p>Delhi NCR / Noida, India</p>
                </div>
              </div>

              <div className="contact-detail" id="contact-hours">
                <div className="contact-detail-icon">🕐</div>
                <div>
                  <h5>Working Hours</h5>
                  <p>Mon - Sat: 10:00 AM - 7:00 PM</p>
                </div>
              </div>
            </div>

            <div className="contact-form animate-on-scroll">
              <h4>
                Send Us a <span className="gold-text">Message</span>
              </h4>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Your Name</label>
                    <input type="text" id="name" placeholder="John Doe" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input type="tel" id="phone" placeholder="+91 99999 99999" />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="you@example.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="service">Service Interested In</label>
                  <select id="service">
                    <option value="">Select a service</option>
                    <option value="film">Film Production</option>
                    <option value="wedding">Wedding & Events</option>
                    <option value="photo">Photoshoots & Portfolio</option>
                    <option value="celebrity">Celebrity Management</option>
                    <option value="branding">Branding & PR</option>
                    <option value="digital">Digital Marketing</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    placeholder="Tell us about your project..."
                    rows={5}
                  ></textarea>
                </div>

                <button type="submit" className="form-submit" id="form-submit">
                  Send Your Message →
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ====== FOOTER ====== */}
      <footer className="footer" id="footer">
        <div className="footer-main">
          <div className="container">
            <div className="footer-grid">
              <div className="footer-brand">
                <div className="footer-logo">
                  <span className="logo-text">Renaissance Entertainment</span>
                </div>
                <p>
                  Premium film production & creative agency specializing in
                  crafting extraordinary visual experiences. Based in Delhi NCR.
                </p>
                <div className="footer-social">
                  <a
                    href="https://facebook.com/renaissanceentertainment"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    id="social-facebook"
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a
                    href="https://instagram.com/renaissanceentertainment"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    id="social-instagram"
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                    </svg>
                  </a>
                  <a
                    href="https://youtube.com/@renaissanceentertainment"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    id="social-youtube"
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C.001 8.083 0 12 0 12s.001 3.917.501 5.814a3.016 3.016 0 0 0 2.122 2.136C4.495 20.5 12 20.5 12 20.5s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C23.999 15.917 24 12 24 12s-.001-3.917-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                </div>
              </div>

              <div className="footer-col">
                <h5>Services</h5>
                <a href="#services">Film Production</a>
                <a href="#services">Wedding & Events</a>
                <a href="#services">Photoshoots</a>
                <a href="#services">Celebrity Management</a>
                <a href="#services">Branding & PR</a>
              </div>

              <div className="footer-col">
                <h5>Company</h5>
                <a href="#about">About Us</a>
                <a href="#portfolio">Portfolio</a>
                <a href="#testimonials">Testimonials</a>
                <a href="#contact">Contact</a>
                <a href="#">Careers</a>
              </div>

              <div className="footer-col footer-newsletter">
                <h5>Newsletter</h5>
                <p>
                  Stay updated with our latest projects, behind-the-scenes
                  content, and industry insights.
                </p>
                <div className="footer-newsletter-form">
                  <input type="email" placeholder="Enter your email" id="newsletter-email" />
                  <button id="newsletter-submit">→</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="footer-bottom">
            <p>© 2024 Renaissance Entertainment. All Rights Reserved.</p>
            <div className="footer-bottom-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ====== LIGHTBOX ====== */}
      {lightboxMedia && (
        <div className="lightbox-overlay" onClick={() => setLightboxMedia(null)}>
          <button className="lightbox-close" onClick={() => setLightboxMedia(null)}>✕</button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            {lightboxMedia.endsWith('.mp4') ? (
              <video src={lightboxMedia} autoPlay controls playsInline />
            ) : (
              <img src={lightboxMedia} alt="Expanded View" />
            )}
          </div>
        </div>
      )}

      {/* ====== Intersection Observer Animation Styles ====== */}
      <style jsx global>{`
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .animate-on-scroll.animate-visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </>
  );
}
