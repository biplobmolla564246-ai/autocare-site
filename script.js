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