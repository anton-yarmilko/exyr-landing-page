import { useEffect, useMemo, useRef, useState } from "react";
import {
  AppleLogo,
  ArrowRight,
  Cloud,
  Check,
  Database,
  DesktopTower,
  DeviceMobile,
  Fingerprint,
  GooglePlayLogo,
  HardDrives,
  Key,
  List,
  Scan,
  ShieldCheck,
  Sparkle,
  TerminalWindow,
  WifiHigh,
  X,
} from "@phosphor-icons/react";
import { formatPrice, getPlanPrice } from "./lib/pricing.js";
import { buildContactMailto, validateContactEmail } from "./lib/contact.js";
import { productContent } from "./content.js";

const integrations = [
  { icon: DesktopTower, label: "Desktop device", className: "orbit-one" },
  { icon: Cloud, label: "Cloud workspace", className: "orbit-two" },
  { icon: TerminalWindow, label: "Development environment", className: "orbit-three" },
  { icon: DeviceMobile, label: "Mobile device", className: "orbit-four" },
  { icon: Database, label: "Private service", className: "orbit-five" },
  { icon: HardDrives, label: "Home lab", className: "orbit-six" },
  { icon: WifiHigh, label: "Private connection", className: "orbit-seven" },
];

const clientLabels = ["Developers", "IT teams", "Operators", "Studios", "Distributed teams"];

const resources = [
  { icon: Key },
  { icon: ShieldCheck },
  { icon: Fingerprint },
];

function BrandMark({ compact = false }) {
  return (
    <span className={`brand ${compact ? "brand-compact" : ""}`}>
      <span className="brand-icon" aria-hidden="true"><Scan size={23} weight="bold" /></span>
      <span>exyr.io</span>
    </span>
  );
}

