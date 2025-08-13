// EmailJS Configuration
const EMAILJS_CONFIG = {
  PUBLIC_KEY: "5TTg8wPJce3GKqd5P",
  SERVICE_ID: "service_whgel8x",
  TEMPLATE_ID: "template_uo67t4x",
};
// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Navbar background change on scroll (class toggle only; styles via CSS)
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Active navigation link highlighting
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in-up");
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animateElements = document.querySelectorAll(
    ".project-card, .certification-card, .skill-item, .stat"
  );
  animateElements.forEach((el) => observer.observe(el));
});

// Initialize EmailJS
(function () {
  emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
})();

// Form submission handling
const contactForm = document.querySelector(".contact-form form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form data
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const subject = contactForm.querySelector(
      'input[placeholder="Subject"]'
    ).value;
    const message = contactForm.querySelector("textarea").value;

    // Simple validation
    if (!name || !email || !subject || !message) {
      alert("Please fill in all fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    // Update button state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    // Prepare email parameters
    const templateParams = {
      from_name: name,
      from_email: email,
      subject: subject,
      message: message,
      to_email: "yash.kuletha22@st.niituniversity.in", // Your email address
    };

    // Send email using EmailJS
    emailjs
      .send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams
      )
      .then(
        function (response) {
          alert("Thank you for your message! I will get back to you soon.");
          contactForm.reset();
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        },
        function (error) {
          alert(
            "Sorry, there was an error sending your message. Please try again or contact me directly at yash.kuletha22@st.niituniversity.in"
          );
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }
      );
  });
}

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Initialize typing animation when page loads
document.addEventListener("DOMContentLoaded", () => {
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    typeWriter(heroTitle, originalText, 50);
  }
});

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero");
  if (hero) {
    const rate = scrolled * -0.5;
    hero.style.transform = `translateY(${rate}px)`;
  }
});

// Skills animation on hover
document.querySelectorAll(".skill-item").forEach((skill) => {
  skill.addEventListener("mouseenter", () => {
    skill.style.transform = "translateY(-10px) scale(1.05)";
  });

  skill.addEventListener("mouseleave", () => {
    skill.style.transform = "translateY(0) scale(1)";
  });
});

// Project card tilt effect
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform =
      "perspective(1000px) rotateX(0) rotateY(0) translateZ(0)";
  });
});

// Loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// Add loading class to body
document.body.classList.add("loading");

// Preloader (if you want to add one)
const preloader = document.createElement("div");
preloader.className = "preloader";
preloader.innerHTML = `
    <div class="loader">
        <div class="spinner"></div>
        <p>Loading...</p>
    </div>
`;
document.body.appendChild(preloader);

// Remove preloader after page loads
window.addEventListener("load", () => {
  setTimeout(() => {
    preloader.style.opacity = "0";
    setTimeout(() => {
      preloader.remove();
    }, 300);
  }, 1000);
});

// Add CSS for preloader
const preloaderStyles = `
    .preloader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(180deg, #0b1020 0%, #0f172a 100%);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.3s ease;
    }
    
    .loader {
        text-align: center;
        color: white;
    }
    
    .spinner {
        width: 50px;
        height: 50px;
        border: 3px solid rgba(255, 255, 255, 0.3);
        border-top: 3px solid white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 20px;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

// Inject preloader styles
const styleSheet = document.createElement("style");
styleSheet.textContent = preloaderStyles;
document.head.appendChild(styleSheet);

// Back to top button
const backToTopBtn = document.createElement("button");
backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopBtn.className = "back-to-top";
backToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    background: #2563eb;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
`;

document.body.appendChild(backToTopBtn);

// Show/hide back to top button
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopBtn.style.opacity = "1";
    backToTopBtn.style.visibility = "visible";
  } else {
    backToTopBtn.style.opacity = "0";
    backToTopBtn.style.visibility = "hidden";
  }
});

// Back to top functionality
backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Hover effect for back to top button
backToTopBtn.addEventListener("mouseenter", () => {
  backToTopBtn.style.transform = "translateY(-3px)";
  backToTopBtn.style.boxShadow = "0 6px 20px rgba(37, 99, 235, 0.4)";
});

backToTopBtn.addEventListener("mouseleave", () => {
  backToTopBtn.style.transform = "translateY(0)";
  backToTopBtn.style.boxShadow = "0 4px 12px rgba(37, 99, 235, 0.3)";
});

// Theme Toggle Functionality
const themeToggle = document.getElementById("theme-toggle");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

// Function to set theme
function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);

  // Update toggle button state
  if (theme === "dark") {
    themeToggle.setAttribute("aria-label", "Switch to light mode");
  } else {
    themeToggle.setAttribute("aria-label", "Switch to dark mode");
  }
}

// Function to get current theme
function getCurrentTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    return savedTheme;
  }
  return prefersDarkScheme.matches ? "dark" : "light";
}

// Initialize theme
function initializeTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") {
    setTheme(saved);
  } else {
    // respect system preference initially
    setTheme(getCurrentTheme());
  }
}

// Toggle theme
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  setTheme(newTheme);
}

// Event listeners
themeToggle.addEventListener("click", toggleTheme);

// Listen for system theme changes
prefersDarkScheme.addEventListener("change", (e) => {
  if (!localStorage.getItem("theme")) {
    setTheme(e.matches ? "dark" : "light");
  }
});

// Initialize theme on page load
document.addEventListener("DOMContentLoaded", initializeTheme);

// Console welcome message
console.log(
  `
%cWelcome to my Portfolio! 🚀
%c
%cFeel free to explore the code and get in touch if you'd like to collaborate!
%c
%cBuilt with ❤️ using HTML, CSS, and JavaScript
`,
  "color: #2563eb; font-size: 20px; font-weight: bold;",
  "",
  "color: #6b7280; font-size: 14px;",
  "",
  "color: #10b981; font-size: 12px;"
);
