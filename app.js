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

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = new FormData(form).get("email");
  const key = "riglet-waitlist";
  const existing = JSON.parse(localStorage.getItem(key) || "[]");
  if (!existing.includes(email)) existing.push(email);
  localStorage.setItem(key, JSON.stringify(existing));
  formMsg.hidden = false;
  formMsg.textContent = "Saved on this machine. We’ll use this list when builds ship.";
  form.reset();
});
