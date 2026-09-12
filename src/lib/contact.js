const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactEmail(value) {
  const email = value.trim();
  if (!email) return { ok: false, error: "Enter your work email." };
  if (!emailPattern.test(email)) return { ok: false, error: "Enter a valid email address." };
  return { ok: true, email };
}

export function buildContactMailto(email, plan = "Free") {
  const safePlan = plan === "Pro" ? "Pro" : "Free";
  const subject = encodeURIComponent(`Exyr ${safePlan} early access`);
  const body = encodeURIComponent(`Please add ${email} to the Exyr ${safePlan} early-access list.`);
  return `mailto:support@exyr.io?subject=${subject}&body=${body}`;
}
