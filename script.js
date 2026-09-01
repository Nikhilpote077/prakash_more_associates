// Prakash More & Associates — Site-wide interactions
// Shared across every page: header/nav, mobile menu, scroll-to-top,
// sticky header shrink, and contact form handling.

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header");
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.querySelector(".nav-links");
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  const contactForm = document.getElementById("contactForm");

  // --- Day / Night (Light / Dark) Theme Toggle ---
  const themeToggle = document.getElementById("themeToggle");
  const THEME_KEY = "pma-theme";

  const applyTheme = (theme) => {
    if (theme === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  };

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isLight =
        document.documentElement.getAttribute("data-theme") === "light";
      const next = isLight ? "dark" : "light";
      applyTheme(next);
      localStorage.setItem(THEME_KEY, next);
    });
  }

  // --- Mobile Navigation ---
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isActive = menuToggle.classList.toggle("active");
      navLinks.classList.toggle("active");
      document.body.classList.toggle("no-scroll");
      menuToggle.setAttribute("aria-expanded", String(isActive));
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.classList.remove("active");
        navLinks.classList.remove("active");
        document.body.classList.remove("no-scroll");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // --- Sticky Header Shrink + Scroll-to-Top Visibility ---
  const onScroll = () => {
    if (header) {
      if (window.scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }
    if (scrollTopBtn) {
      scrollTopBtn.classList.toggle("visible", window.scrollY > 300);
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // --- Portfolio Filtering ---
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll("#projectsGrid .project-card");
  const noResultsMsg = document.getElementById("noResultsMsg");

  if (filterBtns.length && projectCards.length) {
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.dataset.filter;
        let visibleCount = 0;

        projectCards.forEach((card) => {
          const match = filter === "all" || card.dataset.category === filter;
          card.hidden = !match;
          if (match) visibleCount++;
        });

        if (noResultsMsg) {
          noResultsMsg.style.display = visibleCount === 0 ? "block" : "none";
        }
      });
    });
  }

  // --- Lightbox Gallery (Portfolio page) ---
  const lightbox = document.getElementById("lightbox");
  if (lightbox && window.projectGalleries) {
    const lightboxImg = document.getElementById("lightboxImg");
    const lightboxCaption = document.getElementById("lightboxCaption");
    const closeBtn = document.getElementById("lightboxClose");
    const prevBtn = document.getElementById("lightboxPrev");
    const nextBtn = document.getElementById("lightboxNext");

    let currentGallery = [];
    let currentIndex = 0;

    const showImage = (index) => {
      if (!currentGallery.length) return;
      currentIndex = (index + currentGallery.length) % currentGallery.length;
      const item = currentGallery[currentIndex];
      lightboxImg.src = item.src;
      lightboxImg.alt = item.caption || "";
      lightboxCaption.textContent = item.caption || "";
    };

    const openLightbox = (gallerySlug) => {
      currentGallery = window.projectGalleries[gallerySlug] || [];
      if (!currentGallery.length) return;
      showImage(0);
      lightbox.hidden = false;
      document.body.classList.add("no-scroll");
    };

    const closeLightbox = () => {
      lightbox.hidden = true;
      document.body.classList.remove("no-scroll");
    };

    document.querySelectorAll(".project-card[data-gallery]").forEach((card) => {
      card.style.cursor = "pointer";
      card.addEventListener("click", () => openLightbox(card.dataset.gallery));
    });

    closeBtn?.addEventListener("click", closeLightbox);
    prevBtn?.addEventListener("click", () => showImage(currentIndex - 1));
    nextBtn?.addEventListener("click", () => showImage(currentIndex + 1));

    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", (e) => {
      if (lightbox.hidden) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showImage(currentIndex - 1);
      if (e.key === "ArrowRight") showImage(currentIndex + 1);
    });
  }

  // --- Contact Form (Netlify Forms handles the actual submission via
  //     native POST; this just gives the user a friendly confirmation
  //     when JS is available and the request succeeds). ---
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      // Let Netlify Forms process the POST normally if action isn't
      // overridden; only intercept to show inline confirmation.
      const formStatus = document.getElementById("formStatus");
      if (!formStatus) return; // no custom UI present, allow default submit

      // Netlify Forms only works when served by Netlify (http/https).
      // Opening the file directly (file://) can never submit successfully,
      // so skip the AJAX intercept and let the browser show its own
      // (also failing) native submit rather than an unhandled fetch error.
      if (window.location.protocol === "file:") {
        e.preventDefault();
        formStatus.textContent =
          "Forms only work on the live deployed site, not when opened as a local file.";
        formStatus.classList.add("visible", "error");
        return;
      }

      e.preventDefault();
      const data = new FormData(contactForm);

      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data).toString(),
      })
        .then(() => {
          formStatus.textContent =
            "Thank you for your enquiry. We will contact you shortly!";
          formStatus.classList.add("visible", "success");
          formStatus.setAttribute("role", "status");
          contactForm.reset();
        })
        .catch(() => {
          formStatus.textContent =
            "Something went wrong. Please call or WhatsApp us directly.";
          formStatus.classList.add("visible", "error");
          formStatus.setAttribute("role", "alert");
        });
    });
  }
});
window.addEventListener("load", () => {
  const loader = document.getElementById("pageLoader");
  if (loader) {
    setTimeout(() => loader.classList.add("loaded"), 300);
  }
});
