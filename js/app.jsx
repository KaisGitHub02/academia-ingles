const { useState, useEffect, useRef } = React;

// ---------- Data ----------
const slides = [
  {
    id: 1,
    eyebrow: "Familias en Granada",
    title: "Inglés flexible para familias que buscan resultados",
    description:
      "Clases con metodología activa, panel para familias y seguimiento semanal para que todos conozcan el progreso.",
    image: "assets/images/slide1.jpg",
    ctas: [
      { label: "Explorar cursos", href: "course-kids.html", style: "primary" },
      { label: "Reservar prueba", href: "nivel.html", style: "secondary" }
    ]
  },
  {
    id: 2,
    eyebrow: "Adolescentes conectados",
    title: "Clubes creativos, pitch nights y preparación Cambridge",
    description:
      "Mentores nativos, proyectos STEAM y simulacros reales para que los teens ganen confianza antes de sus metas académicas.",
    image: "assets/images/slide2.jpg",
    ctas: [
      { label: "Teens Pro 12+", href: "course-ten.html", style: "primary" },
      {
        label: "Escribir por WhatsApp",
        href: "https://wa.me/34622854358?text=Quiero%20info%20para%20mi%20family%20en%20Be%20One",
        style: "secondary",
        external: true
      }
    ]
  },
  {
    id: 3,
    eyebrow: "Padres acompañados",
    title: "Panel privado con tips, actividades en casa y eventos bilingües",
    description:
      "Recibe actividades para el hogar, acceso al calendario familiar y charlas sobre cómo acompañar el aprendizaje.",
    image: "assets/images/slide3.png",
    ctas: [
      { label: "Calendario familiar", href: "blog.html", style: "secondary" },
      {
        label: "Hablar con asesor",
        href: "https://wa.me/34622854358?text=Quiero%20hablar%20con%20Be%20One",
        style: "primary",
        external: true
      }
    ]
  }
];

const pillars = [
  {
    icon: "fa-solid fa-palette",
    title: "Ambiente cuidado",
    copy: "Aulas luminosas, materiales ilustrados y dashboards claros que inspiran a familias enteras."
  },
  {
    icon: "fa-solid fa-headset",
    title: "Tutor familiar",
    copy: "Mentor asignado con reuniones cortas para resolver dudas y ajustar el plan."
  },
  {
    icon: "fa-solid fa-heart",
    title: "Wellbeing primero",
    copy: "Dinámicas socioemocionales para mantener motivación y confianza en cada sesión."
  },
  {
    icon: "fa-solid fa-star",
    title: "Resultados medibles",
    copy: "Reportes interactivos y certificaciones Cambridge, Trinity, IELTS y TOEFL."
  }
];

const courseList = [
  {
    id: "kids",
    title: "Kids Club 4-12",
    description:
      "Historias interactivas, proyectos maker y micro-retos para consolidar vocabulario y speaking.",
    mode: "Presencial",
    link: "course-kids.html",
    badge: "A1 - B1",
    image: "assets/images/kids.jpg"
  },
  {
    id: "teens",
    title: "Teens Pro 12+",
    description:
      "Workshops STEAM, pitch nights y feedback individual para preparar exámenes y entrevistas.",
    mode: "Híbrido",
    link: "course-ten.html",
    badge: "A2 - C1",
    image: "assets/images/teenagers.jpg"
  },
  {
    id: "adults",
    title: "Adult Boost A1-C2",
    description:
      "Clases flexibles, podcast guiados y sesiones express para acompañar a los padres en paralelo.",
    mode: "Online + Presencial",
    link: "course-adult.html",
    badge: "A1 - C2",
    image: "assets/images/adult.jpg"
  },
  {
    id: "business",
    title: "Inglés Corporativo",
    description:
      "Programas para empresas familiares y equipos que desean comunicarse con partners internacionales.",
    mode: "In-Company",
    link: "course-busi.html",
    badge: "Equipos",
    image: "assets/images/bussiness.png"
  },
  {
    id: "private",
    title: "Mentoring 1:1",
    description:
      "Clases particulares para objetivos específicos como viajes, Erasmus, oposiciones o speaking coach.",
    mode: "Personalizadas",
    link: "course-particulares.html",
    badge: "Agenda flexible",
    image: "assets/images/particular.jpg"
  },
  {
    id: "intensive",
    title: "Intensivos 2025",
    description:
      "Rutas de 4, 6 u 8 semanas con simulacros diarios y seguimiento por WhatsApp para toda la familia.",
    mode: "Híbrido",
    link: "intensivos.html",
    badge: "Cupos limitados",
    image: "assets/images/Intensivos2025.jpg"
  }
];

