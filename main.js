// ========== PRELOADER ==========
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  setTimeout(() => {
    preloader.classList.add("hide");
  }, 500);
});

// ========== NAVBAR SCROLL EFFECT ==========
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// ========== MOBILE MENU ==========
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const mobileClose = document.getElementById("mobileClose");
const mobileLinks = document.querySelectorAll(".mobile-link");

// Open mobile menu
menuBtn.addEventListener("click", () => {
  mobileMenu.classList.add("active");
  document.body.style.overflow = "hidden";
});

// Close mobile menu
mobileClose.addEventListener("click", () => {
  mobileMenu.classList.remove("active");
  document.body.style.overflow = "auto";
});

// Close menu when clicking a link
mobileLinks.forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
    document.body.style.overflow = "auto";
  });
});

// Close menu when clicking outside
mobileMenu.addEventListener("click", (e) => {
  if (e.target === mobileMenu) {
    mobileMenu.classList.remove("active");
    document.body.style.overflow = "auto";
  }
});

// ========== TYPING EFFECT ==========
const typedTextElement = document.querySelector(".typed-text");
const textArray = [
  "Frontend Developer",
  "React & Next.js Developer",
  "UI/UX Enthusiast",
  "Problem Solver"
];
let textArrayIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;
let erasingDelay = 50;
let newTextDelay = 2000;

function type() {
  if (!typedTextElement) return;

  const currentText = textArray[textArrayIndex];

  if (isDeleting) {
    typedTextElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
    typingDelay = erasingDelay;
  } else {
    typedTextElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
    typingDelay = 100;
  }

  if (!isDeleting && charIndex === currentText.length) {
    // Pause at end
    typingDelay = newTextDelay;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textArrayIndex = (textArrayIndex + 1) % textArray.length;
    typingDelay = 500;
  }

  setTimeout(type, typingDelay);
}

// Start typing effect when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  if (textArray.length) {
    setTimeout(type, 1000);
  }
});

// ========== CIRCULAR SKILLS ANIMATION ==========
const skillCircles = document.querySelectorAll(".circle-wrapper");
let skillsAnimated = false;

function animateSkills() {
  skillCircles.forEach((wrapper) => {
    const percent = parseInt(wrapper.getAttribute("data-percent"));
    const progressCircle = wrapper.querySelector(".circle-progress");
    

    const circumference = 377;
    const offset = circumference - (percent / 100) * circumference;
    
    progressCircle.style.strokeDashoffset = offset;
  });
  skillsAnimated = true;
}

// Animate when skills section is in viewport
function checkSkillsInView() {
  if (skillsAnimated) return;
  
  const skillsSection = document.getElementById("circleSkills");
  if (!skillsSection) return;
  
  const rect = skillsSection.getBoundingClientRect();
  const isInView = rect.top < window.innerHeight - 100;
  
  if (isInView) {
    animateSkills();
  }
}

window.addEventListener("scroll", checkSkillsInView);
window.addEventListener("load", checkSkillsInView);

// ========== SCROLL TO TOP BUTTON ==========
const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    
    // Skip if it's just "#"
    if (href === "#") {
      e.preventDefault();
      return;
    }
    
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  });
});

// ========== FORM VALIDATION (OPTIONAL) ==========
const contactForm = document.querySelector('form[name="contact"]');

if (contactForm) {
  contactForm.addEventListener("submit", function(e) {
    const name = this.querySelector('input[name="name"]').value.trim();
    const email = this.querySelector('input[name="email"]').value.trim();
    const message = this.querySelector('textarea[name="message"]').value.trim();
    
    if (!name || !email || !message) {
      e.preventDefault();
      alert("Please fill in all fields before submitting.");
      return false;
    }
    
    // Basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      e.preventDefault();
      alert("Please enter a valid email address.");
      return false;
    }
  });
}

// ========== INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS (OPTIONAL) ==========
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe cards for fade-in effect (optional enhancement)
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".service-card, .project-card, .resume-card");
  
  cards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
  });
});

// ========== ACTIVE NAV LINK ON SCROLL ==========
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

function setActiveNavLink() {
  let current = "";
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.pageYOffset >= sectionTop - 100) {
      current = section.getAttribute("id");
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", setActiveNavLink);

// ========== CONSOLE MESSAGE ==========
console.log("%c Hello! Thanks for checking out my portfolio!", "color: #10b981; font-size: 16px; font-weight: bold;");
console.log("%cBuilt with  by Ibrahim Lawal", "color: #6b7280; font-size: 12px;");