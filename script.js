document.addEventListener("DOMContentLoaded", function () {
  const counters = document.querySelectorAll('.counter');

  counters.forEach(counter => {
    counter.innerText = '0';

    const updateCounter = () => {
      const target = +counter.getAttribute('data-target');
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
});
window.addEventListener("load", function () {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.classList.add("hide");
  }
});
/* ===== BOOKING MODAL + WHATSAPP ===== */

const bookingModal = document.getElementById("bookingModal");
const openModalButtons = document.querySelectorAll(".open-modal");
const closeModalButton = document.querySelector(".close-btn");
const bookingForm = document.getElementById("bookingForm");

/* Open Modal */
openModalButtons.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    if (bookingModal) {
      bookingModal.style.display = "block";
    }
  });
});

/* Close Button */
if (closeModalButton) {
  closeModalButton.addEventListener("click", function () {
    bookingModal.style.display = "none";
  });
}

/* Click Outside Close */
window.addEventListener("click", function (e) {
  if (e.target === bookingModal) {
    bookingModal.style.display = "none";
  }
});

/* WhatsApp Send */
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