const intensivoCourses = [
  {
    id: "b1",
    title: "Intensivo B1 - Intermediate",
    description: "4 semanas intensivas para consolidar B1. Simulaciones diarias de Speaking y Writing con feedback personalizado.",
    duration: "4 semanas",
    schedule: "Lunes a viernes · 9:00-13:00",
    features: ["Simulacros de examen", "Materiales oficiales Cambridge", "Seguimiento por WhatsApp", "Certificación final"],
    level: "B1",
    color: "#4CAF50"
  },
  {
    id: "b2",
    title: "Intensivo B2 - Upper Intermediate",
    description: "6 semanas intensivas para alcanzar B2. Preparación completa para First Certificate con prácticas reales.",
    duration: "6 semanas",
    schedule: "Lunes a viernes · 9:00-13:00",
    features: ["Simulacros oficiales", "Writing corrections", "Speaking con nativos", "Examen simulacro incluido"],
    level: "B2",
    color: "#2196F3"
  },
  {
    id: "c1",
    title: "Intensivo C1 - Advanced",
    description: "8 semanas para dominar el C1. Grammar avanzada, vocabulario académico y preparación para Proficiency.",
    duration: "8 semanas",
    schedule: "Lunes a viernes · 9:00-13:00",
    features: ["Grammar avanzada", "Vocabulario académico", "Speaking de nivel C1", "Materiales Cambridge originales"],
    level: "C1",
    color: "#9C27B0"
  },
  {
    id: "c2",
    title: "Intensivo C2 - Proficiency",
    description: "Programa elite para obtener C2. Preparación intensiva para el examen más avanzado de Cambridge.",
    duration: "8 semanas",
    schedule: "Lunes a viernes · 9:00-13:00",
    features: ["Preparación CPE", "Simulacros oficiales", "Feedback experto", "Garantía de resultado"],
    level: "C2",
    color: "#FF5722"
  }
];

const stats = [
  { id: "families", value: 320, suffix: "+", label: "Familias acompañadas cada año" },
  { id: "mentors", value: 14, suffix: "", label: "Mentores certificados y nativos" },
  { id: "events", value: 36, suffix: "", label: "Eventos bilingües familiares" },
  { id: "success", value: 98, suffix: "%", label: "Éxito en certificaciones" }
];

const testimonials = [
  {
    id: 1,
    quote:
      "El panel para padres es súper claro. Mi hija comparte sus badges en casa y vemos exactamente cómo avanza.",
    author: "Ana Belén",
    role: "Mamá de Sofía · Kids Club",
    image: "assets/images/review3.jpg"
  },
  {
    id: 2,
    quote:
      "El programa Teens Pro me ayudó a ganar fluidez y tranquilidad antes del B2. Las pitch nights molan.",
    author: "Jorge Martínez",
    role: "B2 First · 17 años",
    image: "assets/images/review4.jpg"
  },
  {
    id: 3,
    quote:
      "En la empresa necesitábamos reporting en inglés. Be One diseñó sesiones a medida que dinamizaron al equipo.",
    author: "Lucía Ramos",
    role: "People Lead · Sector Tech",
    image: "assets/images/review5.jpg"
  }
];

const faqs = [
  {
    id: "niveles",
    question: "¿Qué niveles cubrís?",
    answer: "Desde A1 hasta C2 con itinerarios adaptados para niños, teens, adultos y empresas."
  },
  {
    id: "familias",
    question: "¿Cómo implicáis a las familias?",
    answer:
      "Panel privado, eventos bilingües mensuales y mini-retos para practicar en casa con la familia."
  },
  {
    id: "online",
    question: "¿Ofrecéis clases online?",
    answer: "Sí, formato online en directo, híbrido y vídeos de refuerzo para repasar cuando quieras."
  },
  {
    id: "certificaciones",
    question: "¿Preparáis exámenes oficiales?",
    answer:
      "Especialistas Cambridge, Trinity, IELTS y TOEFL con simulacros reales y feedback puntual."
  },
  {
    id: "horarios",
    question: "¿Qué horarios tenéis?",
    answer: "Turnos de mañana, tarde y noche, además de clubs los sábados y campus en verano."
  },
  {
    id: "pagos",
    question: "¿Hay facilidades de pago?",
    answer: "Sí, cuotas mensuales sin intereses y descuentos para hermanos o empresas."
  }
];

