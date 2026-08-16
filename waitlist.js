import { APP_NAME, WAITLIST_URL } from "./constants.js";

export async function submitWaitlist(email) {
  const params = new URLSearchParams({
    email: email.trim(),
    app_name: APP_NAME,
    timestamp: new Date().toISOString(),
  });

  const response = await fetch(`${WAITLIST_URL}?${params}`, {
    method: "GET",
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error || "Waitlist submission failed");
  }
}
