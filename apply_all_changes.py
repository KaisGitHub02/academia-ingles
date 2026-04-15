"""Final clean rebuild of app.jsx from git base with all session changes applied."""
import subprocess

# ── Get clean UTF-8 base from git ───────────────────────────────────────────
result = subprocess.run(['git', 'show', 'HEAD:js/app.jsx'], capture_output=True, cwd='e:/kaisb/descarga')
src = result.stdout.decode('utf-8')
print(f'Base loaded: {len(src.splitlines())} lines')

# ── 1. WA block at very top ──────────────────────────────────────────────────
WA_BLOCK = (
    "\n// ---------- WhatsApp Links ----------\n"
    "const WA_BASE = 'https://wa.me/34622854358?text=';\n"
    "const waLink = (msg) => WA_BASE + encodeURIComponent(msg);\n"
    "const WA = {\n"
    "  general:    waLink('Hola, me gustar\u00eda recibir m\u00e1s informaci\u00f3n sobre Be One English.'),\n"
    "  prueba:     waLink('Hola, me interesa hacer la prueba de nivel gratuita. \u00bfCu\u00e1ndo podr\u00eda ser?'),\n"
    "  kids:       waLink('Hola, me interesa el curso Kids Club (4-12 a\u00f1os). \u00bfPodr\u00edais darme m\u00e1s informaci\u00f3n?'),\n"
    "  teens:      waLink('Hola, me interesa el curso Teens Pro para adolescentes. \u00bfC\u00f3mo funciona?'),\n"
    "  adults:     waLink('Hola, me interesa el curso para adultos. \u00bfPod\u00e9is contarme m\u00e1s?'),\n"
    "  intensive:  waLink('Hola, me interesa apuntarme a los Intensivos 2026. \u00bfQuedan plazas?'),\n"
    "  exams:      waLink('Hola, quiero preparar un examen oficial (APTIS/Cambridge/Trinity/TOEFL).'),\n"
    "  contact:    waLink('Hola, quiero hablar con Antonio o Jackeline para recibir informaci\u00f3n.'),\n"
    "  event:      waLink('Hola, me gustar\u00eda apuntarme al pr\u00f3ximo evento de Be One English.'),\n"
    "  agendar:    waLink('Hola, me gustar\u00eda agendar una llamada gratuita para conocer Be One English.'),\n"
    "  moreInfo:   waLink('Hola, me gustar\u00eda recibir m\u00e1s informaci\u00f3n sobre los cursos de Be One English.'),\n"
    "  classModes: waLink('Hola, quiero saber m\u00e1s sobre las modalidades de clase disponibles.'),\n"
    "};\n\n"
)

ANCHOR = "const { useState, useEffect, useRef } = React;"
src = src.replace(ANCHOR, ANCHOR + "\n" + WA_BLOCK, 1)

# ── 2. Image paths → WebP ────────────────────────────────────────────────────
for old, new in [
    ('"assets/images/slide1.jpg"', '"assets/images/slide1.webp"'),
    ('"assets/images/slide2.jpg"', '"assets/images/slide2.webp"'),
    ('"assets/images/slide3.png"', '"assets/images/slide3.webp"'),
    ('"assets/images/Intensivos2025.jpg"', '"assets/images/Intensivos2025.webp"'),
]:
    src = src.replace(old, new)

# ── 3. Nav Contacto ──────────────────────────────────────────────────────────
src = src.replace(
    '{ href: "contact-us.html", label: "Contacto" }',
    '{ href: WA.contact, label: "Contacto \U0001f4ac", external: true }'
)

# ── 4. Bottom nav Contacto ───────────────────────────────────────────────────
src = src.replace(
    "{ href: 'contact-us.html', icon: 'fa-solid fa-envelope', label: 'Contacto' },",
    "{ href: WA.contact, icon: 'fa-brands fa-whatsapp', label: 'Contacto', external: true },"
)