const contactChannels = [
  {
    label: "Email",
    value: "beoneenglish@gmail.com",
    href: "mailto:beoneenglish@gmail.com",
    icon: "fa-regular fa-envelope"
  },
  {
    label: "Teléfono",
    value: "+34 622 854 358",
    href: "tel:+34622854358",
    icon: "fa-solid fa-phone"
  },
  {
    label: "Dirección",
    value: "Ctra. de Málaga, 44 · Chana · Granada",
    href: "https://maps.app.goo.gl/u9SaZUoZXQ5nfoiaA",
    icon: "fa-solid fa-location-dot",
    external: true
  }
];

const navLinks = [
  { href: "index.html", label: "Inicio" },
  { href: "about-us.html", label: "Nosotros" },
  {
    label: "Cursos",
    isCourseLink: true
  },
  { href: "examenes.html", label: "Exámenes" },
  {
    href: "intensivos.html",
    label: "Intensivos",
    dropdown: [
      { href: "intensivos.html", label: "Intensivos 2025", description: "Rutas 4-8 semanas · cupos limitados" },
      { href: "nivel.html", label: "Prueba de nivel", description: "Agenda gratuita en 15 minutos" },
      { href: "blog.html", label: "Actividades familiares", description: "Calendario de clubs y eventos" }
    ]
  },
  { href: "blog.html", label: "Actividades" },
  { href: "contact-us.html", label: "Contacto" }
];

const socialLinks = [
  {
    href: "https://www.facebook.com/BeOneEnglishLanguageCentre/",
    icon: "fa-brands fa-facebook-f"
  },
  {
    href: "https://wa.me/34622854358",
    icon: "fa-brands fa-whatsapp"
  },
  {
    href: "https://maps.app.goo.gl/u9SaZUoZXQ5nfoiaA",
    icon: "fa-solid fa-map-location-dot"
  }
];

const audiencePrograms = [
  {
    id: "kids",
    title: "Kids Club (4-12)",
    goals: ["Rutinas de vocabulario", "Storytelling multisensorial", "Sessions con native speakers"],
    support: "Mini podcast para practicar en casa + retos familiares semanales."
  },
  {
    id: "teens",
    title: "Teens Pro (12-18)",
    goals: ["Pitch nights", "Portfolio STEAM", "Simulacros Cambridge"],
    support: "Feedback individual + guía para padres sobre seguimiento emocional."
  },
  {
    id: "parents",
    title: "Padres acompañados",
    goals: ["Charlas trimestrales", "Toolkit para estudiar juntos", "Clases express"],
    support: "Atención directa por WhatsApp y biblioteca de recursos."
  },
  {
    id: "family",
    title: "Experiencia familiar",
    goals: ["Eventos bilingües", "Semana cultural", "Excursiones"],
    support: "Calendario interactivo conectado con Google Calendar."
  }
];

const journeySteps = [
  {
    id: 1,
    title: "Prueba de nivel + charla familiar",
    detail: "Diagnóstico gratuito, detección de metas escolares y estilo de aprendizaje."
  },
  {
    id: 2,
    title: "Itinerario a medida",
    detail: "Definimos ritmo, materiales y tutor acompañante según edad, metas académicas y estilo de aprendizaje."
  },
  {
    id: 3,
    title: "Aulas vivas + Clubs",
    detail: "Clases híbridas, clubs creativos y retos donde padres pueden unirse."
  },
  {
    id: 4,
    title: "Seguimiento visual",
    detail: "Reportes claros, badges y reuniones express con la familia."
  },
  {
    id: 5,
    title: "Certificación y experiencias",
    detail: "Simulacros reales, visitas culturales y acompañamiento en exámenes."
  }
];

const parentTips = [
  {
    title: "Checklist semanal",
    copy: "Recibe las tres micro-tareas recomendadas para practicar 10 minutos en casa."
  },
  {
    title: "Eventos family-friendly",
    copy: "Participa en book picnics, escape rooms en inglés y meetups culinarios."
  },
  {
    title: "Podcast para padres",
    copy: "Audios de 5 minutos con consejos para acompañar el aprendizaje sin estrés."
  }
];

const pageConfig = window.BEONE_PAGE_CONFIG || { page: "home" };
const currentPage = (pageConfig.page || "home").toLowerCase();

// ---------- Hooks + Shared Components ----------
const useAutoAdvance = (length, delay = 6000) => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % length);
    }, delay);
    return () => clearInterval(timer);
  }, [length, delay]);
  return [index, setIndex];
};