function StoreBadge({ store, onSelect }) {
  const isGoogle = store === "Google Play";
  return (
    <button className="store-badge" type="button" onClick={() => onSelect(store)} aria-label={`Request Exyr early access for ${isGoogle ? "Android" : "macOS"}`}>
      {isGoogle ? <GooglePlayLogo weight="fill" /> : <AppleLogo weight="fill" />}
      <span>
        <small>Join the beta for</small>
        <strong>{isGoogle ? "Android" : "macOS"}</strong>
      </span>
    </button>
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
  const [selectedPlan, setSelectedPlan] = useState("Free");
  const [metricMode, setMetricMode] = useState("Devices");
  const [loaded, setLoaded] = useState(false);
  const menuButtonRef = useRef(null);
  const emailRef = useRef(null);

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

  useEffect(() => {
    if (!menuOpen) return undefined;
    const closeOnEscape = (event) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      window.setTimeout(() => menuButtonRef.current?.focus(), 0);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  const price = useMemo(() => getPlanPrice({ annual }), [annual]);

  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const result = validateContactEmail(email);
    if (!result.ok) {
      setMessage(result.error);
      emailRef.current?.focus();
      return;
    }
    setMessage("Opening your email app — review the message before sending.");
    window.location.href = buildContactMailto(result.email, selectedPlan);
  }

  function chooseAccess(option) {
    setSelectedPlan(option === "Pro" ? "Pro" : "Free");
    setMessage("");
    if (window.location.hash !== "#contact") window.history.pushState(null, "", "#contact");
    scrollTo("contact");
  }

  return (
    <>
      <AppLoader finished={loaded} />
      <div className="site-frame" inert={!loaded} aria-hidden={!loaded}>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header" data-testid="site-header">
        <div className="header-inner">
          <a className="brand-button" href="#top" aria-label="Go to top"><BrandMark /></a>
          <nav className="desktop-nav" aria-label="Primary navigation">
            <a href="#products">Product</a>
            <a href="#resources">Features</a>
            <a href="#use-cases">Use Cases</a>
            <a href="#pricing">Pricing</a>
            <a className="button button-dark button-small" href="#contact">Join Beta</a>
          </nav>
          <button ref={menuButtonRef} className="menu-toggle" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((value) => !value)}>
            {menuOpen ? <X /> : <List />}
          </button>
        </div>
        <nav id="mobile-navigation" className={`mobile-nav ${menuOpen ? "is-open" : ""}`} aria-label="Mobile navigation" aria-hidden={!menuOpen} inert={!menuOpen}>
          {["products", "resources", "use-cases", "faq", "pricing", "contact"].map((item) => (
            <a key={item} href={`#${item}`} onClick={() => setMenuOpen(false)}>{item.replace("-", " ")}</a>
          ))}
        </nav>
      </header>

      <main id="main-content">
        <section id="top" className="hero page-shell" aria-labelledby="hero-title">
          <div className="store-row reveal"><StoreBadge store="Google Play" onSelect={() => chooseAccess("Free")} /><StoreBadge store="Mac App Store" onSelect={() => chooseAccess("Free")} /></div>
          <div className="hero-panel reveal">
            <div className="hero-copy">
              <span className="eyebrow">{productContent.hero.eyebrow}</span>
              <h1 id="hero-title">Reach every device.<br />{" "}Keep every connection private.</h1>
              <p>{productContent.hero.text}</p>
              <div className="button-row">
                <button className="button button-dark" onClick={() => chooseAccess("Free")}>{productContent.hero.primary}</button>
                <a className="button button-light" href="#products">{productContent.hero.secondary}</a>
              </div>
            </div>
            <div className="orbit-stage" aria-label="Infrastructure ecosystem preview">
              {integrations.map(({ icon: Icon, label, className }) => (
                <span className={`orbit-badge ${className}`} key={label} title={label}><Icon size={19} weight="duotone" aria-hidden="true" /></span>
              ))}
            </div>
          </div>
          <div className="social-proof reveal">
            <div className="trust-line"><ShieldCheck size={22} weight="duotone" /> Private by design</div>
            <p>{productContent.trust.lead}</p>
            <div className="client-row" aria-label={productContent.trust.ecosystem}>
              {clientLabels.map((label) => <span key={label}>{label}</span>)}
            </div>
          </div>
        </section>

        <section id="products" className="product-section page-shell section-space">
          <div className="product-visual reveal"><img src="/assets/exyr-phone-pair-original.png" alt="Illustrative Exyr mobile workspace shown in light and dark modes" width="760" height="380" /></div>
          <div className="product-bottom reveal">
            <div><h2>{productContent.product.title}</h2><p>{productContent.product.text}</p></div>
            <div className="store-row"><StoreBadge store="Google Play" onSelect={() => chooseAccess("Free")} /><StoreBadge store="Mac App Store" onSelect={() => chooseAccess("Free")} /></div>
          </div>
        </section>

        <section id="resources" className="page-shell section-space">
          <SectionIntro eyebrow={productContent.resources.eyebrow} title={productContent.resources.title} text={productContent.resources.text} />
          <div className="resource-grid">
            {resources.map(({ icon: Icon }, index) => {
              const item = productContent.resources.cards[index];
              return (
              <article className={`resource-card reveal reveal-delay-${index}`} key={item.title}>
                <div className="resource-art"><Icon size={34} weight="duotone" /></div>
                <div className="resource-body"><h3>{item.title}</h3><p>{item.text}</p><a className="text-link" href="#use-cases" aria-label={`Explore ${item.title} use case`}>Explore use case <ArrowRight /></a></div>
              </article>
              );
            })}
          </div>
        </section>

        <section id="network" className="page-shell section-space reveal">
          <div className="map-panel">
            <img src="/assets/exyr-network-map.png" alt="Abstract global connection map" />
            <div className="map-copy">
              <span className="eyebrow">{productContent.network.eyebrow}</span>
              <h2>{productContent.network.title}</h2>
              <p>{productContent.network.text}</p>
              <div className="button-row"><button className="button button-dark" onClick={() => chooseAccess("Free")}>Join the beta</button><a className="button button-light" href="#resources">See features</a></div>
            </div>
          </div>
        </section>

        <section id="use-cases" className="use-cases page-shell section-space">
          <SectionIntro eyebrow={productContent.useCases.eyebrow} title={productContent.useCases.title} text={productContent.useCases.text} />
          <div className="dashboard reveal">
            <article className="status-card server-card"><div className="card-heading"><span>Home desktop</span><strong>Ready</strong></div><small>Personal device</small><div className="card-heading muted-line"><span>Development server</span><strong>Available</strong></div><small>Cloud workspace</small><h3>{productContent.useCases.locationsTitle}</h3><p>{productContent.useCases.locationsText}</p></article>
            <article className="status-card traffic-card"><div className="tabs" role="tablist" aria-label="Workspace preview"><button id="devices-tab" role="tab" aria-controls="workspace-metric-panel" aria-selected={metricMode === "Devices"} className={metricMode === "Devices" ? "active" : ""} type="button" onClick={() => setMetricMode("Devices")}>Devices</button><button id="sessions-tab" role="tab" aria-controls="workspace-metric-panel" aria-selected={metricMode === "Sessions"} className={metricMode === "Sessions" ? "active" : ""} type="button" onClick={() => setMetricMode("Sessions")}>Sessions</button></div><div id="workspace-metric-panel" role="tabpanel" aria-labelledby={metricMode === "Devices" ? "devices-tab" : "sessions-tab"}><div className={`traffic-lines ${metricMode.toLowerCase()}`} aria-hidden="true"><i /><i /><i /></div><h3>{productContent.useCases.trafficTitle}</h3><p>{metricMode === "Devices" ? productContent.useCases.trafficText : "Review active workspace sessions and close the ones you no longer need."}</p></div></article>
            <article className="status-card connected-card"><span className="pulse"><Sparkle weight="fill" /></span><div><h3>{productContent.useCases.statusTitle}</h3><p>{productContent.useCases.statusText}</p></div></article>
          </div>
          <div className="tag-marquee" aria-label="Use cases"><div>{[...Array(2)].flatMap(() => productContent.useCases.tags).map((tag, index) => <span key={`${tag}-${index}`}>{tag}</span>)}</div></div>
        </section>

        <section id="faq" className="faq page-shell section-space">
          <SectionIntro eyebrow={productContent.faq.eyebrow} title={productContent.faq.title} />
          <div className="faq-list reveal">
            {productContent.faq.items.map((item) => <details key={item.question}><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}
          </div>
        </section>

        <section id="pricing" className="pricing page-shell section-space">
          <SectionIntro eyebrow={productContent.pricing.eyebrow} title={productContent.pricing.title} text={productContent.pricing.text} />
          <label className="billing-toggle"><input type="checkbox" checked={annual} onChange={(event) => setAnnual(event.target.checked)} /><span className="toggle-ui" aria-hidden="true"><i /></span><span>{annual ? "Annual" : "Monthly"}</span></label>
          <p className="billing-note">{annual ? "$12 per month, billed as $144 annually. Planned beta pricing." : "$15 billed monthly. Planned beta pricing."}</p>
          <div className="pricing-grid">
            <article className="plan reveal"><span className="eyebrow">{productContent.pricing.free.name}</span><div className="plan-price"><strong>{formatPrice(0)}</strong><span>/month</span></div><p>{productContent.pricing.free.description}</p><ul>{productContent.pricing.free.bullets.map((item) => <li key={item}><Check />{item}</li>)}</ul><button className="button button-dark" onClick={() => chooseAccess("Free")}>Choose Free</button></article>
            <article className="plan plan-featured reveal"><span className="eyebrow">{productContent.pricing.pro.name}</span><div className="plan-price"><strong>{formatPrice(price)}</strong><span>/month</span></div><p>{productContent.pricing.pro.description}</p><ul>{productContent.pricing.pro.bullets.map((item) => <li key={item}><Check />{item}</li>)}</ul><button className="button button-dark" onClick={() => chooseAccess("Pro")}>Choose Pro</button></article>
          </div>
        </section>

        <section id="contact" className="contact page-shell section-space">
          <div className="contact-rings" aria-hidden="true" />
          <div className="contact-copy reveal"><span className="eyebrow">{productContent.contact.eyebrow}</span><h2>{productContent.contact.title}</h2><p>{productContent.contact.text}</p><form onSubmit={handleSubmit} noValidate><fieldset><legend>Plan</legend><label className={selectedPlan === "Free" ? "selected" : ""}><input type="radio" name="plan" value="Free" checked={selectedPlan === "Free"} onChange={() => setSelectedPlan("Free")} />Free</label><label className={selectedPlan === "Pro" ? "selected" : ""}><input type="radio" name="plan" value="Pro" checked={selectedPlan === "Pro"} onChange={() => setSelectedPlan("Pro")} />Pro</label></fieldset><label className="sr-only" htmlFor="contact-email">Work email</label><div className="email-row"><input ref={emailRef} id="contact-email" type="email" autoComplete="email" placeholder="you@company.com" value={email} onChange={(event) => { setEmail(event.target.value); if (message) setMessage(""); }} aria-describedby="contact-message" aria-invalid={message.startsWith("Enter")} /><button className="button button-dark" type="submit">Prepare request <ArrowRight /></button></div><p id="contact-message" className="form-message" aria-live="polite">{message || <>Your email app will open with a prepared request. <a href="mailto:support@exyr.io">Email support directly</a>.</>}</p></form></div>
        </section>

        <section className="legal page-shell" aria-label="Legal information">
          <article id="privacy"><h3>{productContent.legal.privacyTitle}</h3><p>{productContent.legal.privacy}</p></article>
          <article id="terms"><h3>{productContent.legal.termsTitle}</h3><p>{productContent.legal.terms}</p></article>
        </section>
      </main>

      <footer className="site-footer page-shell"><a className="brand-button" href="#top" aria-label="Go to top"><BrandMark /></a><p>© {new Date().getFullYear()} exyr.io. Early-access product concept.</p><nav aria-label="Footer navigation"><a href="#products">Product</a><a href="#pricing">Pricing</a><a href="#faq">FAQ</a><a href="#privacy">Privacy</a><a href="#terms">Terms</a></nav></footer>
      </div>
    </>
  );
}
