import { submitWaitlist } from "./waitlist.js";

const region = document.getElementById("region");
const debugUser = document.getElementById("debugUser");
const tax = document.getElementById("tax");
const wire = document.getElementById("wire");
const confirmBtn = document.getElementById("confirmBtn");
const log = document.getElementById("log");
const form = document.getElementById("form");
const formMsg = document.getElementById("formMsg");

function renderWire() {
  const payload = {
    method: "PATCH",
    path: "/v1/cart",
    query: { region: region.value },
    headers: { "X-Debug-User": debugUser.value },
    body: { taxExempt: tax.value === "true" },
  };
  wire.textContent = JSON.stringify(payload, null, 2);
}

[region, debugUser, tax].forEach((el) => el.addEventListener("input", renderWire));
tax.addEventListener("change", renderWire);
renderWire();

confirmBtn.addEventListener("click", () => {
  const wait = log.querySelector(".wait");
  if (wait) {
    wait.className = "ok";
    wait.textContent = "Place order submitted · 201 · captured in HAR";
  }
  confirmBtn.textContent = "Submitted · export as test";
  confirmBtn.disabled = true;
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = String(new FormData(form).get("email") || "");
  const button = form.querySelector('button[type="submit"]');
  formMsg.hidden = true;
  formMsg.classList.remove("is-error");
  button.disabled = true;

  try {
    await submitWaitlist(email);
    formMsg.classList.remove("is-error");
    formMsg.textContent = "You’re on the Riglet waitlist.";
    formMsg.hidden = false;
    form.reset();
  } catch (error) {
    formMsg.classList.add("is-error");
    formMsg.textContent =
      error instanceof Error ? error.message : "Waitlist submission failed";
    formMsg.hidden = false;
  } finally {
    button.disabled = false;
  }
});