const TopBar = () => (
  <div className="top-bar">
    <div className="container top-bar-content">
      <ul className="contact-list">
        <li>
          <i className="fa-solid fa-map-pin" aria-hidden="true"></i>
          &nbsp;
          <a href="https://maps.app.goo.gl/u9SaZUoZXQ5nfoiaA" target="_blank" rel="noreferrer">
            Ctra. de Málaga, 44 · Granada
          </a>
        </li>
        <li>
          <i className="fa-regular fa-envelope" aria-hidden="true"></i>
          &nbsp;
          <a href="mailto:beoneenglish@gmail.com">beoneenglish@gmail.com</a>
        </li>
        <li>
          <i className="fa-solid fa-phone" aria-hidden="true"></i>
          &nbsp;
          <a href="tel:+34622854358">+34 622 854 358</a>
        </li>
      </ul>
      <ul className="social-links">
        {socialLinks.map(item => (
          <li key={item.href}>
            <a href={item.href} target="_blank" rel="noreferrer">
              <i className={item.icon} aria-hidden="true"></i>
            </a>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const NavDropdown = ({ label, dropdown = [], href }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    const handleEscape = event => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const toggleDropdown = (e) => {
    e.preventDefault();
    setOpen(prev => !prev);
  };

  return (
    <div
      className={`nav-dropdown ${open ? "open" : ""}`}
      ref={dropdownRef}
      onMouseEnter={() => setOpen(true)}
    >
      <a
        href={href}
        className="nav-dropdown__toggle"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={toggleDropdown}
        onKeyDown={event => {
          if (event.key === "Enter" || event.key === " " || event.key === "ArrowDown") {
            event.preventDefault();
            setOpen(true);
          }
        }}
        role="menuitem"
      >
        {label}
        <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
      </a>
      {open && (
        <div className="nav-dropdown__panel" role="menu">
          {dropdown.map(item => (
            <a key={item.href} href={item.href} role="menuitem">
              <span>{item.label}</span>
              {item.description && <small>{item.description}</small>}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

const Header = () => (
  <header className="site-header">
    <TopBar />
    <div className="header-inner">
      <a className="site-logo" href="index.html">
        <img src="assets/images/logo.png" alt="Be One English" loading="lazy" />
        <strong>Be One English</strong>
      </a>
      <nav className="main-nav" aria-label="Navegación principal">
        <ul className="nav-links">
          {navLinks.map((link, index) => {
            if (link.isCourseLink) {
              return (
                <li className="nav-dropdown" key={index}>
                  <button 
                    className="nav-dropdown-toggle"
                    aria-haspopup="true"
                    aria-expanded={false}
                  >
                    {link.label}
                    <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                  </button>
                  <div className="nav-dropdown-menu">
                    {courseList.map(course => (
                      <a 
                        key={course.id} 
                        href={course.link} 
                        className="dropdown-item"
                      >
                        <img 
                          src={course.image} 
                          alt={course.title} 
                        />
                        <div className="dropdown-item-info">
                          <h4>{course.title}</h4>
                          <p>{course.mode}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </li>
              );
            }
            if (link.dropdown) {
              return (
                <NavDropdown key={index} label={link.label} dropdown={link.dropdown} href={link.href} />
              );
            }
            return (
              <li key={link.href}>
                <a href={link.href} className="nav-link">
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>
        <a className="btn btn-primary" href="nivel.html">Prueba gratuita</a>
      </nav>
    </div>
  </header>
);

const HeroSlider = ({ items = slides }) => {
  const [index, setIndex] = useAutoAdvance(items.length, 7000);
  return (
    <section id="hero" className="hero" aria-label="Hero">
      <div className="hero-slider">
        {items.map((slide, slideIndex) => (
          <article
            key={slide.id}
            className={`hero-slide ${slideIndex === index ? 'active' : ''}`}
            style={{
              backgroundImage: `url('${slide.image}')`,
              opacity: slideIndex === index ? 1 : 0,
              transition: 'opacity 0.5s ease'
            }}
            aria-label={slide.title}
          >
            <div className="hero-content">
              <span className="hero-eyebrow">{slide.eyebrow}</span>
              <h1 className="hero-title">{slide.title}</h1>
              <p className="hero-description">{slide.description}</p>
              <div className="hero-actions">
                {slide.ctas.map(cta => (
                  <a
                    key={cta.label}
                    className={`btn ${cta.style === 'primary' ? 'btn-primary' : 'btn-secondary'}`}
                    href={cta.href}
                    target={cta.external ? "_blank" : "_self"}
                    rel={cta.external ? "noreferrer" : undefined}
                  >
                    {cta.label}
                  </a>
                ))}
              </div>
            </div>
          </article>
        ))}
        <div className="hero-nav">
          {items.map((slide, dotIndex) => (
            <button
              key={slide.id}
              className={`hero-dot ${dotIndex === index ? 'active' : ''}`}
              aria-label={`Ir a la diapositiva ${dotIndex + 1}`}
              aria-current={index === dotIndex}
              onClick={() => setIndex(dotIndex)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const PageHero = ({ eyebrow, title, description, image, ctas = [] }) => (
  <section id="hero" className="hero" aria-label={title}>
    <div className="hero-slider">
      <article
        className="hero-slide"
        style={{
          backgroundImage: `url('${image}')`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
        aria-label={title}
      >
        <div className="hero-content">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1>{title}</h1>
          <p>{description}</p>
          {ctas.length > 0 && (
            <div className="hero-actions">
              {ctas.map(cta => (
                <a
                  key={cta.label}
                  className={`btn ${cta.style}`}
                  href={cta.href}
                  target={cta.external ? "_blank" : "_self"}
                  rel={cta.external ? "noreferrer" : undefined}
                >
                  {cta.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </article>
    </div>
  </section>
);

const Pillars = () => (
  <section className="pillars-section" aria-label="Pilares de experiencia">
    <div className="container">
      <div className="section-header">
        <h2 className="section-title">Experiencia diseñada para teens, peques y padres</h2>
        <p className="section-subtitle">
          Diseñamos experiencias acogedoras, seguimiento real y actividades colaborativas que unen a toda la familia.
        </p>
      </div>
      <div className="pillars-grid">
        {pillars.map((pillar, index) => (
          <article className="pillar-card" key={pillar.title}>
            <div className="pillar-icon">
              <i className={pillar.icon} aria-hidden="true"></i>
            </div>
            <h3 className="pillar-title">{pillar.title}</h3>
            <p className="pillar-description">{pillar.copy}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const ProgramTabs = () => {
  const [active, setActive] = useState(audiencePrograms[0].id);
  const current = audiencePrograms.find(item => item.id === active);
  return (
    <section id="programas" className="pillars-section" aria-label="Programas por audiencia">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Programas sensibles para cada etapa</h2>
          <p className="section-subtitle">Selecciona el perfil para ver objetivos, dinámicas y cómo acompañamos.</p>
        </div>
        <div className="program-tabs card">
          <div className="tab-list flex gap-sm" role="tablist">
            {audiencePrograms.map(item => (
              <button
                key={item.id}
                className={`tab-button btn ${active === item.id ? 'btn-primary' : 'btn-secondary'}`}
                role="tab"
                aria-selected={active === item.id}
                onClick={() => setActive(item.id)}
              >
                {item.title}
              </button>
            ))}
          </div>
          <div role="tabpanel" className="mt-lg">
            <h3>{current.title}</h3>
            <ul>
              {current.goals.map(goal => (
                <li key={goal}>· {goal}</li>
              ))}
            </ul>
            <p className="text-muted mt-md">{current.support}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const JourneyTimeline = () => {
  const [activeStep, setActiveStep] = useState(journeySteps[0].id);
  const currentStep = journeySteps.find(step => step.id === activeStep);
  return (
    <section id="journey" className="pillars-section" aria-label="Recorrido familiar">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Así acompañamos a tu familia</h2>
          <p className="section-subtitle">Un itinerario claro para que niños y padres sepan cada paso.</p>
        </div>
        <div className="card p-lg">
          <div className="flex gap-md" style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
            {journeySteps.map(step => (
              <button
                key={step.id}
                className={`btn ${activeStep === step.id ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setActiveStep(step.id)}
              >
                <strong>Paso {step.id}</strong>: {step.title}
              </button>
            ))}
          </div>
          <p className="mt-lg text-center">{currentStep.detail}</p>
        </div>
      </div>
    </section>
  );
};

const CourseGrid = () => {
  return (
    <section className="courses-section" id="courses" aria-label="Cursos destacados">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Cursos claros para niños, teens y familias</h2>
          <p className="section-subtitle">Rutas con itinerarios flexibles, clubs creativos y certificaciones oficiales.</p>
        </div>
        <div className="courses-grid">
          {courseList.map(course => (
            <article className="course-card" key={course.id}>
              <div className="course-image">
                <img src={course.image} alt={course.title} />
                <span className="course-badge">{course.badge}</span>
              </div>
              <div className="course-content">
                <h3 className="course-title">{course.title}</h3>
                <p className="course-description">{course.description}</p>
                <div className="course-meta">
                  <i className="fa-solid fa-tag"></i>
                  <span>{course.mode}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

const CounterCard = ({ value, suffix, label }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasAnimated) {
            const duration = 1600;
            const start = performance.now();
            const animate = now => {
              const progress = Math.min((now - start) / duration, 1);
              setCount(Math.floor(progress * value));
              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                setHasAnimated(true);
              }
            };
            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <article className="card stat-card" ref={ref}>
      <h3>
        {count}
        {suffix}
      </h3>
      <p>{label}</p>
    </article>
  );
};

const ImpactSection = () => (
  <section className="stats-section" aria-label="Impacto medible">
    <div className="container">
      <div className="section-header">
        <h2 className="section-title">Datos claros para familias seguras</h2>
        <p className="section-subtitle">Medimos participación, confianza y certificaciones para que todo el mundo conocer el progreso.</p>
      </div>
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={stat.id} className="stat-card">
            <div className="stat-value">{stat.value}{stat.suffix}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const CTASection = () => (
  <section className="cta-section" aria-label="Llamada a la acción">
    <div className="container">
      <div className="cta-content">
        <h2 className="cta-title">Reserva tu sesión de descubrimiento en 15 minutos</h2>
        <p className="cta-description">
          Incluye prueba de nivel gratuita, recomendaciones prácticas para casa y acceso al calendario familiar.
        </p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="contact-us.html">
            Agendar llamada
          </a>
          <a
            className="btn btn-secondary"
            href="https://wa.me/34622854358?text=Quiero%20planificar%20ingl%C3%A9s%20con%20mi%20familia"
            target="_blank"
            rel="noreferrer"
          >
            Hablar por WhatsApp
          </a>
        </div>
      </div>
    </div>
  </section>
);

const Testimonials = () => {
  const [index, setIndex] = useAutoAdvance(testimonials.length, 9000);
  return (
    <section className="testimonials-section" aria-label="Testimonios">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Voces de familias y teens</h2>
          <p className="section-subtitle">Historias reales de quienes ya viven la experiencia Be One.</p>
        </div>
        <div className="testimonial-wrapper">
          {testimonials.map((item, itemIndex) => (
            <article 
              className="testimonial-slide" 
              key={item.id}
              style={{ display: itemIndex === index ? 'block' : 'none' }}
            >
              <blockquote className="testimonial-quote">{item.quote}</blockquote>
              <div className="testimonial-author">
                <img
                  src={item.image}
                  alt={`Testimonio de ${item.author}`}
                  loading="lazy"
                  className="testimonial-avatar"
                />
                <div className="testimonial-info">
                  <p className="testimonial-name">{item.author}</p>
                  <p className="testimonial-role">{item.role}</p>
                </div>
              </div>
            </article>
          ))}
          <div className="testimonial-nav">
            {testimonials.map((item, dotIndex) => (
              <button
                key={item.id}
                className={`hero-dot ${dotIndex === index ? 'active' : ''}`}
                aria-label={`Ir al testimonio ${dotIndex + 1}`}
                onClick={() => setIndex(dotIndex)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQSection = () => {
  const [active, setActive] = useState(faqs[0].id);
  return (
    <section className="pillars-section" aria-label="Preguntas frecuentes">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Preguntas frecuentes de padres y teens</h2>
          <p className="section-subtitle">Resolvemos tus dudas antes de comenzar.</p>
        </div>
        <div className="grid" style={{ maxWidth: '800px', margin: '0 auto' }}>
          {faqs.map(faq => (
            <article
              key={faq.id}
              className={`card ${active === faq.id ? 'active' : ''}`}
              style={{ cursor: 'pointer' }}
              tabIndex="0"
              onClick={() => setActive(faq.id)}
              onKeyDown={event => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setActive(faq.id);
                }
              }}
            >
              <h4>{faq.question}</h4>
              {active === faq.id && <p className="mt-sm">{faq.answer}</p>}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

const ParentsResources = () => (
  <section id="familias" className="pillars-section" aria-label="Recursos para familias">
    <div className="container">
      <div className="section-header">
        <h2 className="section-title">Recursos para casa</h2>
        <p className="section-subtitle">Ayudamos a padres y madres a acompañar el aprendizaje con ideas sencillas.</p>
      </div>
      <div className="grid grid-3">
        {parentTips.map(tip => (
          <article className="card" key={tip.title}>
            <h3>{tip.title}</h3>
            <p>{tip.copy}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const ContactSection = () => (
  <section id="contact" className="pillars-section" aria-label="Contacto">
    <div className="container">
      <div className="section-header">
        <h2 className="section-title">Contacta con Be One English</h2>
        <p className="section-subtitle">Responderemos en menos de 2 horas laborables.</p>
      </div>
      <div className="grid grid-3">
        {contactChannels.map(channel => (
          <article className="card text-center" key={channel.label}>
            <i className={channel.icon} style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: 'var(--space-md)' }}></i>
            <h3>{channel.label}</h3>
            <p>{channel.value}</p>
            <a
              className="btn btn-primary"
              href={channel.href}
              target={channel.external ? "_blank" : "_self"}
              rel={channel.external ? "noreferrer" : undefined}
            >
              Contactar
            </a>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="site-footer">
    <div className="container">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="footer-logo">
            <img src="assets/images/logo.png" alt="Be One English" />
            <strong>Be One English</strong>
          </div>
          <p className="footer-description">
            Centro con itinerarios para niños, adolescentes, familias y empresas en Granada.
          </p>
          <div className="footer-social">
            {socialLinks.map(link => (
              <a key={link.href} href={link.href} className="social-link" target="_blank" rel="noreferrer">
                <i className={link.icon} aria-hidden="true"></i>
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="footer-title">Accesos rápidos</h4>
          <ul className="footer-links">
            <li><a href="about-us.html">Sobre nosotros</a></li>
            <li><a href="nivel.html">Prueba de nivel</a></li>
            <li><a href="blog.html">Calendario familiar</a></li>
            <li><a href="contact-us.html">Soporte</a></li>
          </ul>
        </div>
        <div>
          <h4 className="footer-title">Horarios</h4>
          <p className="footer-description">
            Lunes a Viernes<br />
            10:00 - 13:00 · 16:00 - 21:00<br />
            Sábados · Clubs y eventos bilingües
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Be One English. Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>
);

const WhatsAppButton = () => (
  <a
    className="floating-whatsapp"
    href="https://wa.me/34622854358?text=Hola%2C%20Busco%20ingl%C3%A9s%20para%20mi%20familia"
    target="_blank"
    rel="noreferrer"
  >
    <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>
    WhatsApp 24/7
  </a>
);

// ---------- Page Layouts ----------
const HomeLayout = () => (
  <>
    <HeroSlider />
    <Pillars />
    <ProgramTabs />
    <JourneyTimeline />
    <CourseGrid />
    <ImpactSection />
    <CTASection />
    <Testimonials />
    <ParentsResources />
    <FAQSection />
    <ContactSection />
  </>
);

const AboutLayout = () => (
  <>
    <PageHero
      eyebrow="Quiénes somos"
      title="Mentores apasionados, metodología propia"
      description="Somos un equipo de profesores nativos y certificados que combinan pedagogía sensible, clubs familiares y tecnología para que cada alumno avance con ilusión."
      image="assets/images/slide2.jpg"
      ctas={[
        { label: "Conoce los cursos", href: "course-kids.html", style: "primary" },
        { label: "Visitar blog familiar", href: "blog.html", style: "secondary" }
      ]}
    />
    <Pillars />
    <JourneyTimeline />
    <ImpactSection />
    <Testimonials />
    <CTASection />
  </>
);

const CourseDetailLayout = ({ courseId }) => {
  const course = courseList.find(c => c.id === courseId) || courseList[0];
  return (
    <>
      <PageHero
        eyebrow="Programa destacado"
        title={course.title}
        description={course.description}
        image={course.image}
        ctas={[
          { label: "Hablar con un asesor", href: "contact-us.html", style: "primary" },
          { label: "Ver intensivos", href: "intensivos.html", style: "secondary" }
        ]}
      />
      <section aria-label="Detalle de curso">
        <div className="course-grid">
          <article className="card course-card highlight">
            <img src={course.image} alt={course.title} loading="lazy" />
            <span className="badge">
              <i className="fa-solid fa-location-dot" aria-hidden="true"></i>
              {course.mode}
            </span>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <p style={{ color: "var(--muted)" }}>
              <strong>Nivel:</strong> {course.badge}
            </p>
            <div className="hero-actions">
              <a className="btn primary" href="contact-us.html">
                Solicitar información
              </a>
              <a className="btn secondary" href="nivel.html">
                Hacer prueba gratuita
              </a>
            </div>
          </article>
        </div>
      </section>
      <ImpactSection />
      <CTASection />
      <Testimonials />
      <ContactSection />
    </>
  );
};

const BlogLayout = () => (
  <>
    <PageHero
      eyebrow="Calendario familiar"
      title="Actividades bilingües y clubs creativos"
      description="Book picnics, escape rooms, meetups culinarios y retos para practicar inglés en familia toda la semana."
      image="assets/images/slide3.png"
      ctas={[
        { label: "Unirme al próximo evento", href: "contact-us.html", style: "primary" },
        { label: "Recibir newsletter", href: "mailto:beoneenglish@gmail.com", style: "secondary" }
      ]}
    />
    <ParentsResources />
    <CTASection />
    <Testimonials />
    <ContactSection />
  </>
);

const ContactLayout = () => (
  <>
    <PageHero
      eyebrow="Estamos cerca"
      title="Contacta con el equipo Be One English"
      description="Respuesta media en menos de 2 horas. Podemos hablar por email, teléfono o WhatsApp."
      image="assets/images/slide1.jpg"
      ctas={[
        { label: "Enviar email", href: "mailto:beoneenglish@gmail.com", style: "primary" },
        { label: "WhatsApp directo", href: "https://wa.me/34622854358", style: "secondary", external: true }
      ]}
    />
    <ContactSection />
    <CTASection />
  </>
);

const LevelLayout = () => (
  <>
    <PageHero
      eyebrow="Prueba gratuita"
      title="Descubre tu nivel y plan personalizado"
      description="En una sesión de 15 minutos definimos tus objetivos y recibes un roadmap adaptado a tu ritmo."
      image="assets/images/slide2.jpg"
      ctas={[
        { label: "Agendar llamada", href: "contact-us.html", style: "primary" },
        { label: "Cursos disponibles", href: "course-kids.html", style: "secondary" }
      ]}
    />
    <JourneyTimeline />
    <CTASection />
    <Testimonials />
  </>
);

const ExamsLayout = () => (
  <>
    <PageHero
      eyebrow="Certificaciones"
      title="Cambridge, Trinity, IELTS y TOEFL con acompañamiento experto"
      description="Simulacros reales, feedback semanal y tutores especializados para asegurar tu certificación."
      image="assets/images/slide2.jpg"
      ctas={[
        { label: "Ver Teen Pro", href: "course-ten.html", style: "primary" },
        { label: "Preparar Adult Boost", href: "course-adult.html", style: "secondary" }
      ]}
    />
    <CourseGrid />
    <ImpactSection />
    <CTASection />
  </>
);

const IntensiveLayout = () => (
  <>
    <PageHero
      eyebrow="Cursos intensivos 2025"
      title="Rutas de 4 a 8 semanas hacia tu certificación"
      description="Domina el inglés con simulacros diarios, tutores nativos y seguimiento personalizado. De B1 a C2."
      image="assets/images/Intensivos2025.jpg"
      ctas={[
        { label: "Reservar plaza", href: "nivel.html", style: "primary" },
        { label: "Hablar con asesor", href: "contact-us.html", style: "secondary" }
      ]}
    />
    <section className="courses-section" aria-label="Cursos intensivos">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Elige tu nivel intensivo</h2>
          <p className="section-subtitle">Programa de inmersión total con simulacros diarios y soporte continuo.</p>
        </div>
        <div className="courses-grid">
          {intensivoCourses.map(course => (
            <article className="course-card" key={course.id} style={{ borderTop: `4px solid ${course.color}` }}>
              <div className="course-image">
                <img src="assets/images/Intensivos2025.jpg" alt={course.title} />
                <span className="course-badge" style={{ backgroundColor: course.color }}>{course.level}</span>
              </div>
              <div className="course-content">
                <h3 className="course-title">{course.title}</h3>
                <p className="course-description">{course.description}</p>
                <div className="course-meta">
                  <i className="fa-solid fa-clock"></i>
                  <span>{course.duration}</span>
                </div>
                <div className="course-meta">
                  <i className="fa-solid fa-calendar"></i>
                  <span>{course.schedule}</span>
                </div>
                <ul className="intensive-features">
                  {course.features.map((feature, idx) => (
                    <li key={idx}><i className="fa-solid fa-check" style={{ color: course.color }}></i> {feature}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
    <CTASection />
    <Testimonials />
    <ContactSection />
  </>
);

const pageLayouts = {
  home: <HomeLayout />,
  about: <AboutLayout />,
  course: <CourseDetailLayout courseId={pageConfig.courseId || "kids"} />,
  blog: <BlogLayout />,
  contact: <ContactLayout />,
  level: <LevelLayout />,
  exams: <ExamsLayout />,
  intensivo: <IntensiveLayout />
};

const App = () => (
  <div className="app-wrapper">
    <Header />
    <main className="page-content animate-fade-in">
      {pageLayouts[currentPage] || <HomeLayout />}
    </main>
    <Footer />
    <WhatsAppButton />
  </div>
);

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