# ── 5. Generic CTA button replacements ──────────────────────────────────────
ctamap = {
    'ctaHref: "contact-us.html"': 'ctaHref: WA.classModes',
    '<li><a href="contact-us.html">Contacto</a></li>':
        '<li><a href={WA.general} target="_blank" rel="noreferrer">Contacto</a></li>',
    '{ label: "Agendar llamada gratuita", href: "contact-us.html", style: "primary" }':
        '{ label: "Agendar llamada gratuita \U0001f4ac", href: WA.agendar, style: "primary", external: true }',
    '{ label: "Hablar con Antonio o Jackeline", href: "contact-us.html", style: "primary" }':
        '{ label: "Hablar con Antonio o Jackeline \U0001f4ac", href: WA.contact, style: "primary", external: true }',
    '{ label: "Hablar con un asesor", href: "contact-us.html", style: "primary" }':
        '{ label: "Hablar con un asesor \U0001f4ac", href: WA.contact, style: "primary", external: true }',
    '{ label: "Hablar con un asesor", href: "contact-us.html", style: "secondary" }':
        '{ label: "Hablar con un asesor \U0001f4ac", href: WA.contact, style: "secondary", external: true }',
    '{ label: "Reservar plaza", href: "nivel.html", style: "primary" }':
        '{ label: "Reservar plaza \U0001f4ac", href: WA.intensive, style: "primary", external: true }',
    '{ label: "Ver ex\u00e1menes oficiales", href: "examenes.html", style: "secondary" }':
        '{ label: "Hablar con nosotros \U0001f4ac", href: WA.contact, style: "secondary", external: true }',
}
for old, new in ctamap.items():
    src = src.replace(old, new)

# Handle accented versions that might be in the file
src = src.replace(
    '{ label: "Ap\u00fantate al pr\u00f3ximo evento", href: "contact-us.html", style: "primary" }',
    '{ label: "Ap\u00fantate al pr\u00f3ximo evento \U0001f4ac", href: WA.event, style: "primary", external: true }'
)
src = src.replace(
    'href="contact-us.html">Pr\u00f3ximo evento</a>',
    'href={WA.event} target="_blank" rel="noreferrer">Pr\u00f3ximo evento \U0001f4ac</a>'
)
# Solicitar información
src = src.replace('href="contact-us.html">\n                  Solicitar informaci\u00f3n',
                  'href={WA.moreInfo} target="_blank" rel="noreferrer">\n                  Solicitar informaci\u00f3n')
src = src.replace('href="contact-us.html">\n                    Solicitar informaci\u00f3n',
                  'href={WA.moreInfo} target="_blank" rel="noreferrer">\n                    Solicitar informaci\u00f3n')
# CTA section Agendar
src = src.replace(
    'href="contact-us.html">\n                  <i className="fa-solid fa-calendar-check"></i> Agendar llamada gratuita',
    'href={WA.agendar} target="_blank" rel="noreferrer">\n                  <i className="fa-solid fa-calendar-check"></i> Agendar llamada gratuita'
)
# Exams grid
src = src.replace(
    "href=\"contact-us.html\" style={{ width: '100%' }}>\n                M\u00e1s informaci\u00f3n",
    "href={WA.exams} target=\"_blank\" rel=\"noreferrer\" style={{ width: '100%' }}>\n                M\u00e1s informaci\u00f3n"
)

print(f'contact-us.html remaining: {src.count("contact-us.html")} (nav links OK)')

# ── 6. New Hooks ─────────────────────────────────────────────────────────────
NEW_HOOKS = """
// ---------- New Hooks ----------
const useScrollProgress = () => {
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? Math.min(100, (el.scrollTop / total) * 100) : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return progress;
};

const useDarkMode = () => {
  const [dark, setDark] = React.useState(() => localStorage.getItem('beone_dark') === '1');
  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('beone_dark', dark ? '1' : '0');
  }, [dark]);
  return [dark, setDark];
};

const useExitIntent = () => {
  const [show, setShow] = React.useState(false);
  const fired = React.useRef(false);
  React.useEffect(() => {
    const dismissed = sessionStorage.getItem('exit_popup_dismissed');
    if (dismissed) return;
    const onLeave = (e) => {
      if (e.clientY <= 20 && !fired.current) {
        fired.current = true;
        setTimeout(() => setShow(true), 400);
      }
    };
    document.addEventListener('mouseleave', onLeave);
    return () => document.removeEventListener('mouseleave', onLeave);
  }, []);
  const close = () => { setShow(false); sessionStorage.setItem('exit_popup_dismissed', '1'); };
  return [show, close];
};

"""

HOOK_ANCHOR = '// ---------- Hooks + Shared Components ----------'
if HOOK_ANCHOR in src:
    src = src.replace(HOOK_ANCHOR, NEW_HOOKS + HOOK_ANCHOR, 1)
    print('OK: hooks inserted')

