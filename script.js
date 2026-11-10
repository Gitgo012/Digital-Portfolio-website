const ASSISTANT_URL = "https://meet-yash.vercel.app/";

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector("#nav-links");

menuToggle?.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", isExpanded ? "Open navigation" : "Close navigation");
  navLinks?.classList.toggle("is-open", !isExpanded);
});

navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Open navigation");
  });
});

const assistantDialog = document.querySelector(".assistant-dialog");
const assistantFrame = document.querySelector(".assistant-frame");
const assistantClose = document.querySelector(".dialog-close");

document.querySelectorAll(".open-assistant").forEach((button) => {
  button.addEventListener("click", () => {
    if (!assistantDialog || !assistantFrame) return;

    if (!assistantFrame.src) {
      assistantFrame.src = ASSISTANT_URL;
    }

    assistantDialog.showModal();
  });
});

assistantClose?.addEventListener("click", () => assistantDialog?.close());

assistantDialog?.addEventListener("click", (event) => {
  if (event.target === assistantDialog) {
    assistantDialog.close();
  }
});

const year = document.querySelector("#current-year");
if (year) {
  year.textContent = String(new Date().getFullYear());
}

const contactForm = document.querySelector(".contact-form");
const formStatus = document.querySelector(".form-status");
const emailJsConfig = {
  publicKey: "5TTg8wPJce3GKqd5P",
  serviceId: "service_whgel8x",
  templateId: "template_uo67t4x",
};

if (window.emailjs) {
  window.emailjs.init(emailJsConfig.publicKey);
}

contactForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!formStatus || !(contactForm instanceof HTMLFormElement)) return;

  const submitButton = contactForm.querySelector('button[type="submit"]');
  if (!(submitButton instanceof HTMLButtonElement)) return;

  if (!window.emailjs) {
    formStatus.textContent =
      "The contact form could not load. Please email me directly at yashkuletha05@gmail.com.";
    formStatus.classList.add("is-error");
    return;
  }

  const formData = new FormData(contactForm);
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const subject = String(formData.get("subject") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const originalLabel = submitButton.innerHTML;

  submitButton.disabled = true;
  submitButton.textContent = "Sending...";
  formStatus.classList.remove("is-error");
  formStatus.textContent = "Sending your message...";

  try {
    await window.emailjs.send(emailJsConfig.serviceId, emailJsConfig.templateId, {
      from_name: name,
      from_email: email,
      subject,
      message,
      to_email: "yashkuletha05@gmail.com",
    });

    contactForm.reset();
    formStatus.textContent = "Thanks for reaching out. I'll get back to you soon.";
  } catch {
    formStatus.classList.add("is-error");
    formStatus.textContent =
      "Your message couldn't be sent. Please email me directly at yashkuletha05@gmail.com.";
  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = originalLabel;
  }
});
