document.addEventListener("DOMContentLoaded", () => {

  /* ===== ANIMATIONS ===== */
  if ("IntersectionObserver" in window) {
    const animObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
          animObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    document
      .querySelectorAll(".animate-up, .animate-fade, .animate-scale, .animate-zoom")
      .forEach(el => animObserver.observe(el));
  }

  /* ===== MENU ===== */
  const menuToggle = document.querySelector(".menu-toggle");
  const menuPanel  = document.querySelector(".menu-panel");
  const menuOverlay = document.querySelector(".menu-overlay");

  if (menuToggle && menuPanel) {

    menuToggle.addEventListener("click", e => {
      e.preventDefault();
      e.stopPropagation();

      menuPanel.classList.toggle("active");

      if (menuOverlay) {
        menuOverlay.classList.toggle("active");
      }
    });

    document.addEventListener("click", e => {
      if (!menuPanel.contains(e.target) && !menuToggle.contains(e.target)) {

        menuPanel.classList.remove("active");

        if (menuOverlay) {
          menuOverlay.classList.remove("active");
        }
      }
    });

    menuPanel.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {

        menuPanel.classList.remove("active");

        if (menuOverlay) {
          menuOverlay.classList.remove("active");
        }
      });
    });
  }

const slider = document.querySelector(".categories-slider");

if (slider) {

  let isUserInteracting = false;
  let resumeTimeout;

  const speed = 0.5;

  function slide() {

    if (!isUserInteracting) {
      slider.scrollLeft += speed;

      if (slider.scrollLeft >= slider.scrollWidth / 2) {
        slider.scrollLeft = 0;
      }
    }

    requestAnimationFrame(slide);
  }

  slide();

  function pauseAutoScroll() {
    isUserInteracting = true;

    clearTimeout(resumeTimeout);
    resumeTimeout = setTimeout(() => {
      isUserInteracting = false;
    }, 1500);
  }

  slider.addEventListener("mousedown", pauseAutoScroll);
  slider.addEventListener("touchstart", pauseAutoScroll);
}
});document.addEventListener("mousemove", (e) => {
    document.body.style.setProperty("--x", e.clientX + "px");
    document.body.style.setProperty("--y", e.clientY + "px");
});