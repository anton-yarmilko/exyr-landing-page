const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactEmail(value) {
  const email = value.trim();
  if (!email) return { ok: false, error: "Enter your work email." };
  if (!emailPattern.test(email)) return { ok: false, error: "Enter a valid email address." };
  return { ok: true, email };
}

export function buildContactMailto(email, plan = "Free") {
  const safePlan = plan === "Pro" ? "Pro" : "Free";
  const subject = encodeURIComponent(`Exyr portfolio demo — ${safePlan}`);
  const body = encodeURIComponent(`Portfolio inquiry from ${email}. Selected demo plan: ${safePlan}. This is not a beta registration or purchase.`);
  return `mailto:taboopip@gmail.com?subject=${subject}&body=${body}`;
}
