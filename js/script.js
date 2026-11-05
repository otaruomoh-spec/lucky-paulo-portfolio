document.addEventListener("DOMContentLoaded", () => {

  // Remove loading screen
  const loader = document.getElementById("loader");

  if (loader) {
    setTimeout(() => {
      loader.classList.add("hidden");
    }, 1000);
  }

  // Reveal animations
  const sections = document.querySelectorAll(
    ".about, #skills, #projects, #contact"
  );

  sections.forEach(section => {
    section.classList.add("reveal");
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  });

  sections.forEach(section => observer.observe(section));
  // Animated statistics counters
  const counters = document.querySelectorAll(".hero-stats strong");

  counters.forEach(counter => {
    const original = counter.textContent.trim();

    if (original.includes("∞")) return;

    const target = parseInt(original.replace(/\D/g, ""), 10);

    if (isNaN(target)) return;

    let current = 0;
    const duration = 1200;
    const increment = Math.max(1, Math.ceil(target / (duration / 30)));

    counter.textContent = "0";

    const timer = setInterval(() => {
      current = Math.min(current + increment, target);
      counter.textContent = current.toString().padStart(2, "0") + "+";

      if (current >= target) {
        clearInterval(timer);
      }
    }, 30);
  });
  // Mobile navigation
  const menuToggle = document.getElementById("menuToggle");
  const navigation = document.getElementById("navigation");

  if (menuToggle && navigation) {
    menuToggle.addEventListener("click", () => {
      navigation.classList.toggle("active");
    });
  }

});
// MATRIX BINARY ANIMATION
const canvas = document.getElementById("matrix");

if (canvas) {
  const ctx = canvas.getContext("2d");

  const characters = "010101010101";
  let fontSize = 14;
  let drops = [];

  function resizeMatrix() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const columns = Math.floor(canvas.width / fontSize);
    drops = Array(columns).fill(1);
  }

  function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#00ff88";
    ctx.font = fontSize + "px monospace";

    drops.forEach((y, i) => {
      const char = characters[Math.floor(Math.random() * characters.length)];

      ctx.fillText(char, i * fontSize, y * fontSize);

      if (y * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }

      drops[i]++;
    });
  }

  resizeMatrix();
  window.addEventListener("resize", resizeMatrix);
  setInterval(drawMatrix, 45);
}