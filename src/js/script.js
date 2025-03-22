window.addEventListener('DOMContentLoaded', () => {
  const toggleMenuBtn = document.querySelector('.nav__toggle');
  const menuIcon = document.querySelector('.menu-icon');
  const nav = document.querySelector('#nav');
  const navMobile = document.querySelector('.nav_mobile');
  const scrollTop = document.querySelector('.btn_top');

  document.addEventListener('scroll', debounce(handleScroll));

  // burgerMenu
  toggleMenuBtn.addEventListener('click', () => {
    menuIcon.classList.toggle('menu-icon_active');
    nav.classList.toggle('nav_mobile');
    document.body.classList.toggle('no-scroll');
  });

  // close mobile menu
  nav.addEventListener('click', e => {
    if (nav.classList.contains('nav_mobile')) {
      const link = e.target.closest('a');
      if (link) {
        nav.classList.remove('nav_mobile');
        menuIcon.classList.remove('menu-icon_active');
        document.body.classList.remove('no-scroll');
      }
    }
  });

  scrollTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });

  // scroll function
  function handleScroll() {
    toggleMenuBtn.classList.toggle('fixed', window.scrollY < 500);
    scrollTop.classList.toggle('none', window.scrollY < 800);
  }

  // debounce helper function
  function debounce(func, timeout = 100) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }

  // Slider
  const swiper = new Swiper('.swiper-container', {
    // Optional parameters
    loop: true,
    initialSlide: 3,
    slidesPerView: 3,
    centeredSlides: true,
    spaceBetween: 30,
    speed: 600,

    // Navigation arrows
    navigation: {
      nextEl: '.slider__nav_next',
      prevEl: '.slider__nav_prev',
      hideOnClick: true,
    },

    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 3,
      },
      1024: {
        spaceBetween: 20,
        slidesPerView: 3,
      },
    },
  });

  // Animate On Scroll Library
  AOS.init({
    once: true,
    disable: 'mobile',
    offset: 120,
    delay: 50,
  });
});
