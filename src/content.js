export const productContent = {
  sections: ["top", "products", "resources", "network", "use-cases", "faq", "pricing", "contact", "privacy", "terms"],
  actions: [
    { label: "See how it works", target: "products" },
    { label: "Join the beta", target: "contact" },
    { label: "Explore use cases", target: "use-cases" },
    { label: "Choose Free", target: "contact" },
    { label: "Choose Pro", target: "contact" },
  ],
  hero: {
    eyebrow: "Private access, without the network maze",
    title: "Reach every device. Keep every connection private.",
    text: "Exyr gives small teams one calm place to connect to devices, services, and development environments — without exposing them to the public internet.",
    primary: "Join the beta",
    secondary: "See how it works",
  },
  trust: {
    lead: "Built for teams that want less network overhead and more control.",
    ecosystem: "Teams Exyr is being designed for",
  },
  product: {
    title: "Private access that follows your team",
    text: "Approve a device once, see what is connected, and reach the services you need from desktop or mobile. Exyr keeps the setup understandable as your environment grows.",
  },
  resources: {
    eyebrow: "Planned beta capabilities",
    title: "The essentials for a private, dependable workspace",
    text: "Give people the access they need, keep everything else closed, and understand connection health at a glance.",
    cards: [
      { title: "Simple device access", text: "Add a device, approve the connection, and reach it from your private Exyr workspace." },
      { title: "Clear access boundaries", text: "Keep internal tools private and decide which teammates can reach each resource." },
      { title: "Visible connection health", text: "See connected devices, location, latency, and recent activity without digging through network tools." },
    ],
  },
  network: {
    eyebrow: "One view across your environment",
    title: "Connect wherever the work lives",
    text: "Bring laptops, home labs, cloud workloads, and internal services into one private workspace. Exyr helps you stay close to every resource without opening public ports.",
  },
  useCases: {
    eyebrow: "Illustrative product preview",
    title: "A simpler path to the systems your team depends on",
    text: "Use Exyr for remote development, private dashboards, device support, and the services that should never be left open to the web.",
    locationsTitle: "Know where connections are coming from",
    locationsText: "Review active routes and latency before they slow the team down.",
    trafficTitle: "Keep workspace activity visible",
    trafficText: "Move between device and session previews to understand what is ready and active.",
    statusTitle: "See when every device is ready",
    statusText: "Connection state stays visible, so people know when they can get to work.",
    tags: ["Remote development", "Private dashboards", "Device support", "Home lab access"],
  },
  pricing: {
    eyebrow: "Planned beta pricing",
    title: "Straightforward plans for private access",
    text: "Join the beta on Free, then move to Pro when your team needs more devices and shared access.",
    free: {
      name: "Free",
      description: "For personal projects and a small private setup.",
      bullets: ["Personal device access", "One private workspace", "Connection overview"],
    },
    pro: {
      name: "Pro",
      description: "For teams that share devices, services, and environments.",
      bullets: ["Everything in Free", "Shared team workspace", "Session overview", "Priority beta feedback"],
    },
  },
  faq: {
    eyebrow: "Questions, answered",
    title: "What to know before joining the beta",
    items: [
      { question: "What is Exyr?", answer: "Exyr is a private connectivity workspace for reaching approved devices and internal services from desktop or mobile." },
      { question: "Do I need to open ports to the internet?", answer: "Exyr is designed to avoid exposing internal services through public ports. Exact technical details will be shared with beta participants before installation." },
      { question: "Which platforms will the beta support?", answer: "The first beta is planned for macOS and Android, with additional platform support guided by participant feedback." },
      { question: "Is the beta a finished commercial service?", answer: "Not yet. This page collects early-access requests while the product, documentation, and support process are being prepared." },
    ],
  },
  contact: {
    eyebrow: "Early access",
    title: "Help shape a calmer way to connect",
    text: "Choose a plan, enter your work email, and we will prepare a request you can review before sending. No silent signup and no surprise subscription.",
    helper: "Your email app will open with a prepared request to support@exyr.io.",
  },
  legal: {
    privacyTitle: "Privacy",
    privacy: "This preview does not store form data, set advertising cookies, or run third-party analytics. Submitting the form opens your own email app; you decide whether to send the message.",
    termsTitle: "Beta terms",
    terms: "Exyr is presented as an early-access product concept. Features, platform support, pricing, and availability may change before a commercial release.",
  },
};
