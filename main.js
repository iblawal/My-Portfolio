document.addEventListener("DOMContentLoaded", () => {
  const preloader = document.getElementById("preloader");
  const header = document.querySelector("header");
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileClose = document.getElementById("mobileClose");
  const mobileLinks = document.querySelectorAll(".mobile-link");
  const typedTextElement = document.querySelector(".typed-text");
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  const skillCircles = document.querySelectorAll(".circle-wrapper");
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  if (preloader) {
    window.addEventListener("load", () => {
      setTimeout(() => preloader.classList.add("hide"), 500);
    });
  }

  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    });
  }

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  }
  if (mobileClose && mobileMenu) {
    mobileClose.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
      document.body.style.overflow = "auto";
    });
  }
  if (mobileLinks && mobileLinks.length) {
    mobileLinks.forEach(link => {
      link.addEventListener("click", () => {
        if (mobileMenu) mobileMenu.classList.remove("active");
        document.body.style.overflow = "auto";
      });
    });
  }
  if (mobileMenu) {
    mobileMenu.addEventListener("click", (e) => {
      if (e.target === mobileMenu) {
        mobileMenu.classList.remove("active");
        document.body.style.overflow = "auto";
      }
    });
  }

  if (typedTextElement) {
    const textArray = [
      "Frontend Developer",
      "React & Next.js Developer",
      "UI/UX Enthusiast",
      "Problem Solver"
    ];
    let textArrayIndex = 0, charIndex = 0, isDeleting = false;
    let typingDelay = 100, erasingDelay = 50, newTextDelay = 2000;

    function type() {
      const currentText = textArray[textArrayIndex];
      if (isDeleting) {
        typedTextElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typedTextElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
      }

      if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(type, newTextDelay);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textArrayIndex = (textArrayIndex + 1) % textArray.length;
        setTimeout(type, 500);
      } else {
        setTimeout(type, isDeleting ? erasingDelay : typingDelay);
      }
    }
    setTimeout(type, 800);
  }

  let skillsAnimated = false;
  function animateSkills() {
    skillCircles.forEach(wrapper => {
      const percent = parseInt(wrapper.getAttribute("data-percent")) || 0;
      const progressCircle = wrapper.querySelector(".circle-progress");
      if (!progressCircle) return;
      const circumference = progressCircle.getTotalLength ? progressCircle.getTotalLength() : 377;
      const offset = circumference - (percent / 100) * circumference;
      progressCircle.style.strokeDasharray = circumference;
      progressCircle.style.strokeDashoffset = offset;
    });
    skillsAnimated = true;
  }
  function checkSkillsInView() {
    if (skillsAnimated) return;
    const skillsSection = document.getElementById("circleSkills");
    if (!skillsSection) return;
    const rect = skillsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) animateSkills();
  }
  window.addEventListener("scroll", checkSkillsInView);
  window.addEventListener("load", checkSkillsInView);


  if (scrollTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) scrollTopBtn.classList.add("show");
      else scrollTopBtn.classList.remove("show");
    });
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (!href || href === "#") { e.preventDefault(); return; }
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    });
  });

  const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -100px 0px" };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);
  document.querySelectorAll(".service-card, .project-card, .resume-card").forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
  });

  // ---------- ACTIVE NAV LINK ----------
  function setActiveNavLink() {
    let current = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.pageYOffset >= sectionTop - 100) {
        current = section.getAttribute("id");
      }
    });
    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) link.classList.add("active");
    });
  }
  window.addEventListener("scroll", setActiveNavLink);


  console.log("%c Hello! Thanks for checking out my portfolio!", "color: #10b981; font-size: 16px; font-weight: bold;");
  console.log("%cBuilt with  by Ibrahim Lawal", "color: #6b7280; font-size: 12px;");

  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".anim-fade-up", { y: 50, opacity: 0, duration: 1.2, ease: "power3.out" });
    gsap.from(".anim-stagger", { opacity: 0, y: 20, duration: 1, delay: 0.25, stagger: 0.14, ease: "power2.out" });
    gsap.from(".anim-image img", { scale: 0.85, opacity: 0, filter: "blur(8px)", duration: 1.4, ease: "power3.out" });

    gsap.to(".hero", {
      backgroundPosition: "50% 18%",
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: 0.8
      }
    });

    gsap.to(".parallax-layer", {
      y: -40,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: 0.8
      }
    });

    const parallaxEl = document.querySelector(".parallax-layer");
    if (parallaxEl) {
      let lastMove = { x: 0, y: 0 };
      window.addEventListener("mousemove", (e) => {
        const rx = (e.clientX / window.innerWidth - 0.5);
        const ry = (e.clientY / window.innerHeight - 0.5);
        gsap.to(parallaxEl, { x: rx * 20, y: ry * 12, rotation: rx * 2.5, duration: 0.9, ease: "power3.out" });
        gsap.to(".parallax-layer img", { scale: 1 + Math.abs(rx) * 0.03 + Math.abs(ry) * 0.02, duration: 0.9, ease: "power3.out" });
      });
      parallaxEl.addEventListener("mouseleave", () => {
        gsap.to(parallaxEl, { x: 0, y: 0, rotation: 0, duration: 0.9, ease: "power3.out" });
        gsap.to(".parallax-layer img", { scale: 1, duration: 0.9, ease: "power3.out" });
      });
    }
  } else {
    console.warn("GSAP or ScrollTrigger not found — include GSAP CDN before this script.");
  }
}); 
