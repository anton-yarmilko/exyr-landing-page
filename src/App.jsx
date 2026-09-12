import { useEffect, useMemo, useState } from "react";
import {
  AppleLogo,
  ArrowRight,
  Check,
  Fingerprint,
  GooglePlayLogo,
  Key,
  List,
  Scan,
  ShieldCheck,
  Sparkle,
  X,
} from "@phosphor-icons/react";
import {
  siCloudflare,
  siDigitalocean,
  siDocker,
  siDribbble,
  siFramer,
  siGithub,
  siGitlab,
  siGooglecloud,
  siKubernetes,
  siLinear,
  siTrello,
  siWebflow,
} from "simple-icons";
import { formatPrice, getPlanPrice } from "./lib/pricing.js";
import { validateContactEmail } from "./lib/contact.js";

const integrations = [
  { icon: siGithub, label: "GitHub", className: "orbit-one" },
  { icon: siCloudflare, label: "Cloudflare", className: "orbit-two" },
  { icon: siGitlab, label: "GitLab", className: "orbit-three" },
  { icon: siDocker, label: "Docker", className: "orbit-four" },
  { icon: siGooglecloud, label: "Google Cloud", className: "orbit-five" },
  { icon: siKubernetes, label: "Kubernetes", className: "orbit-six" },
  { icon: siDigitalocean, label: "DigitalOcean", className: "orbit-seven" },
];

const clientLogos = [
  [siLinear, "Linear"],
  [siWebflow, "Webflow"],
  [siTrello, "Trello"],
  [siFramer, "Framer"],
  [siDribbble, "Dribbble"],
];

const resources = [
  {
    icon: Key,
    title: "Dui Felis Venenatis",
    text: "Conubia nostra inceptos himenaeos orci varius natoque penatibus.",
  },
  {
    icon: ShieldCheck,
    title: "Sed Do Eiusmod",
    text: "In voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    icon: Fingerprint,
    title: "Tempor Incididunt",
    text: "Excepteur sint occaecat cupidatat non proident sunt in culpa.",
  },
];

const featureBullets = [
  "Purus est efficitur laoreet mauris pharetra vestibulum fusce.",
  "Ante condimentum neque at luctus nibh finibus facilisis.",
  "Vitae pellentesque sem placerat in id cursus mi.",
  "Montes nascetur ridiculus mus donec rhoncus eros lobortis.",
];

function BrandMark({ compact = false }) {
  return (
    <span className={`brand ${compact ? "brand-compact" : ""}`}>
      <span className="brand-icon" aria-hidden="true"><Scan size={23} weight="bold" /></span>
      <span>exyr.io</span>
    </span>
  );
}

function SimpleIcon({ icon, label, size = 19 }) {
  return (
    <span className="simple-icon" role="img" aria-label={label}>
      <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
        <path d={icon.path} fill={`#${icon.hex}`} />
      </svg>
    </span>
  );
}

function StoreBadge({ store }) {
  const isGoogle = store === "Google Play";
  return (
    <a className="store-badge" href="#contact" aria-label={`Download on ${store}`}>
      {isGoogle ? <GooglePlayLogo weight="fill" /> : <AppleLogo weight="fill" />}
      <span>
        <small>{isGoogle ? "Get it on" : "Download on the"}</small>
        <strong>{store}</strong>
      </span>
    </a>
  );
}

function SectionIntro({ eyebrow, title, text }) {
  return (
    <div className="section-intro reveal">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  );
}

function AppLoader({ finished }) {
  return (
    <div className={`app-loader ${finished ? "is-finished" : ""}`} aria-hidden="true">
      <BrandMark compact />
      <div className="loader-track"><span /></div>
    </div>
  );
}

