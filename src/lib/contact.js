const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactEmail(value) {
  const email = value.trim();
  if (!email) return { ok: false, error: "Enter your work email." };
  if (!emailPattern.test(email)) return { ok: false, error: "Enter a valid email address." };
  return { ok: true, email };
}

export function buildContactMailto(email) {
  const subject = encodeURIComponent("Exyr early access");
  const body = encodeURIComponent(`Please add ${email} to the Exyr early-access list.`);
  return `mailto:support@exyr.io?subject=${subject}&body=${body}`;
}
