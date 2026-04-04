const { useState, useEffect, useRef } = React;

// ---------- Data ----------
const slides = [
  {
    id: 1,
    eyebrow: "Academia de inglés en Granada",
    title: "Aprende inglés de verdad, en un entorno que inspira",
    description:
      "Clases dinámicas con mentores nativos, seguimiento personalizado y un panel exclusivo para que las familias vean cada avance.",
    image: "assets/images/slide1.jpg",
    ctas: [
      { label: "Descubre nuestros cursos", href: "course-kids.html", style: "primary" },
      { label: "Reserva tu clase gratis", href: "nivel.html", style: "secondary" }
    ]
  },
  {
    id: 2,
    eyebrow: "Adolescentes que hablan con confianza",
    title: "Proyectos creativos, debates reales y preparación Cambridge",
    description:
      "Mentores nativos, workshops STEAM y simulacros de examen para que los teens lleguen preparados y seguros a sus metas.",
    image: "assets/images/slide2.jpg",
    ctas: [
      { label: "Programa Teens Pro 12+", href: "course-ten.html", style: "primary" },
      {
        label: "Escríbenos por WhatsApp",
        href: "https://wa.me/34622854358?text=Quiero%20info%20para%20mi%20family%20en%20Be%20One",
        style: "secondary",
        external: true
      }
    ]
  },
  {
    id: 3,
    eyebrow: "Familias que aprenden juntas",
    title: "Panel privado, actividades en casa y eventos bilingües para todos",
    description:
      "Recibe recursos semanales, accede al calendario familiar y participa en charlas sobre cómo acompañar el aprendizaje sin estrés.",
    image: "assets/images/slide3.png",
    ctas: [
      { label: "Ver calendario familiar", href: "blog.html", style: "secondary" },
      {
        label: "Habla con nuestro equipo",
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
    title: "Espacios que inspiran",
    copy: "Aulas luminosas, materiales visuales y dashboards claros que motivan a toda la familia."
  },
  {
    icon: "fa-solid fa-headset",
    title: "Mentor personal",
    copy: "Un tutor asignado que conoce a tu familia, resuelve dudas y ajusta el plan cada semana."
  },
  {
    icon: "fa-solid fa-heart",
    title: "Bienestar primero",
    copy: "Dinámicas socioemocionales que mantienen la motivación y la confianza en cada sesión."
  },
  {
    icon: "fa-solid fa-star",
    title: "Resultados que se ven",
    copy: "Reportes visuales y certificaciones Cambridge, Trinity, IELTS y TOEFL con tasas de éxito del 98%."
  }
];

const courseList = [
  {
    id: "kids",
    title: "Kids Club 4-12",
    description:
      "Historias interactivas, proyectos creativos y micro-retos que consolidan vocabulario y speaking de forma natural.",
    mode: "Presencial",
    link: "course-kids.html",
    badge: "A1 - B1",
    image: "assets/images/kids.jpg",
    icon: "fa-solid fa-children",
    color: "#4CAF50",
    features: ["Historias interactivas", "Proyectos creativos", "Micro-retos de vocabulario", "Mentores nativos"],
    duration: "Curso escolar",
    schedule: "Lunes a viernes · 16:00-20:00"
  },
  {
    id: "teens",
    title: "Teens Pro 12+",
    description:
      "Workshops STEAM, debates y feedback individual para preparar exámenes oficiales y ganar confianza al hablar.",
    mode: "Híbrido",
    link: "course-ten.html",
    badge: "A2 - C1",
    image: "assets/images/teenagers.jpg",
    icon: "fa-solid fa-school",
    color: "#2196F3",
    features: ["Workshops STEAM", "Debates y pitch nights", "Simulacros Cambridge", "Feedback individual"],
    duration: "Curso escolar",
    schedule: "Lunes a viernes · 16:30-20:30"
  },
  {
    id: "adults",
    title: "Adult Boost A1-C2",
    description:
      "Clases flexibles, podcast guiados y sesiones express diseñadas para padres que quieren avanzar a su ritmo.",
    mode: "Online + Presencial",
    link: "course-adult.html",
    badge: "A1 - C2",
    image: "assets/images/adult.jpg",
    icon: "fa-solid fa-user-graduate",
    color: "#9C27B0",
    features: ["Clases flexibles", "Podcast guiados", "Sesiones express", "Seguimiento personalizado"],
    duration: "Flexible",
    schedule: "Mañana y tarde · disponibilidad"
  },
  {
    id: "business",
    title: "Inglés Corporativo",
    description:
      "Programas a medida para equipos que necesitan comunicarse con confianza en entornos internacionales.",
    mode: "In-Company",
    link: "course-busi.html",
    badge: "Equipos",
    image: "assets/images/bussiness.png",
    icon: "fa-solid fa-briefcase",
    color: "#FF9800",
    features: ["Programas a medida", "Vocabulary profesional", "Presentaciones", "Reuniones en inglés"],
    duration: "A convenir",
    schedule: "Horario flexible"
  },
  {
    id: "private",
    title: "Mentoring 1:1",
    description:
      "Clases particulares para objetivos concretos: viajes, oposiciones, entrevistas o coaching de speaking.",
    mode: "Personalizadas",
    link: "course-particulares.html",
    badge: "Agenda flexible",
    image: "assets/images/particular.jpg",
    icon: "fa-solid fa-person-chalkboard",
    color: "#E91E63",
    focus: ["Viajes", "Oposiciones", "Entrevistas", "Speaking coach"],
    duration: "A tu ritmo",
    schedule: "Agenda flexible"
  },
  {
    id: "intensive",
    title: "Intensivos 2026",
    description:
      "Rutas de 4 a 8 semanas con simulacros diarios, material oficial y seguimiento por WhatsApp para toda la familia.",
    mode: "Híbrido",
    link: "intensivos.html",
    badge: "Cupos limitados",
    image: "assets/images/Intensivos2025.jpg",
    icon: "fa-solid fa-rocket",
    color: "#FF5722",
    features: ["4-8 semanas", "Simulacros diarios", "Seguimiento WhatsApp", "Certificación final"],
    duration: "4-8 semanas",
    schedule: "Lunes a viernes · 9:00-13:00"
  }
];

const intensivoCourses = [
  {
    id: "intensivo-b1",
    title: "Intensivo B1 - Intermediate",
    description: "4 semanas intensivas para consolidar B1. Simulaciones diarias de Speaking y Writing con feedback personalizado.",
    duration: "4 semanas",
    schedule: "Lunes a viernes · 9:00-13:00",
    features: ["Simulacros de examen", "Materiales oficiales Cambridge", "Seguimiento por WhatsApp", "Certificación final"],
    level: "B1",
    color: "#4CAF50",
    icon: "fa-solid fa-book-open",
    link: "intensivos.html"
  },
  {
    id: "intensivo-b2",
    title: "Intensivo B2 - Upper Intermediate",
    description: "6 semanas intensivas para alcanzar B2. Preparación completa para First Certificate con prácticas reales.",
    duration: "6 semanas",
    schedule: "Lunes a viernes · 9:00-13:00",
    features: ["Simulacros oficiales", "Writing corrections", "Speaking con nativos", "Examen simulacro incluido"],
    level: "B2",
    color: "#2196F3",
    icon: "fa-solid fa-laptop-file",
    link: "intensivo-b2.html"
  },
  {
    id: "intensivo-c1",
    title: "Intensivo C1 - Advanced",
    description: "8 semanas para dominar el C1. Grammar avanzada, vocabulario académico y preparación para Proficiency.",
    duration: "8 semanas",
    schedule: "Lunes a viernes · 9:00-13:00",
    features: ["Grammar avanzada", "Vocabulario académico", "Speaking de nivel C1", "Materiales Cambridge originales"],
    level: "C1",
    color: "#9C27B0",
    icon: "fa-solid fa-graduation-cap",
    link: "intensivo-c1.html"
  },
  {
    id: "intensivo-c2",
    title: "Intensivo C2 - Proficiency",
    description: "Programa elite para obtener C2. Preparación intensiva para el examen más avanzado de Cambridge.",
    duration: "8 semanas",
    schedule: "Lunes a viernes · 9:00-13:00",
    features: ["Preparación CPE", "Simulacros oficiales", "Feedback experto", "Garantía de resultado"],
    level: "C2",
    color: "#FF5722",
    icon: "fa-solid fa-crown",
    link: "intensivo-c2.html"
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
      "El panel para padres es increíblemente claro. Mi hija comparte sus logros en casa y vemos exactamente cómo avanza semana a semana.",
    author: "Ana Belén",
    role: "Mamá de Sofía · Kids Club",
    image: "assets/images/review3.jpg"
  },
  {
    id: 2,
    quote:
      "El programa Teens Pro me ayudó a ganar fluidez y confianza antes del B2. Los pitch nights son geniales y aprendes un montón.",
    author: "Jorge Martínez",
    role: "B2 First · 17 años",
    image: "assets/images/review4.jpg"
  },
  {
    id: 3,
    quote:
      "Necesitábamos reporting en inglés para el equipo. Be One diseñó sesiones a medida que dinamizaron a todo el departamento.",
    author: "Lucía Ramos",
    role: "People Lead · Sector Tech",
    image: "assets/images/review5.jpg"
  }
];

const faqs = [
  {
    id: "niveles",
    question: "¿Qué niveles cubrís?",
    answer: "Desde A1 hasta C2 con itinerarios personalizados para niños, adolescentes, adultos y empresas."
  },
  {
    id: "familias",
    question: "¿Cómo implicáis a las familias?",
    answer:
      "Panel privado con seguimiento en tiempo real, eventos bilingües mensuales y mini-retos para practicar en casa juntos."
  },
  {
    id: "online",
    question: "¿Ofrecéis clases online?",
    answer: "Sí, formato online en directo, híbrido y vídeos de refuerzo para repasar cuando quieras, donde estés."
  },
  {
    id: "certificaciones",
    question: "¿Preparáis exámenes oficiales?",
    answer:
      "Somos especialistas en Cambridge, Trinity, IELTS y TOEFL con simulacros reales y feedback puntual de mentores nativos."
  },
  {
    id: "horarios",
    question: "¿Qué horarios tenéis?",
    answer: "Turnos de mañana, tarde y noche, además de clubs los sábados y campus intensivos en verano."
  },
  {
    id: "pagos",
    question: "¿Hay facilidades de pago?",
    answer: "Sí, cuotas mensuales sin intereses y descuentos especiales para hermanos y empresas colaboradoras."
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
    isIntensivos: true
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

const eventPhotos = [
  {
    id: "halloween",
    title: "Halloween 2024",
    description: "Fiesta de Halloween con disfraces, juegos y actividades terroríficas en inglés",
    icon: "fa-solid fa-moon",
    color: "#FF6B35",
    photos: [
      "./party_halloween.jpg",
      "./party_halloween2.jpg",
      "./party_halloween3.jpg",
      "./party_halloween4.jpg",
      "./party_halloween5.jpg",
      "./party_halloween6.jpg",
      "./party_halloween7.jpg"
    ]
  },
  {
    id: "sanvalentin",
    title: "San Valentín 2025",
    description: "Celebración del amor con actividades bilingües y manuellejes",
    icon: "fa-solid fa-heart",
    color: "#E91E63",
    photos: [
      "./party_valentin.jpg",
      "./party_valentin2.jpg",
      "./party_valentin3.jpg"
    ]
  },
  {
    id: "pancakes",
    title: "Pancake Day",
    description: "Día de los pancakes con receta en inglés y concurso de habilidades",
    icon: "fa-solid fa-bread-slice",
    color: "#FFC107",
    photos: [
      "./party_pancake.jpg",
      "./party_pancake2.jpg",
      "./party_pancake3.jpg",
      "./party_pancake4.jpg",
      "./party_pancake5.jpg"
    ]
  },
  {
    id: "navidad",
    title: "Navidad 2024",
    description: "Festas navideñas con villancicos, Papa Noel y regalos",
    icon: "fa-solid fa-tree",
    color: "#4CAF50",
    photos: [
      "./party_cris.jpg"
    ]
  },
  {
    id: "carnaval",
    title: "Carnaval",
    description: "Desfile de disfraces y fiesta de Carnaval",
    icon: "fa-solid fa-mask",
    color: "#9C27B0",
    photos: [
      "./face1.JPG",
      "./face2.JPG",
      "./face3.JPG"
    ]
  }
];

const pageConfig = window.BEONE_PAGE_CONFIG || { page: "home" };
const currentPage = (pageConfig.page || "home").toLowerCase();

// ---------- Hooks + Shared Components ----------
const useAutoAdvance = (length, delay = 6000) => {
  const [index, setIndex] = useState(0);
  const [isUserPaused, setIsUserPaused] = useState(false);
  const [isInteractionPaused, setIsInteractionPaused] = useState(false);
  const isPaused = isUserPaused || isInteractionPaused;

  useEffect(() => {
    if (isPaused || length <= 1) {
      return undefined;
    }

    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % length);
    }, delay);
    return () => clearInterval(timer);
  }, [length, delay, isPaused]);

  return {
    index,
    setIndex,
    isPaused,
    isUserPaused,
    setIsUserPaused,
    setIsInteractionPaused
  };
};

const useSiteAnimations = scopeRef => {
  useEffect(() => {
    const root = scopeRef.current;
    const gsap = window.gsap;
    const interactionCleanups = [];
    const mediaMatcher = gsap ? gsap.matchMedia() : null;

    if (!root || !gsap) {
      return undefined;
    }

    const prefersReducedMotion =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isCompactViewport =
      window.matchMedia && window.matchMedia("(max-width: 768px)").matches;

    if (prefersReducedMotion) {
      return undefined;
    }

    const scrollPlugin = window.ScrollTrigger;
    if (scrollPlugin) {
      gsap.registerPlugin(scrollPlugin);
    }

    const ctx = gsap.context(() => {
      const reveal = (selector, config = {}) => {
        const targets = gsap.utils.toArray(selector);
        if (!targets.length) {
          return;
        }

        const animationOptions = {
          y: config.y || 40,
          opacity: 0,
          duration: config.duration || 0.85,
          ease: "power3.out",
          stagger: config.stagger == null ? 0.1 : config.stagger,
          clearProps: "transform,opacity"
        };

        if (scrollPlugin) {
          animationOptions.scrollTrigger = {
            trigger: config.trigger || targets[0],
            start: config.start || "top 84%",
            once: true
          };
        }

        gsap.from(targets, animationOptions);
      };

      const introTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });

      introTimeline
        .from(".site-header", { y: -26, opacity: 0, duration: 0.7 })
        .from(".site-logo", { x: -18, opacity: 0, duration: 0.45 }, "-=0.45")
        .from(".main-nav .nav-link, .main-nav .btn", { y: -14, opacity: 0, duration: 0.42, stagger: 0.05 }, "-=0.35")
        .from(".hero .hero-content", { y: 34, opacity: 0, duration: 0.72 }, "-=0.22")
        .from(".hero .hero-eyebrow, .hero .eyebrow", { y: 16, opacity: 0, duration: 0.45 }, "-=0.48")
        .from(".hero .hero-title, .hero h1", { y: 26, opacity: 0, duration: 0.7 }, "-=0.2")
        .from(".hero .hero-description, .hero p", { y: 22, opacity: 0, duration: 0.6 }, "-=0.45")
        .from(".hero .hero-actions .btn", { y: 18, opacity: 0, duration: 0.45, stagger: 0.1 }, "-=0.4")
        .from(".hero-nav .hero-dot", { scale: 0.65, opacity: 0, stagger: 0.06, duration: 0.35 }, "-=0.3");

      reveal(".section-header", { y: 28, stagger: 0.08 });
      reveal(".pillars-grid .pillar-card");
      reveal(".stats-grid .stat-card", { y: 30, stagger: 0.08 });
      reveal(".grid .card", { y: 30, stagger: 0.08 });
      reveal(".program-tabs, #journey .card", { y: 30, stagger: 0.08 });
      reveal(".cta-content", { y: 24, stagger: 0 });
      reveal(".footer-grid > div", { y: 24, stagger: 0.08, start: "top 92%" });
      reveal(".testimonial-wrapper", { y: 24, stagger: 0 });

      const courseCards = gsap.utils.toArray(".courses-grid .course-card");
      courseCards.forEach((card, cardIndex) => {
        const image = card.querySelector(".course-image img");
        const badge = card.querySelector(".course-badge");
        const title = card.querySelector(".course-title");
        const description = card.querySelector(".course-description");
        const metaItems = card.querySelectorAll(".course-meta, .intensive-features li, .hero-actions .btn");

        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: scrollPlugin
            ? {
                trigger: card,
                start: "top 88%",
                once: true
              }
            : undefined
        });

        tl.from(card, {
          autoAlpha: 0,
          y: isCompactViewport ? 32 : 54,
          rotateX: isCompactViewport ? 0 : 8,
          duration: isCompactViewport ? 0.62 : 0.75
        });

        if (image) {
          tl.from(image, { scale: isCompactViewport ? 1.1 : 1.18, duration: 0.85 }, "<");
        }

        if (title) {
          tl.from(title, { y: 16, autoAlpha: 0, duration: 0.35 }, "-=0.48");
        }

        if (description) {
          tl.from(description, { y: 14, autoAlpha: 0, duration: 0.3 }, "-=0.24");
        }

        if (metaItems.length) {
          tl.from(metaItems, { y: 12, autoAlpha: 0, duration: 0.25, stagger: 0.06 }, "-=0.16");
        }

        if (badge) {
          tl.from(
            badge,
            {
              scale: 0.68,
              autoAlpha: 0,
              transformOrigin: "center",
              duration: 0.4,
              ease: "back.out(1.8)"
            },
            "-=0.92"
          );
        }

        if (image && !isCompactViewport && cardIndex % 2 === 0 && scrollPlugin) {
          gsap.to(image, {
            yPercent: -8,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          });
        }
      });

      const intensiveLists = gsap.utils.toArray(".intensive-features");
      intensiveLists.forEach(list => {
        const items = list.querySelectorAll("li");
        if (!items.length) {
          return;
        }

        gsap.from(items, {
          x: -16,
          autoAlpha: 0,
          duration: 0.35,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: scrollPlugin
            ? {
                trigger: list,
                start: "top 88%",
                once: true
              }
            : undefined
        });
      });

      const intensiveDetailCards = gsap.utils.toArray(".course-grid .course-card");
      intensiveDetailCards.forEach(card => {
        const badge = card.querySelector(".badge, .course-badge");
        const meta = card.querySelectorAll(".course-meta");
        const actionButtons = card.querySelectorAll(".hero-actions .btn");

        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: scrollPlugin
            ? {
                trigger: card,
                start: "top 86%",
                once: true
              }
            : undefined
        });

        tl.from(card, { autoAlpha: 0, y: 48, duration: 0.72 });

        if (badge) {
          tl.from(
            badge,
            { autoAlpha: 0, scale: 0.72, duration: 0.38, ease: "back.out(1.7)" },
            "-=0.46"
          );
        }

        if (meta.length) {
          tl.from(meta, { y: 12, autoAlpha: 0, duration: 0.26, stagger: 0.07 }, "-=0.34");
        }

        if (actionButtons.length) {
          tl.from(actionButtons, { y: 14, autoAlpha: 0, duration: 0.28, stagger: 0.08 }, "-=0.26");
        }
      });

      const activityCards = gsap.utils.toArray(".photo-carousel-card");
      activityCards.forEach(card => {
        const image = card.querySelector(".photo-carousel-image");
        const info = card.querySelectorAll(".photo-carousel-info > *");

        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: scrollPlugin
            ? {
                trigger: card,
                start: "top 88%",
                once: true
              }
            : undefined
        });

        tl.from(card, { autoAlpha: 0, y: 34, duration: 0.65 });

        if (image) {
          tl.from(image, { autoAlpha: 0, scale: 1.12, duration: 0.7 }, "<0.06");
        }

        if (info.length) {
          tl.from(info, { y: 10, autoAlpha: 0, duration: 0.3, stagger: 0.05 }, "-=0.3");
        }
      });

      gsap.to(".floating-whatsapp", {
        y: -9,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      if (mediaMatcher) {
        mediaMatcher.add("(min-width: 769px)", () => {
          if (scrollPlugin) {
            gsap.utils.toArray(".hero").forEach(hero => {
              const heroContent = hero.querySelector(".hero-content");
              if (!heroContent) {
                return;
              }

              gsap.to(heroContent, {
                yPercent: -8,
                ease: "none",
                scrollTrigger: {
                  trigger: hero,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true
                }
              });
            });

            gsap.utils.toArray(".hero-slide").forEach(slide => {
              gsap.to(slide, {
                scale: 1.05,
                ease: "none",
                scrollTrigger: {
                  trigger: slide,
                  start: "top top",
                  end: "bottom top",
                  scrub: true
                }
              });
            });
          }

          const interactiveCards = gsap.utils.toArray(".pillar-card, .course-card, .stat-card, .testimonial-wrapper, .card");
          interactiveCards.forEach(card => {
            const onEnter = () => {
              gsap.to(card, {
                y: -8,
                scale: 1.01,
                duration: 0.28,
                ease: "power2.out",
                overwrite: "auto"
              });
            };
            const onLeave = () => {
              gsap.to(card, {
                y: 0,
                scale: 1,
                duration: 0.35,
                ease: "power2.out",
                overwrite: "auto"
              });
            };

            card.addEventListener("mouseenter", onEnter);
            card.addEventListener("mouseleave", onLeave);
            card.addEventListener("focusin", onEnter);
            card.addEventListener("focusout", onLeave);

            interactionCleanups.push(() => {
              card.removeEventListener("mouseenter", onEnter);
              card.removeEventListener("mouseleave", onLeave);
              card.removeEventListener("focusin", onEnter);
              card.removeEventListener("focusout", onLeave);
            });
          });

          const interactiveButtons = gsap.utils.toArray(".btn, .hero-dot");
          interactiveButtons.forEach(button => {
            const touchOptions = { passive: true };
            const onPressIn = () => {
              gsap.to(button, { scale: 0.96, duration: 0.12, ease: "power2.out", overwrite: "auto" });
            };
            const onPressOut = () => {
              gsap.to(button, { scale: 1, duration: 0.2, ease: "power2.out", overwrite: "auto" });
            };

            button.addEventListener("mousedown", onPressIn);
            button.addEventListener("mouseup", onPressOut);
            button.addEventListener("mouseleave", onPressOut);
            button.addEventListener("touchstart", onPressIn, touchOptions);
            button.addEventListener("touchend", onPressOut);
            button.addEventListener("focus", onPressOut);

            interactionCleanups.push(() => {
              button.removeEventListener("mousedown", onPressIn);
              button.removeEventListener("mouseup", onPressOut);
              button.removeEventListener("mouseleave", onPressOut);
              button.removeEventListener("touchstart", onPressIn, touchOptions);
              button.removeEventListener("touchend", onPressOut);
              button.removeEventListener("focus", onPressOut);
            });
          });
        });

        mediaMatcher.add("(max-width: 768px)", () => {
          if (scrollPlugin) {
            gsap.utils.toArray(".hero").forEach(hero => {
              const heroContent = hero.querySelector(".hero-content");
              if (!heroContent) {
                return;
              }

              gsap.to(heroContent, {
                yPercent: -4,
                ease: "none",
                scrollTrigger: {
                  trigger: hero,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true
                }
              });
            });
          }
        });
      }
    }, root);

    return () => {
      if (mediaMatcher) {
        mediaMatcher.revert();
      }
      interactionCleanups.forEach(fn => fn());
      ctx.revert();
    };
  }, [scopeRef]);
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
        <div className="nav-dropdown-menu" role="menu">
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

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev);
  const closeMobileMenu = () => setMobileMenuOpen(false);
  
  return (
    <header className="site-header">
      <TopBar />
      <div className="header-inner">
        <a className="site-logo" href="index.html">
          <img src="assets/images/logo.png" alt="Be One English" loading="lazy" />
          <strong className="hidden-mobile">Be One English</strong>
        </a>
        
        <button 
          className="mobile-menu-toggle" 
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={mobileMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        <nav className={`main-nav ${mobileMenuOpen ? 'open' : ''}`} aria-label="Navegación principal">
          <ul className="nav-links">
            {navLinks.map((link, index) => {
              if (link.isCourseLink) {
                return (
                  <li className="nav-dropdown" key={index}>
                    <button 
                      className="nav-dropdown-toggle"
                      aria-haspopup="true"
                      aria-expanded={false}
                      onClick={() => closeMobileMenu()}
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
                          onClick={closeMobileMenu}
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
              if (link.isIntensivos) {
                return (
                  <li className="nav-dropdown" key={index}>
                    <a 
                      href={link.href}
                      className="nav-dropdown-toggle"
                      onClick={closeMobileMenu}
                    >
                      {link.label}
                      <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                    </a>
                    <div className="nav-dropdown-menu">
                      {intensivoCourses.map(item => (
                        <a 
                          key={item.id} 
                          href={item.link} 
                          className="dropdown-item"
                          onClick={closeMobileMenu}
                        >
                          <div style={{ 
                            width: '40px', 
                            height: '40px', 
                            borderRadius: '50%', 
                            background: `${item.color}20`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: `2px solid ${item.color}`
                          }}>
                            <i className={item.icon} style={{ color: item.color, fontSize: '16px' }}></i>
                          </div>
                          <div className="dropdown-item-info">
                            <h4>Intensivo {item.level}</h4>
                            <p>{item.duration}</p>
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
                  <a href={link.href} className="nav-link" onClick={closeMobileMenu}>
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
          <a className="btn btn-primary" href="nivel.html" onClick={closeMobileMenu}>Prueba gratuita</a>
        </nav>
      </div>
    </header>
  );
};

const HeroSlider = ({ items = slides }) => {
  const {
    index,
    setIndex,
    isPaused,
    isUserPaused,
    setIsUserPaused,
    setIsInteractionPaused
  } = useAutoAdvance(items.length, 7000);
  const sliderRef = useRef(null);
  const pauseOnInteraction = () => setIsInteractionPaused(true);
  const resumeOnPointerLeave = () => setIsInteractionPaused(false);
  const resumeOnBlur = event => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsInteractionPaused(false);
    }
  };

  useEffect(() => {
    const gsap = window.gsap;
    if (!gsap || !sliderRef.current) {
      return undefined;
    }

    const prefersReducedMotion =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      const activeSlide = gsap.utils.toArray(".hero-slide.active")[0];
      if (!activeSlide) {
        return;
      }

      const activeContent = activeSlide.querySelectorAll(
        ".hero-eyebrow, .hero-title, .hero-description, .hero-actions .btn"
      );
      const activeDot = gsap.utils.toArray(".hero-dot")[index];

      gsap.fromTo(
        activeContent,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.08,
          ease: "power3.out"
        }
      );

      if (activeDot) {
        gsap.fromTo(
          activeDot,
          { scale: 0.7, opacity: 0.5 },
          { scale: 1.2, opacity: 1, duration: 0.35, ease: "back.out(2)" }
        );
      }
    }, sliderRef);

    return () => {
      ctx.revert();
    };
  }, [index]);

  return (
    <section
      id="hero"
      className="hero"
      aria-label="Hero"
      ref={sliderRef}
      onMouseEnter={pauseOnInteraction}
      onMouseLeave={resumeOnPointerLeave}
      onFocusCapture={pauseOnInteraction}
      onBlurCapture={resumeOnBlur}
    >
      <div className="hero-slider">
        {items.map((slide, slideIndex) => (
          <article
            key={slide.id}
            className={`hero-slide ${slideIndex === index ? 'active' : ''}`}
            style={{
              backgroundImage: `url('${slide.image}')`,
              opacity: slideIndex === index ? 1 : 0,
              visibility: slideIndex === index ? "visible" : "hidden",
              pointerEvents: slideIndex === index ? "auto" : "none",
              zIndex: slideIndex === index ? 3 : 1,
              transition: "opacity 0.8s ease, visibility 0.8s ease"
            }}
            aria-label={slide.title}
            aria-hidden={slideIndex !== index}
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
                    tabIndex={slideIndex === index ? 0 : -1}
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
          <button
            type="button"
            className="hero-autoplay-toggle btn btn-secondary"
            aria-pressed={isUserPaused}
            aria-label={isPaused ? "Reanudar carrusel principal" : "Pausar carrusel principal"}
            onClick={() => setIsUserPaused(prev => !prev)}
          >
            {isPaused ? "Reanudar" : "Pausar"}
          </button>
        </div>
      </div>
    </section>
  );
};

const PageHero = ({ eyebrow, title, description, image, ctas = [] }) => (
  <section id="hero" className="hero" aria-label={title}>
    <div className="hero-slider">
      <article
        className="hero-slide active"
        style={{
          backgroundImage: `url('${image}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 1,
          visibility: "visible",
          pointerEvents: "auto",
          zIndex: 3
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
                  className={`btn ${cta.style === "primary" ? "btn-primary" : "btn-secondary"}`}
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
        <h2 className="section-title">¿Por qué las familias eligen Be One English?</h2>
        <p className="section-subtitle">
          Porque no somos solo una academia. Somos el equipo que acompaña a tu familia en cada paso del camino hacia el inglés.
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
          <h2 className="section-title">Un programa pensado para cada etapa</h2>
          <p className="section-subtitle">Selecciona el perfil para ver objetivos, dinámicas y cómo acompañamos a cada familia.</p>
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
          <h2 className="section-title">Nuestros cursos para cada edad y objetivo</h2>
          <p className="section-subtitle">Elige el programa que mejor se adapte a tu familia. Todos incluyen mentor nativo y seguimiento personalizado.</p>
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
    <article className="stat-card" ref={ref}>
      <div className="stat-value">
        {count}
        {suffix}
      </div>
      <div className="stat-label">{label}</div>
    </article>
  );
};

const ImpactSection = () => (
  <section className="stats-section" aria-label="Impacto medible">
    <div className="container">
      <div className="section-header">
        <h2 className="section-title">Nuestros números hablan por nosotros</h2>
        <p className="section-subtitle">Más de una década formando familias en Granada con resultados reales y medibles.</p>
      </div>
      <div className="stats-grid">
        {stats.map(stat => (
          <CounterCard
            key={stat.id}
            value={stat.value}
            suffix={stat.suffix}
            label={stat.label}
          />
        ))}
      </div>
    </div>
  </section>
);

const CTASection = () => (
  <section className="cta-section" aria-label="Llamada a la acción">
    <div className="container">
      <div className="cta-content">
        <h2 className="cta-title">¿Listo para dar el paso?</h2>
        <p className="cta-description">
          Reserva una sesión de descubrimiento gratuita. Incluye prueba de nivel, recomendaciones personalizadas y acceso a nuestro calendario familiar.
        </p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="contact-us.html">
            <i className="fa-solid fa-calendar-check"></i> Agendar llamada gratuita
          </a>
          <a
            className="btn btn-secondary"
            href="https://wa.me/34622854358?text=Quiero%20planificar%20ingl%C3%A9s%20con%20mi%20familia"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa-brands fa-whatsapp"></i> Escríbenos por WhatsApp
          </a>
        </div>
      </div>
    </div>
  </section>
);

const Testimonials = () => {
  const {
    index,
    setIndex,
    isPaused,
    isUserPaused,
    setIsUserPaused,
    setIsInteractionPaused
  } = useAutoAdvance(testimonials.length, 9000);
  const testimonialsRef = useRef(null);
  const pauseOnInteraction = () => setIsInteractionPaused(true);
  const resumeOnPointerLeave = () => setIsInteractionPaused(false);
  const resumeOnBlur = event => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsInteractionPaused(false);
    }
  };

  useEffect(() => {
    const gsap = window.gsap;
    if (!gsap || !testimonialsRef.current) {
      return undefined;
    }

    const prefersReducedMotion =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      const activeSlide = gsap.utils.toArray(".testimonial-slide")[index];
      if (!activeSlide) {
        return;
      }
      const activeContent = activeSlide.querySelectorAll(
        ".testimonial-quote, .testimonial-author, .testimonial-info > p"
      );

      gsap.fromTo(
        activeContent,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.08, ease: "power2.out" }
      );
    }, testimonialsRef);

    return () => {
      ctx.revert();
    };
  }, [index]);

  return (
    <section
      className="testimonials-section"
      aria-label="Testimonios"
      ref={testimonialsRef}
      onMouseEnter={pauseOnInteraction}
      onMouseLeave={resumeOnPointerLeave}
      onFocusCapture={pauseOnInteraction}
      onBlurCapture={resumeOnBlur}
    >
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Lo que dicen nuestras familias</h2>
          <p className="section-subtitle">Opiniones reales de quienes ya forman parte de la comunidad Be One English.</p>
        </div>
        <div className="testimonial-wrapper">
          <div className="testimonial-stage">
            {testimonials.map((item, itemIndex) => (
              <article
                className={`testimonial-slide ${itemIndex === index ? "active" : ""}`}
                key={item.id}
                style={{
                  opacity: itemIndex === index ? 1 : 0,
                  pointerEvents: itemIndex === index ? "auto" : "none",
                  position: itemIndex === index ? "relative" : "absolute",
                  inset: 0,
                  transition: "opacity 0.5s ease"
                }}
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
          </div>
          <div className="testimonial-nav">
            {testimonials.map((item, dotIndex) => (
              <button
                key={item.id}
                className={`hero-dot ${dotIndex === index ? 'active' : ''}`}
                aria-label={`Ir al testimonio ${dotIndex + 1}`}
                onClick={() => setIndex(dotIndex)}
              />
            ))}
            <button
              type="button"
              className="testimonial-autoplay-toggle btn btn-secondary"
              aria-pressed={isUserPaused}
              aria-label={isPaused ? "Reanudar testimonios" : "Pausar testimonios"}
              onClick={() => setIsUserPaused(prev => !prev)}
            >
              {isPaused ? "Reanudar" : "Pausar"}
            </button>
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
            Tu academia de inglés en Granada. Programas para niños, adolescentes, adultos y empresas con mentores nativos y seguimiento personalizado.
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
            <li><a href="nivel.html">Prueba de nivel gratuita</a></li>
            <li><a href="examenes.html">Exámenes oficiales</a></li>
            <li><a href="blog.html">Actividades y eventos</a></li>
            <li><a href="contact-us.html">Contacto</a></li>
          </ul>
        </div>
        <div>
          <h4 className="footer-title">Cursos</h4>
          <ul className="footer-links">
            <li><a href="course-kids.html">Kids Club 4-12</a></li>
            <li><a href="course-ten.html">Teens Pro 12+</a></li>
            <li><a href="course-adult.html">Adult Boost A1-C2</a></li>
            <li><a href="intensivos.html">Cursos intensivos</a></li>
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
        <p>© {new Date().getFullYear()} Be One English Language Centre. Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>
);

const PhotoCarousel = ({ event }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const hasMultiplePhotos = event.photos.length > 1;
  
  const goToPrev = () => setCurrentIndex(prev => (prev === 0 ? event.photos.length - 1 : prev - 1));
  const goToNext = () => setCurrentIndex(prev => (prev === event.photos.length - 1 ? 0 : prev + 1));

  useEffect(() => {
    const gsap = window.gsap;
    if (!gsap || !carouselRef.current) {
      return undefined;
    }

    const prefersReducedMotion =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      const image = carouselRef.current.querySelector(".photo-carousel-image");
      const infoItems = carouselRef.current.querySelectorAll(".photo-carousel-info > *");
      const dots = carouselRef.current.querySelectorAll(".photo-carousel-dots button");
      const activeDot = dots[currentIndex];

      if (image) {
        gsap.fromTo(
          image,
          { autoAlpha: 0, scale: 1.08, filter: "blur(5px)" },
          {
            autoAlpha: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.55,
            ease: "power2.out"
          }
        );
      }

      if (infoItems.length) {
        gsap.fromTo(
          infoItems,
          { y: 12, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.32, stagger: 0.05, ease: "power2.out" }
        );
      }

      if (activeDot) {
        gsap.fromTo(
          activeDot,
          { scale: 0.7 },
          { scale: 1.2, duration: 0.3, ease: "back.out(2)" }
        );
      }
    }, carouselRef);

    return () => {
      ctx.revert();
    };
  }, [currentIndex, event.id]);
  
  return (
    <article
      className="card photo-carousel-card"
      ref={carouselRef}
      style={{ "--event-color": event.color }}
    >
      <div className="photo-carousel">
        <div className="photo-carousel-main">
          <img 
            src={event.photos[currentIndex]} 
            alt={`${event.title} - Foto ${currentIndex + 1}`}
            className="photo-carousel-image"
          />
          {hasMultiplePhotos && (
            <>
              <button 
                className="carousel-nav carousel-prev" 
                onClick={goToPrev}
                aria-label="Foto anterior"
              >
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              <button 
                className="carousel-nav carousel-next" 
                onClick={goToNext}
                aria-label="Foto siguiente"
              >
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </>
          )}
        </div>
        <div className="photo-carousel-info">
          <div className="photo-carousel-header">
            <i className={`${event.icon} photo-carousel-event-icon`}></i>
            <h3 className="photo-carousel-title">{event.title}</h3>
          </div>
          <p className="photo-carousel-description">{event.description}</p>
          {hasMultiplePhotos && (
            <div className="photo-carousel-dots">
              {event.photos.map((_, idx) => (
                <button
                  key={idx}
                  className={`photo-carousel-dot ${idx === currentIndex ? "active" : ""}`}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Ir a foto ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

const EventsGallery = () => (
  <section id="eventos" className="pillars-section" aria-label="Galería de eventos">
    <div className="container">
      <div className="section-header">
        <h2 className="section-title">Nuestros eventos</h2>
        <p className="section-subtitle">Recuerda nuestras celebraciones y actividades especiales</p>
      </div>
      <div className="grid grid-3">
        {eventPhotos.map(event => (
          <PhotoCarousel key={event.id} event={event} />
        ))}
      </div>
    </div>
  </section>
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
      eyebrow="Sobre nosotros"
      title="Un equipo que inspira, una metodología que funciona"
      description="Somos profesores nativos y certificados que combinan pedagogía innovadora, clubs familiares y tecnología para que cada alumno avance con confianza y motivación."
      image="assets/images/slide2.jpg"
      ctas={[
        { label: "Descubre nuestros cursos", href: "course-kids.html", style: "primary" },
        { label: "Ver actividades familiares", href: "blog.html", style: "secondary" }
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
        eyebrow={course.mode}
        title={course.title}
        description={course.description}
        image={course.image}
        ctas={[
          { label: "Hablar con un asesor", href: "contact-us.html", style: "primary" },
          { label: "Ver intensivos", href: "intensivos.html", style: "secondary" }
        ]}
      />
      <section aria-label="Detalle del curso" className="pillars-section">
        <div className="container">
          <div className="course-grid" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <article className="card" style={{ borderTop: `4px solid ${course.color}`, textAlign: 'center', padding: 'var(--space-xl)' }}>
              <div style={{ 
                width: '120px', 
                height: '120px', 
                borderRadius: '50%', 
                background: `linear-gradient(135deg, ${course.color}15, ${course.color}30)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto var(--space-lg)',
                border: `3px solid ${course.color}`
              }}>
                <i className={course.icon} style={{ fontSize: '50px', color: course.color }}></i>
              </div>
              <span className="badge" style={{ backgroundColor: course.color, display: 'inline-block', marginBottom: 'var(--space-md)' }}>
                <i className="fa-solid fa-graduation-cap" aria-hidden="true"></i>
                {course.badge}
              </span>
              <h3 style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--space-md)' }}>{course.title}</h3>
              <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--text-light)', marginBottom: 'var(--space-lg)' }}>{course.description}</p>
              
              <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-xl)', marginBottom: 'var(--space-lg)', flexWrap: 'wrap' }}>
                <div style={{ textAlign: 'center' }}>
                  <i className="fa-solid fa-clock" style={{ color: course.color, fontSize: '24px', marginBottom: 'var(--space-xs)' }}></i>
                  <p style={{ margin: 0, fontWeight: '600' }}>{course.duration}</p>
                  <p style={{ margin: 0, fontSize: 'var(--font-size-sm)', color: 'var(--text-light)' }}>Duración</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <i className="fa-solid fa-calendar" style={{ color: course.color, fontSize: '24px', marginBottom: 'var(--space-xs)' }}></i>
                  <p style={{ margin: 0, fontWeight: '600' }}>{course.schedule}</p>
                  <p style={{ margin: 0, fontSize: 'var(--font-size-sm)', color: 'var(--text-light)' }}>Horario</p>
                </div>
              </div>
              
              {course.features && (
                <ul className="intensive-features" style={{ textAlign: 'left', maxWidth: '400px', margin: '0 auto var(--space-lg)' }}>
                  {course.features.map((feature, idx) => (
                    <li key={idx}><i className="fa-solid fa-check" style={{ color: course.color }}></i> {feature}</li>
                  ))}
                </ul>
              )}
              
              {course.focus && (
                <ul className="intensive-features" style={{ textAlign: 'left', maxWidth: '400px', margin: '0 auto var(--space-lg)' }}>
                  {course.focus.map((item, idx) => (
                    <li key={idx}><i className="fa-solid fa-check" style={{ color: course.color }}></i> {item}</li>
                  ))}
                </ul>
              )}
              
              <div className="hero-actions mt-lg" style={{ justifyContent: 'center' }}>
                <a className="btn btn-primary" href="contact-us.html">
                  Solicitar información
                </a>
                <a className="btn btn-secondary" href="nivel.html">
                  Hacer prueba gratuita
                </a>
              </div>
            </article>
          </div>
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
      eyebrow="Actividades y eventos"
      title="Más que clases: experiencias que unen a la familia"
      description="Book picnics, escape rooms, meetups culinarios y retos semanales para practicar inglés de forma divertida y en comunidad."
      image="assets/images/slide3.png"
      ctas={[
        { label: "Apúntate al próximo evento", href: "contact-us.html", style: "primary" },
        { label: "Suscríbete al boletín", href: "mailto:beoneenglish@gmail.com", style: "secondary" }
      ]}
    />
    <EventsGallery />
    <ParentsResources />
    <CTASection />
    <Testimonials />
    <ContactSection />
  </>
);

const ContactLayout = () => (
  <>
    <PageHero
      eyebrow="Contacto"
      title="Hablemos sobre tu próximo paso en inglés"
      description="Nuestro equipo responde en menos de 2 horas. Elige el canal que prefieras: email, teléfono o WhatsApp."
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
      eyebrow="Prueba de nivel gratuita"
      title="Descubre tu nivel y recibe un plan a tu medida"
      description="En solo 15 minutos evaluamos tu punto de partida, definimos tus objetivos y te entregamos un itinerario personalizado."
      image="assets/images/slide2.jpg"
      ctas={[
        { label: "Agendar llamada gratuita", href: "contact-us.html", style: "primary" },
        { label: "Ver todos los cursos", href: "course-kids.html", style: "secondary" }
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
      eyebrow="Exámenes oficiales"
      title="Tu certificación Cambridge, Trinity, IELTS o TOEFL empieza aquí"
      description="Simulacros reales, feedback semanal y tutores especializados que te acompañan hasta el día del examen con confianza."
      image="assets/images/slide2.jpg"
      ctas={[
        { label: "Programa Teens Pro", href: "course-ten.html", style: "primary" },
        { label: "Programa Adult Boost", href: "course-adult.html", style: "secondary" }
      ]}
    />
    <CourseGrid />
    <ImpactSection />
    <CTASection />
  </>
);

const IntensiveLayout = ({ courseId }) => {
  const course = intensivoCourses.find(c => c.id === courseId);
  
  if (course) {
    return (
      <>
        <PageHero
          eyebrow={`Intensivo ${course.level}`}
          title={course.title}
          description={course.description}
          image="assets/images/Intensivos2025.jpg"
          ctas={[
            { label: "Reservar plaza", href: "nivel.html", style: "primary" },
            { label: "Ver todos los intensivos", href: "intensivos.html", style: "secondary" }
          ]}
        />
        <section aria-label="Detalle del curso">
          <div className="container">
            <div className="course-grid" style={{ maxWidth: '700px', margin: '0 auto' }}>
              <article className="card course-card highlight" style={{ borderTop: `4px solid ${course.color}`, textAlign: 'center' }}>
                <div style={{ 
                  width: '100px', 
                  height: '100px', 
                  borderRadius: '50%', 
                  background: `linear-gradient(135deg, ${course.color}20, ${course.color}40)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto var(--space-lg)',
                  border: `3px solid ${course.color}`
                }}>
                  <i className={course.icon} style={{ fontSize: '40px', color: course.color }}></i>
                </div>
                <span className="badge" style={{ backgroundColor: course.color, display: 'inline-block', marginBottom: 'var(--space-md)' }}>
                  <i className="fa-solid fa-graduation-cap" aria-hidden="true"></i>
                  Nivel {course.level}
                </span>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <div className="course-meta" style={{ justifyContent: 'center' }}>
                  <i className="fa-solid fa-clock"></i>
                  <span>Duración: {course.duration}</span>
                </div>
                <div className="course-meta" style={{ justifyContent: 'center' }}>
                  <i className="fa-solid fa-calendar"></i>
                  <span>Horario: {course.schedule}</span>
                </div>
                <ul className="intensive-features">
                  {course.features.map((feature, idx) => (
                    <li key={idx}><i className="fa-solid fa-check" style={{ color: course.color }}></i> {feature}</li>
                  ))}
                </ul>
                <div className="hero-actions mt-lg" style={{ justifyContent: 'center' }}>
                  <a className="btn btn-primary" href="contact-us.html">
                    Solicitar información
                  </a>
                  <a className="btn btn-secondary" href="nivel.html">
                    Hacer prueba gratuita
                  </a>
                </div>
              </article>
            </div>
          </div>
        </section>
        <CTASection />
        <Testimonials />
        <ContactSection />
      </>
    );
  }
  
  return (
    <>
      <PageHero
        eyebrow="Cursos intensivos 2026"
        title="De 4 a 8 semanas hacia tu certificación"
        description="Domina el inglés con simulacros diarios, tutores nativos y seguimiento personalizado. De B1 a C2, elige tu ritmo."
        image="assets/images/Intensivos2025.jpg"
        ctas={[
          { label: "Reservar plaza", href: "nivel.html", style: "primary" },
          { label: "Hablar con un asesor", href: "contact-us.html", style: "secondary" }
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
                <div className="course-image" style={{ height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `linear-gradient(135deg, ${course.color}15, ${course.color}30)` }}>
                  <i className={course.icon} style={{ fontSize: '50px', color: course.color }}></i>
                </div>
                <span className="course-badge" style={{ backgroundColor: course.color }}>{course.level}</span>
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
                  <div className="hero-actions mt-md">
                    <a className="btn btn-primary" href={course.link}>Ver detalles</a>
                  </div>
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
};

const EventGalleryLayout = ({ eventId }) => {
  const event = eventPhotos.find(e => e.id === eventId);
  const isHtml = event?.photos[0]?.endsWith('.html');
  
  if (!event || !isHtml) {
    return <BlogLayout />;
  }
  
  return (
    <>
      <section id="hero" className="hero" aria-label={event.title}>
        <div className="hero-slider">
          <article className="hero-slide" style={{ backgroundColor: `${event.color}20` }}>
            <div className="hero-content">
              <i className={event.icon} style={{ fontSize: '60px', color: event.color, marginBottom: 'var(--space-md)' }}></i>
              <h1>{event.title}</h1>
              <p>{event.description}</p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="blog.html">Volver a actividades</a>
                <a className="btn btn-secondary" href="contact-us.html">Próximo evento</a>
              </div>
            </div>
          </article>
        </div>
      </section>
      <ContactSection />
    </>
  );
};

const pageLayouts = {
  home: <HomeLayout />,
  about: <AboutLayout />,
  course: <CourseDetailLayout courseId={pageConfig.courseId || "kids"} />,
  blog: <BlogLayout />,
  contact: <ContactLayout />,
  level: <LevelLayout />,
  exams: <ExamsLayout />,
  intensivo: <IntensiveLayout courseId={pageConfig.courseId} />,
  "event-gallery": <EventGalleryLayout eventId={pageConfig.eventId} />
};

const App = () => {
  const appRef = useRef(null);

  useSiteAnimations(appRef);

  return (
    <div className="app-wrapper" ref={appRef}>
      <Header />
      <main className="page-content">
        {pageLayouts[currentPage] || <HomeLayout />}
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