export function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [annual, setAnnual] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => setLoaded(true), reduced ? 40 : 1450);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = [...document.querySelectorAll(".reveal")];
    if (reduced || !("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return undefined;
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12, rootMargin: "0px 0px -6%" },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  const price = useMemo(() => getPlanPrice({ annual }), [annual]);

  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const result = validateContactEmail(email);
    setMessage(result.ok ? "Thanks — your early-access request is ready." : result.error);
  }

  return (
    <>
      <AppLoader finished={loaded} />
      <header className="site-header" data-testid="site-header">
        <div className="header-inner">
          <button className="brand-button" onClick={() => scrollTo("top")} aria-label="Go to top"><BrandMark /></button>
          <nav className="desktop-nav" aria-label="Primary navigation">
            <button onClick={() => scrollTo("products")}>Products</button>
            <button onClick={() => scrollTo("resources")}>Resources</button>
            <button onClick={() => scrollTo("use-cases")}>Use Cases</button>
            <button onClick={() => scrollTo("pricing")}>Pricing</button>
            <button className="button button-dark button-small" onClick={() => scrollTo("contact")}>Contacts</button>
          </nav>
          <button className="menu-toggle" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}>
            {menuOpen ? <X /> : <List />}
          </button>
        </div>
        <nav className={`mobile-nav ${menuOpen ? "is-open" : ""}`} aria-label="Mobile navigation">
          {["products", "resources", "use-cases", "pricing", "contact"].map((item) => (
            <button key={item} onClick={() => scrollTo(item)}>{item.replace("-", " ")}</button>
          ))}
        </nav>
      </header>

      <main id="top">
        <section className="hero page-shell" aria-labelledby="hero-title">
          <div className="store-row reveal"><StoreBadge store="Google Play" /><StoreBadge store="Mac App Store" /></div>
          <div className="hero-panel reveal">
            <div className="hero-copy">
              <span className="eyebrow">Lorem ipsum dolor sit amet</span>
              <h1 id="hero-title">Excepteur Sint Occaecat<br />{" "}Cupidatat Non Proident Sunt In Culpa</h1>
              <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              <div className="button-row">
                <button className="button button-dark" onClick={() => scrollTo("products")}>Get Started</button>
                <button className="button button-light" onClick={() => scrollTo("contact")}>Get Exyr Free</button>
              </div>
            </div>
            <div className="orbit-stage" aria-label="Supported integrations">
              {integrations.map(({ icon, label, className }) => (
                <span className={`orbit-badge ${className}`} key={label} title={label}><SimpleIcon icon={icon} label={label} /></span>
              ))}
            </div>
          </div>
          <div className="social-proof reveal">
            <div className="stars" aria-label="Rated 4 out of 5">★ ★ ★ ★ ☆</div>
            <p>In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam.</p>
            <div className="client-row" aria-label="Teams using Exyr">
              {clientLogos.map(([icon, label]) => <span key={label}><SimpleIcon icon={icon} label={label} />{label}</span>)}
            </div>
          </div>
        </section>

        <section id="products" className="product-section page-shell section-space">
          <div className="product-visual reveal"><img src="/assets/exyr-phone-pair.png" alt="Exyr mobile app shown in light and dark modes" /></div>
          <div className="product-bottom reveal">
            <div><h2>Blandit Quis Suspendisse Aliquet Nisi Sodales</h2><p>Ligula congue sollicitudin erat viverra ac tincidunt nam, velit aliquam imperdiet mollis nullam volutpat porttitor ullamcorper.</p></div>
            <div className="store-row"><StoreBadge store="Google Play" /><StoreBadge store="Mac App Store" /></div>
          </div>
        </section>

        <section id="resources" className="page-shell section-space">
          <SectionIntro eyebrow="Feugiat tristique" title="Sem Placerat In Id Cursus Mi Pretium Tellus" text="Taciti sociosqu ad litora torquent per conubia nostra. Ridiculus mus donec rhoncus eros lobortis nulla molestie." />
          <div className="resource-grid">
            {resources.map(({ icon: Icon, title, text }, index) => (
              <article className="resource-card reveal" key={title} style={{ "--delay": `${index * 90}ms` }}>
                <div className="resource-art"><Icon size={34} weight="duotone" /></div>
                <div className="resource-body"><h3>{title}</h3><p>{text}</p><button className="text-link" onClick={() => scrollTo("contact")}>Learn More <ArrowRight /></button></div>
              </article>
            ))}
          </div>
        </section>

        <section className="page-shell section-space reveal">
          <div className="map-panel">
            <img src="/assets/exyr-network-map.png" alt="Abstract global connection map" />
            <div className="map-copy">
              <span className="eyebrow">Finibus facilisis dapibus</span>
              <h2>Primis Vulputate Ornare</h2>
              <p>Fringilla lacus nec metus bibendum egestas iaculis massa. Taciti sociosqu ad litora torquent per conubia nostra.</p>
              <div className="button-row"><button className="button button-dark" onClick={() => scrollTo("contact")}>Get exyr.io Free</button><button className="button button-light" onClick={() => scrollTo("resources")}>Learn More</button></div>
            </div>
          </div>
        </section>

        <section id="use-cases" className="use-cases page-shell section-space">
          <SectionIntro eyebrow="Viverra ac tincidunt nam" title="Nulla Molestie Mattis Scelerisque Maximus Eget Fermentum Odio" text="Senectus netus suscipit auctor curabitur facilisi cubilia curae. Quisque faucibus ex sapien vitae pellentesque sem placerat." />
          <div className="dashboard reveal">
            <article className="status-card server-card"><div className="card-heading"><span>United States</span><strong>28 ms</strong></div><small>New York</small><div className="card-heading muted-line"><span>Australia</span><strong>180 ms</strong></div><small>Sydney</small><h3>Tempus Leo Eu Aenean</h3><p>Ut hendrerit semper vel class aptent taciti sociosqu.</p></article>
            <article className="status-card traffic-card"><div className="tabs"><span className="active">Traffic</span><span>Speed</span></div><div className="traffic-lines"><i /><i /><i /></div><h3>Ad Litora Torquent Per Conubia</h3><p>Pulvinar vivamus fringilla lacus nec metus.</p></article>
            <article className="status-card connected-card"><span className="pulse"><Sparkle weight="fill" /></span><div><h3>Maximus Eget Fermentum Odio Phasellus</h3><p>Euismod quam justo lectus commodo.</p></div></article>
          </div>
          <div className="tag-marquee" aria-label="Use cases"><div>{[...Array(2)].flatMap(() => ["#ConnectorAutoplacing", "#SecureInfrastructure", "#NetworkPrivacy", "#GlobalRouting"]).map((tag, index) => <span key={`${tag}-${index}`}>{tag}</span>)}</div></div>
        </section>

        <section id="pricing" className="pricing page-shell section-space">
          <SectionIntro eyebrow="Sunt in culpa" title="Labore Et Dolore Magna Aliqua" text="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur." />
          <label className="billing-toggle"><input type="checkbox" checked={annual} onChange={(event) => setAnnual(event.target.checked)} /><span className="toggle-ui" aria-hidden="true"><i /></span><span>{annual ? "Annual" : "Monthly"}</span></label>
          <div className="pricing-grid">
            <article className="plan reveal"><span className="eyebrow">Begin</span><div className="plan-price"><strong>{formatPrice(0)}</strong><span>/Month</span></div><p>Purus est efficitur laoreet mauris pharetra vestibulum fusce.</p><ul>{featureBullets.slice(0, 3).map((item) => <li key={item}><Check />{item}</li>)}</ul><button className="button button-dark" onClick={() => scrollTo("contact")}>Get exyr.io Free</button></article>
            <article className="plan plan-featured reveal"><span className="eyebrow">Pro</span><div className="plan-price"><strong>{formatPrice(price)}</strong><span>/Month</span></div><p>Purus est efficitur laoreet mauris pharetra vestibulum fusce.</p><ul>{featureBullets.map((item) => <li key={item}><Check />{item}</li>)}</ul><button className="button button-dark" onClick={() => scrollTo("contact")}>Get Started</button></article>
          </div>
        </section>

        <section id="contact" className="contact page-shell section-space">
          <div className="contact-rings" aria-hidden="true" />
          <div className="contact-copy reveal"><span className="eyebrow">Arcu Dignissim Velit</span><h2>Suspendisse Aliquet Nisi Sodales Consequat Magna Ante Condimentum</h2><p>Nullam volutpat porttitor ullamcorper rutrum gravida cras.</p><form onSubmit={handleSubmit} noValidate><label htmlFor="contact-email">Work email</label><div className="email-row"><input id="contact-email" type="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} aria-describedby="contact-message" /><button className="button button-dark" type="submit">Get access <ArrowRight /></button></div><p id="contact-message" className="form-message" aria-live="polite">{message || "email: support@exyr.io"}</p></form></div>
        </section>
      </main>

      <footer className="site-footer page-shell"><BrandMark /><p>© 2026 exyr.io. All rights reserved.</p><nav aria-label="Footer navigation"><button onClick={() => scrollTo("products")}>Products</button><button onClick={() => scrollTo("pricing")}>Pricing</button><button onClick={() => scrollTo("contact")}>Contact</button></nav></footer>
    </>
  );
}