# ── 7. New UI Components (before TopBar) ─────────────────────────────────────
NEW_COMPONENTS = """
const ScrollProgressBar = () => {
  const progress = useScrollProgress();
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, height: '3px', zIndex: 99999,
      background: 'var(--grad-primary)', width: `${progress}%`,
      transition: 'width 0.1s linear', pointerEvents: 'none',
      borderRadius: '0 var(--radius-full) var(--radius-full) 0'
    }} />
  );
};

const PromoBanner = () => {
  const [visible, setVisible] = React.useState(() => !sessionStorage.getItem('promo_dismissed'));
  if (!visible) return null;
  return (
    <div className="promo-banner" role="banner">
      <span>
        <i className="fa-solid fa-star" style={{ color: 'var(--peach)' }}></i>&nbsp;
        <strong>Intensivos 2026</strong> &mdash; Plazas limitadas. \u00a1Reserva la tuya ahora!&nbsp;
        <a href="intensivos.html" className="promo-banner-cta">Ver intensivos</a>
      </span>
      <button aria-label="Cerrar" className="promo-banner-close"
        onClick={() => { setVisible(false); sessionStorage.setItem('promo_dismissed','1'); }}>
        <i className="fa-solid fa-xmark"></i>
      </button>
    </div>
  );
};

const DarkModeToggle = ({ dark, setDark }) => (
  <button className="dark-mode-toggle"
    onClick={() => setDark(d => !d)}
    aria-label={dark ? 'Modo claro' : 'Modo oscuro'}>
    <i className={dark ? 'fa-solid fa-sun' : 'fa-solid fa-moon'}></i>
  </button>
);

const TrustBadges = () => (
  <section className="trust-badges-section" aria-label="Certificaciones reconocidas">
    <div className="container">
      <p className="trust-badges-label">Certificaciones que preparamos</p>
      <div className="trust-badges-row">
        {examTypes.map(exam => (
          <a key={exam.id} href="examenes.html" className="trust-badge-item" title={exam.fullName}>
            <span className="trust-badge-icon" style={{ background: `${exam.color}18`, border: `1.5px solid ${exam.color}30` }}>
              <i className={exam.icon} style={{ color: exam.color }}></i>
            </span>
            <span className="trust-badge-name">{exam.name}</span>
          </a>
        ))}
      </div>
    </div>
  </section>
);

const HowItWorks = () => (
  <section className="how-section" aria-label="C\u00f3mo funciona">
    <div className="container">
      <div className="section-header">
        <h2 className="section-title">Empieza en 3 pasos sencillos</h2>
        <p className="section-subtitle">Sin burocracia ni esperas. En menos de 48 horas ya tendr\u00e1s tu plan personalizado.</p>
      </div>
      <div className="how-grid">
        {[
          { step: '01', icon: 'fa-solid fa-phone', title: 'Contacta con nosotros', desc: 'Escr\u00edbenos por WhatsApp o email. Te respondemos en menos de 2 horas.' },
          { step: '02', icon: 'fa-solid fa-clipboard-check', title: 'Prueba de nivel gratuita', desc: 'Una charla de 15 minutos para conocer tus metas y definir el mejor camino.' },
          { step: '03', icon: 'fa-solid fa-rocket', title: '\u00a1Empieza a aprender!', desc: 'Plan personalizado listo, materiales incluidos y tu mentor asignado. \u00a1Vamos!' },
        ].map((item, i) => (
          <article key={i} className="how-card">
            <div className="how-step-number">{item.step}</div>
            <div className="how-icon"><i className={item.icon}></i></div>
            <h3 className="how-title">{item.title}</h3>
            <p className="how-desc">{item.desc}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const ExitIntentPopup = ({ show, onClose }) => {
  if (!show) return null;
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-card" onClick={e => e.stopPropagation()}>
        <button className="popup-close" onClick={onClose}><i className="fa-solid fa-xmark"></i></button>
        <div className="popup-icon"><i className="fa-solid fa-gift"></i></div>
        <h2 className="popup-title">\u00a1Espera! Antes de salir...</h2>
        <p className="popup-subtitle">Consigue tu <strong>prueba de nivel gratuita</strong> con Antonio o Jackeline en 15 minutos.</p>
        <div className="popup-actions">
          <a href={WA.prueba} className="btn btn-primary popup-cta" target="_blank" rel="noreferrer" onClick={onClose}>
            <i className="fa-solid fa-calendar-check"></i> Reservar prueba gratuita
          </a>
          <button className="popup-skip" onClick={onClose}>No gracias, seguir navegando</button>
        </div>
      </div>
    </div>
  );
};

const BottomMobileNav = () => {
  const items = [
    { href: 'index.html', icon: 'fa-solid fa-house', label: 'Inicio' },
    { href: 'course-kids.html', icon: 'fa-solid fa-book-open', label: 'Cursos' },
    { href: WA.general, icon: 'fa-brands fa-whatsapp', label: 'WhatsApp', ext: true, hl: true },
    { href: 'examenes.html', icon: 'fa-solid fa-graduation-cap', label: 'Ex\u00e1menes' },
    { href: WA.contact, icon: 'fa-brands fa-whatsapp', label: 'Contacto', ext: true },
  ];
  return (
    <nav className="bottom-mobile-nav" aria-label="Navegaci\u00f3n r\u00e1pida m\u00f3vil">
      {items.map(item => (
        <a key={item.label} href={item.href}
          target={item.ext ? '_blank' : undefined}
          rel={item.ext ? 'noreferrer' : undefined}
          className={`bottom-nav-item${item.hl ? ' bottom-nav-highlight' : ''}`}>
          <i className={item.icon}></i>
          <span>{item.label}</span>
        </a>
      ))}
    </nav>
  );
};

"""

