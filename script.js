document.addEventListener("DOMContentLoaded", function () {
  const counters = document.querySelectorAll(".counter");

  counters.forEach(counter => {
    counter.innerText = "0";

    const updateCounter = () => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText;
      const increment = target / 80;

      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(updateCounter, 25);
      } else {
        counter.innerText = target;
      }
    };

    updateCounter();
  });

  function revealOnScroll() {
    const reveals = document.querySelectorAll(".reveal");

    reveals.forEach(el => {
      const windowHeight = window.innerHeight;
      const elementTop = el.getBoundingClientRect().top;
      const revealPoint = 100;

      if (elementTop < windowHeight - revealPoint) {
        el.classList.add("active");
      }
    });
  }

  revealOnScroll();
  window.addEventListener("scroll", revealOnScroll);

  /* BOOKING MODAL */
  const bookingModal = document.getElementById("bookingModal");
  const openModalButtons = document.querySelectorAll(".open-modal");
  const closeModalButton = document.querySelector(".close-btn");
  const bookingForm = document.getElementById("bookingForm");

  openModalButtons.forEach(btn => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      if (bookingModal) {
        bookingModal.style.display = "block";
      }
    });
  });

  if (closeModalButton) {
    closeModalButton.addEventListener("click", function () {
      bookingModal.style.display = "none";
    });
  }

  window.addEventListener("click", function (e) {
    if (e.target === bookingModal) {
      bookingModal.style.display = "none";
    }
  });

  if (bookingForm) {
    bookingForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("bookingName").value;
      const phone = document.getElementById("bookingPhone").value;
      const carModel = document.getElementById("bookingCarModel").value;
      const service = document.getElementById("bookingService").value;
      const message = document.getElementById("bookingMessage").value;

      const text =
        "Hello iAutocare,%0A%0A" +
        "New Booking:%0A" +
        "Name: " + name + "%0A" +
        "Phone: " + phone + "%0A" +
        "Car Model: " + carModel + "%0A" +
        "Service: " + service + "%0A" +
        "Message: " + message;

      const whatsappURL = "https://wa.me/8801776126774?text=" + text;
      window.open(whatsappURL, "_blank");

      bookingModal.style.display = "none";
      bookingForm.reset();
    });
  }
});

window.addEventListener("load", function () {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.classList.add("hide");
  }
});

/* ===== PARTS INQUIRY ===== */
function sendPartsToWhatsApp(event) {
  event.preventDefault();

  const getValue = (id) => {
    const field = document.getElementById(id);
    return field ? field.value.trim() : "";
  };

  const name = getValue("partsName");
  const phone = getValue("partsPhone");
  const carModel = getValue("partsCarModel");
  const modelYear = getValue("partsYear");
  const requiredPart = getValue("requiredPart");
  const partNumber = getValue("partNumber");
  const message = getValue("partsMessage");

  const lines = [
    "Hello iAutocare,",
    "",
    "Spare Parts Inquiry",
    "Name: " + name,
    "Phone: " + phone,
    "Car Model: " + carModel,
    modelYear ? "Model Year: " + modelYear : "",
    "Required Part: " + requiredPart,
    partNumber ? "Part Number / Chassis: " + partNumber : "",
    message ? "Details: " + message : ""
  ].filter(Boolean);

  const whatsappURL =
    "https://wa.me/8801776126774?text=" + encodeURIComponent(lines.join("\n"));

  window.open(whatsappURL, "_blank");
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".part-request-btn").forEach(button => {
    button.addEventListener("click", function () {
      const requestedPart = this.getAttribute("data-part") || "";
      const requiredPartInput = document.getElementById("requiredPart");
      const requestForm = document.getElementById("parts-request-form");

      if (requiredPartInput) {
        requiredPartInput.value = requestedPart;
      }

      if (requestForm) {
        requestForm.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
});

/* ===== FINAL MOBILE NAVIGATION ===== */
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".nav-menu-toggle");
  const mobileMenu = document.querySelector(".mobile-nav-dropdown");

  if (!menuToggle || !mobileMenu) return;

  const icon = menuToggle.querySelector("i");

  function setMenu(open) {
    menuToggle.classList.toggle("is-open", open);
    mobileMenu.classList.toggle("is-open", open);
    menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
    menuToggle.setAttribute("aria-label", open ? "Close more navigation" : "Open more navigation");

    if (icon) {
      icon.classList.toggle("fa-bars", !open);
      icon.classList.toggle("fa-xmark", open);
    }
  }

  menuToggle.addEventListener("click", function (event) {
    event.stopPropagation();
    setMenu(!mobileMenu.classList.contains("is-open"));
  });

  mobileMenu.addEventListener("click", function (event) {
    event.stopPropagation();
  });

  mobileMenu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      setMenu(false);
    });
  });

  document.addEventListener("click", function () {
    setMenu(false);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      setMenu(false);
      menuToggle.focus();
    }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      setMenu(false);
    }
  });
});
