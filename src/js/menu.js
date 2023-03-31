import { disableScroll, enableScroll } from './disableScroll';

export const menu = document.querySelector('.menu'); //menu container
const menuList = document.querySelector('.menu__list__container'); //actual menu
export const menuButton = document.querySelector('.navbar__menu__btn');
const menuIcon = document.querySelectorAll('.menu__bars *');
const menuText = document.querySelector('.menu__text');
const tl = gsap.timeline();

menuButton.addEventListener('click', () => {
  if (menu.dataset.open === 'false') {
    menu.dataset.open = 'true';
    menuOpen();
    tl.to(menuText, { y: '-2rem', duration: 0.2 });
  } else {
    menu.dataset.open = 'false';
    menuClose();
    tl.to(menuText, { y: '1', duration: 0.2 });
  }
});

menu.addEventListener('click', (e) => {
  if (menu.dataset.open === 'true') {
    menu.dataset.open = 'false';
    menuClose();
    tl.to(menuText, { y: '1', duration: 0.2 });
  }
});

menuList.addEventListener('click', (e) => {
  e.stopPropagation();
});

const menuOpen = () => {
  const tl = gsap.timeline();
  tl.to('.menu', {
    onStart: () => disableScroll(),
    opacity: 1,
    duration: 0.2,
  })
    .to('.menu__list__container', {
      x: 0,
      duration: 0.5,
      'clip-path': 'circle(130.8% at 100% 50%)',
      ease: Power4.inOut,
    })
    .to(
      '.menu__list > li',
      {
        x: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: Power4.inOut,
      },
      '-=.6'
    );
  gsap.to(menuIcon[0], {
    bottom: '2.9rem',
    duration: 0.2,
    rotate: 45,
  });
  gsap.to(menuIcon[1], { top: '2.9rem', duration: 0.2, rotate: -45 });
  // gsap.to(menuIcon[0], { y: -5, duration: 0.2 });
  // gsap.to(menuIcon[2], { y: 34, duration: 0.2 });
  // gsap.to(menuIcon[3], { x: -20, y: 34, opacity: 1, duration: 0.2 });
  // gsap.to(menuIcon[4], { x: 20, y: -5, opacity: 1, duration: 0.2 });
};

const menuClose = () => {
  const tl2 = gsap.timeline();

  tl2
    .to('.menu__list__container', {
      'clip-path': 'circle(50% at 95% 50%)',
      duration: 0.7,
    })
    .to(
      '.menu__list > li',
      {
        x: 100,
        duration: 0.2,
        stagger: 0.1,
      },
      '-=.2'
    )
    .to(
      '.menu__list__container',
      {
        x: 500,
        duration: 0.7,
      },
      '-=.8'
    )
    .to('.menu', { opacity: 0, duration: 0.1 }, '-=.32');
  gsap.to(menuIcon[0], {
    bottom: '2.5rem',
    duration: 0.2,
    rotate: 0,
  });
  gsap.to(menuIcon[1], { top: '2.5rem', duration: 0.2, rotate: 0 });
  // gsap.to(menuIcon[0], { y: 15, duration: 0.2 });
  // gsap.to(menuIcon[2], { y: 15, duration: 0.2 });
  // gsap.to(menuIcon[3], { x: 0, y: 15, opacity: 0, duration: 0.2 });
  // gsap.to(menuIcon[4], { x: 0, y: 15, opacity: 0, duration: 0.2 });
};