TOPBAR_ANCHOR = 'const TopBar = () => ('
if TOPBAR_ANCHOR in src:
    src = src.replace(TOPBAR_ANCHOR, NEW_COMPONENTS + TOPBAR_ANCHOR, 1)
    print('OK: UI components inserted')

# ── 8. Replace CourseDetailLayout → EventGalleryLayout block ─────────────────
COURSE_DETAIL_ANCHOR = '\nconst CourseDetailLayout = ({ courseId }) => {'
EVENT_GALLERY_ANCHOR = '\nconst EventGalleryLayout = ({ eventId }) => {'

if COURSE_DETAIL_ANCHOR in src and EVENT_GALLERY_ANCHOR in src:
    start = src.index(COURSE_DETAIL_ANCHOR)
    end = src.index(EVENT_GALLERY_ANCHOR)
    NEW_LAYOUTS = """
// ---------- Course WA helpers ----------
const courseWA = (course) => ({
  kids: WA.kids, teens: WA.teens, adults: WA.adults,
  business: waLink('Hola, me interesa el programa de Ingl\u00e9s Corporativo para equipos.'),
  private:  waLink('Hola, me interesa el Mentoring 1:1 personalizado. \u00bfC\u00f3mo funciona?'),
  intensive: WA.intensive,
}[course.id] || WA.moreInfo);

const intensivoWA = (level) =>
  waLink(`Hola, me interesa el Intensivo ${level} de Be One English. \u00bfHay plazas para 2026?`);

const CourseDetailLayout = ({ courseId }) => {
  const course = courseList.find(c => c.id === courseId) || courseList[0];
  const waHref = courseWA(course);
  const items = course.features || course.focus || [];
  return (
    <>
      <PageHero
        eyebrow={course.mode}
        title={course.title}
        description={course.description}
        image={course.image}
        ctas={[
          { label: `Apuntarme a ${course.title} \U0001f4ac`, href: waHref, style: 'primary', external: true },
          { label: 'Prueba de nivel gratis', href: WA.prueba, style: 'secondary', external: true }
        ]}
      />
      <section className="course-detail-section" aria-label="Detalle del curso">
        <div className="container">
          <div className="cd-hero-card" style={{ '--course-color': course.color }}>
            <div className="cd-hero-visual">
              <div className="cd-icon-wrap"><i className={course.icon}></i></div>
              <span className="cd-level-badge">{course.badge}</span>
            </div>
            <div className="cd-hero-body">
              <h2 className="cd-title">{course.title}</h2>
              <p className="cd-desc">{course.description}</p>
              <div className="cd-stats">
                <div className="cd-stat"><i className="fa-solid fa-clock"></i><strong>{course.duration}</strong><span>Duraci\u00f3n</span></div>
                <div className="cd-stat"><i className="fa-solid fa-calendar-days"></i><strong>{course.schedule}</strong><span>Horario</span></div>
                <div className="cd-stat"><i className="fa-solid fa-location-dot"></i><strong>{course.mode}</strong><span>Modalidad</span></div>
              </div>
              {items.length > 0 && (
                <ul className="cd-features">
                  {items.map((f, i) => (
                    <li key={i}><span className="cd-check"><i className="fa-solid fa-check"></i></span>{f}</li>
                  ))}
                </ul>
              )}
              <div className="cd-actions">
                <a className="btn btn-primary cd-cta" href={waHref} target="_blank" rel="noreferrer">
                  <i className="fa-brands fa-whatsapp"></i> Quiero apuntarme
                </a>
                <a className="btn btn-secondary" href={WA.prueba} target="_blank" rel="noreferrer">
                  Prueba de nivel gratis
                </a>
              </div>
            </div>
          </div>
          <div className="cd-other-courses">
            <h3 className="cd-other-title">Tambi\u00e9n puede interesarte</h3>
            <div className="cd-other-grid">
              {courseList.filter(c => c.id !== course.id).slice(0, 3).map(c => (
                <a key={c.id} href={c.link} className="cd-other-card">
                  <div className="cd-other-icon" style={{ background: `${c.color}18`, border: `1.5px solid ${c.color}30` }}>
                    <i className={c.icon} style={{ color: c.color }}></i>
                  </div>
                  <div><strong>{c.title}</strong><span>{c.mode}</span></div>
                  <i className="fa-solid fa-arrow-right cd-other-arrow"></i>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
      <ImpactSection /><Testimonials /><CTASection />
    </>
  );
};

const AboutLayout = () => (
  <>
    <PageHero eyebrow="Sobre nosotros" title="Dos profesores, una pasi\u00f3n: tu progreso"
      description="Antonio y Jackeline cubren de A1 a C2 con trato cercano, libros oficiales y el ingl\u00e9s que usas en la vida real."
      image="assets/images/slide2.webp"
      ctas={[
        { label: 'Descubre nuestros cursos', href: 'course-kids.html', style: 'primary' },
        { label: 'Hablar con nosotros \U0001f4ac', href: WA.contact, style: 'secondary', external: true }
      ]} />
    <ProfessorsSection /><Pillars /><ImpactSection /><ClassModesSection />
    <Testimonials /><AcademyMap /><CTASection />
  </>
);

const BlogLayout = () => (
  <>
    <PageHero eyebrow="Actividades y eventos" title="M\u00e1s que clases: experiencias que unen a la familia"
      description="Book picnics, escape rooms, meetups culinarios y retos semanales para practicar ingl\u00e9s de forma divertida."
      image="assets/images/slide3.webp"
      ctas={[
        { label: 'Ap\u00fantate al pr\u00f3ximo evento \U0001f4ac', href: WA.event, style: 'primary', external: true },
        { label: 'Suscr\u00edbete al bolet\u00edn', href: 'mailto:beoneenglish@gmail.com', style: 'secondary' }
      ]} />
    <EventsGallery /><ParentsResources /><AcademyMap /><CTASection /><Testimonials />
  </>
);

const ContactLayout = () => (
  <>
    <PageHero eyebrow="Contacto" title="Hablemos sobre tu pr\u00f3ximo paso en ingl\u00e9s"
      description="Nuestro equipo responde en menos de 2 horas. Elige el canal que prefieras: email, tel\u00e9fono o WhatsApp."
      image="assets/images/slide1.webp"
      ctas={[
        { label: 'Enviar email', href: 'mailto:beoneenglish@gmail.com', style: 'primary' },
        { label: 'WhatsApp directo \U0001f4ac', href: WA.general, style: 'secondary', external: true }
      ]} />
    <ContactSection /><AcademyMap /><CTASection />
  </>
);

const LevelLayout = () => (
  <>
    <PageHero eyebrow="Prueba de nivel gratuita" title="Descubre tu nivel y recibe un plan a tu medida"
      description="Antonio y Jackeline te eval\u00faan en 15 minutos y te entregan un itinerario personalizado. Sin compromiso."
      image="assets/images/slide2.webp"
      ctas={[
        { label: 'Agendar llamada gratuita \U0001f4ac', href: WA.agendar, style: 'primary', external: true },
        { label: 'Ver todos los cursos', href: 'course-kids.html', style: 'secondary' }
      ]} />
    <ClassModesSection /><CTASection /><Testimonials />
  </>
);

const ExamsLayout = () => (
  <>
    <PageHero eyebrow="Ex\u00e1menes oficiales" title="APTIS, Cambridge, Trinity, TOEFL y SIELE: elige tu meta"
      description="Antonio te prepara de A1 a B2. Jackeline de B2 a C2. Simulacros reales y un 99% de aprobados."
      image="assets/images/slide2.webp"
      ctas={[
        { label: 'Hablar con Antonio o Jackeline \U0001f4ac', href: WA.contact, style: 'primary', external: true },
        { label: 'Prueba de nivel gratis', href: WA.prueba, style: 'secondary', external: true }
      ]} />
    <ExamsGrid /><ImpactSection /><ClassModesSection /><AcademyMap /><CTASection />
  </>
);

const IntensiveLayout = ({ courseId }) => {
  const course = intensivoCourses.find(c => c.id === courseId);
  if (course) {
    const waHref = intensivoWA(course.level);
    return (
      <>
        <PageHero eyebrow={`Intensivo ${course.level} \u2014 ${course.duration}`}
          title={course.title} description={course.description}
          image="assets/images/Intensivos2025.webp"
          ctas={[
            { label: `Reservar plaza ${course.level} \U0001f4ac`, href: waHref, style: 'primary', external: true },
            { label: 'Ver todos los intensivos', href: 'intensivos.html', style: 'secondary' }
          ]} />
        <section className="course-detail-section" aria-label="Detalle intensivo">
          <div className="container">
            <div className="cd-hero-card" style={{ '--course-color': course.color }}>
              <div className="cd-hero-visual">
                <div className="cd-icon-wrap"><i className={course.icon}></i></div>
                <span className="cd-level-badge">Nivel {course.level}</span>
              </div>
              <div className="cd-hero-body">
                <h2 className="cd-title">{course.title}</h2>
                <p className="cd-desc">{course.description}</p>
                <div className="cd-stats">
                  <div className="cd-stat"><i className="fa-solid fa-hourglass-half"></i><strong>{course.duration}</strong><span>Duraci\u00f3n</span></div>
                  <div className="cd-stat"><i className="fa-solid fa-calendar-days"></i><strong>{course.schedule}</strong><span>Horario</span></div>
                  <div className="cd-stat"><i className="fa-solid fa-trophy"></i><strong>Certificaci\u00f3n</strong><span>Objetivo</span></div>
                </div>
                <ul className="cd-features">
                  {course.features.map((f, i) => (
                    <li key={i}><span className="cd-check"><i className="fa-solid fa-check"></i></span>{f}</li>
                  ))}
                </ul>
                <div className="cd-actions">
                  <a className="btn btn-primary cd-cta" href={waHref} target="_blank" rel="noreferrer">
                    <i className="fa-brands fa-whatsapp"></i> Reservar mi plaza {course.level}
                  </a>
                  <a className="btn btn-secondary" href="intensivos.html">Ver todos los niveles</a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <CTASection /><Testimonials />
      </>
    );
  }
  return (
    <>
      <PageHero eyebrow="Cursos intensivos 2026" title="De 4 a 8 semanas hacia tu certificaci\u00f3n"
        description="Domina el ingl\u00e9s con simulacros diarios, tutores expertos y seguimiento personalizado."
        image="assets/images/Intensivos2025.webp"
        ctas={[
          { label: 'Reservar plaza \U0001f4ac', href: WA.intensive, style: 'primary', external: true },
          { label: 'Hablar con un asesor', href: WA.contact, style: 'secondary', external: true }
        ]} />
      <section className="intensive-list-section" aria-label="Cursos intensivos">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Elige tu nivel intensivo</h2>
            <p className="section-subtitle">Cada nivel tiene su propio ritmo, materiales y tutor asignado.</p>
          </div>
          <div className="level-track">
            {intensivoCourses.map((c, i) => (
              <div key={c.id} className="level-track-step">
                <div className="level-track-dot" style={{ background: c.color, boxShadow: `0 0 0 4px ${c.color}30` }}>
                  <i className={c.icon}></i>
                </div>
                <span className="level-track-label" style={{ color: c.color }}>{c.level}</span>
                {i < intensivoCourses.length - 1 && (
                  <div className="level-track-line" style={{ background: `linear-gradient(90deg, ${c.color}, ${intensivoCourses[i+1].color})` }} />
                )}
              </div>
            ))}
          </div>
          <div className="intensive-cards-grid">
            {intensivoCourses.map(c => {
              const levelWA = intensivoWA(c.level);
              return (
                <article key={c.id} className="intensive-card" style={{ '--level-color': c.color }}>
                  <div className="intensive-card-header">
                    <div className="intensive-card-icon"><i className={c.icon}></i></div>
                    <div>
                      <span className="intensive-level-pill" style={{ background: c.color }}>{c.level}</span>
                      <h3 className="intensive-card-title">{c.title}</h3>
                    </div>
                  </div>
                  <p className="intensive-card-desc">{c.description}</p>
                  <div className="intensive-card-meta">
                    <span><i className="fa-solid fa-hourglass-half"></i> {c.duration}</span>
                    <span><i className="fa-solid fa-calendar"></i> {c.schedule}</span>
                  </div>
                  <ul className="intensive-card-features">
                    {c.features.map((f, i) => (
                      <li key={i}><i className="fa-solid fa-circle-check"></i>{f}</li>
                    ))}
                  </ul>
                  <div className="intensive-card-actions">
                    <a className="btn btn-primary intensive-wa-btn" href={levelWA} target="_blank" rel="noreferrer">
                      <i className="fa-brands fa-whatsapp"></i> Reservar nivel {c.level}
                    </a>
                    <a href={c.link} className="intensive-detail-link">
                      Ver detalles <i className="fa-solid fa-arrow-right"></i>
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <ImpactSection /><CTASection /><Testimonials />
    </>
  );
};
"""
    src = src[:start] + NEW_LAYOUTS + src[end:]
    print('OK: All layouts replaced (single declaration each)')

# ── 9. HomeLayout ─────────────────────────────────────────────────────────────
src = src.replace(
    "  <HeroSlider />\n    <Pillars />",
    "  <HeroSlider />\n    <TrustBadges />\n    <Pillars />\n    <HowItWorks />"
)

# ── 10. App component ─────────────────────────────────────────────────────────
OLD_APP = """const App = () => {
  const appRef = useRef(null);
  const [adminOpen, setAdminOpen] = useState(false);

  useSiteAnimations(appRef);

  return (
    <div className="app-wrapper" ref={appRef}>
      <Header />
      <main className="page-content">
        {pageLayouts[currentPage] || <HomeLayout />}
      </main>
      <Footer />
      <WhatsAppButton />
      <AdminToggle onToggle={() => setAdminOpen(true)} />
      <AdminStatsPanel visible={adminOpen} onClose={() => setAdminOpen(false)} />
    </div>
  );
};"""

NEW_APP = """const App = () => {
  const appRef = useRef(null);
  const [adminOpen, setAdminOpen] = useState(false);
  const [dark, setDark] = useDarkMode();
  const [showExit, closeExit] = useExitIntent();

  useSiteAnimations(appRef);

  return (
    <div className="app-wrapper" ref={appRef}>
      <ScrollProgressBar />
      <PromoBanner />
      <Header dark={dark} setDark={setDark} />
      <main className="page-content">
        {pageLayouts[currentPage] || <HomeLayout />}
      </main>
      <Footer />
      <WhatsAppButton />
      <BottomMobileNav />
      <AdminToggle onToggle={() => setAdminOpen(true)} />
      <AdminStatsPanel visible={adminOpen} onClose={() => setAdminOpen(false)} />
      <ExitIntentPopup show={showExit} onClose={closeExit} />
      <DarkModeToggle dark={dark} setDark={setDark} />
    </div>
  );
};"""

if OLD_APP in src:
    src = src.replace(OLD_APP, NEW_APP)
    print('OK: App upgraded')

# ── Verify no duplicates ───────────────────────────────────────────────────────
for name in ['AboutLayout','BlogLayout','ContactLayout','LevelLayout','ExamsLayout','IntensiveLayout']:
    count = src.count(f'const {name}')
    status = 'OK' if count == 1 else f'ERROR x{count}'
    print(f'{status} {name}')

# ── WRITE ─────────────────────────────────────────────────────────────────────
with open('e:/kaisb/descarga/js/app.jsx', 'w', encoding='utf-8') as f:
    f.write(src)

print(f'\nDone. Lines: {src.count(chr(10))} | WA_BASE at line: {next(i+1 for i,l in enumerate(src.splitlines()) if "WA_BASE" in l)}')
