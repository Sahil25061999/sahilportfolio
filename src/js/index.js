//LOCOMOTIVE SCROLL

import LocomotiveScroll from 'locomotive-scroll';
import { disableScroll, enableScroll } from './disableScroll';
import { menu, menuButton } from './menu';
import './form';
import './loading';

var scroll = new LocomotiveScroll({
  el: document.querySelector('[data-scroll-container]'),
  smooth: true,
  multiplier: 1,
  mobile: {
    smooth: true,
  },
  tablet: {
    smooth: true,
    breakpoint: 0,
  },
});

// document.addEventListener('DOMContentLoaded', (e) => {
//   scroll.init();
// });

scroll.on('scroll', (instance) => {
  const menuBtn = document.querySelector('.navbar__menu__btn');

  if (instance.scroll.y > 100) {
    menuBtn.setAttribute('style', 'transform:scale(1);opacity:1');
  } else {
    if (menu.dataset.open === 'false') {
      menuBtn.setAttribute('style', 'transform:scale(0);opacity:0');
    }
  }
});

menuButton.addEventListener('click', () => {
  if (menu.dataset.open === 'true') {
    scroll.stop();
  } else {
    scroll.start();
    // enableScroll();
  }
});

menu.addEventListener('click', () => {
  if (menu.dataset.open === 'false') {
    scroll.start();
  }
});

// DETECT TYPE OF DEVICE

const isMobile = () => {
  return (
    navigator.maxTouchPoints > 0 &&
    /Android|iPhone|iPad/i.test(navigator.userAgent)
  );
};

// CURSOR ANIMATE FUNCTION

const cursor = document.querySelector('.cursorContainer__cursor');
if (isMobile()) {
  console.log(ontouchstart in document);
  cursor.style.display = 'none';
}
const cursorLinkIcon = document.querySelector(
  '.cursorContainer__cursor > span'
);

const getCursorStyle = (elementInteracted) => {
  switch (elementInteracted) {
    case 'interactable':
      return 0;
    case 'header':
      return 7;
    case 'project':
      return 2.8;
    default:
      return 1;
  }
};

const cursorAnimate = (e, elementInteracted) => {
  const tl = gsap.timeline();
  tl.to('.cursorContainer__cursor', {
    x: e.clientX - cursor.offsetWidth / 2,
    y: e.clientY - cursor.offsetHeight / 2,
    overwrite: 'auto',
    duration: 0.5,
  }).to(
    '.cursorContainer__cursor',
    {
      overwrite: 'auto',
      scale: () => getCursorStyle(elementInteracted),
      duration: 0.2,
    },
    '-=.5'
  );
};

// HEADER CLIP PATH FUNCTION

const headerClipAnimate = (e, interacting) => {
  let bcr = document.querySelector('.foreground').getBoundingClientRect();

  let tl = gsap.timeline();

  tl.to('.foreground', {
    overwrite: 'auto',
    duration: '.5',

    'clip-path': `circle(${interacting ? '8rem' : '0rem'} at ${
      Math.min(Math.max(0, (e.clientX - bcr.left) / bcr.width), 1) * 100
    }% ${Math.min(Math.max(0, (e.clientY - bcr.top) / bcr.height), 1) * 100}%)`,
  });
};

window.onmousemove = (e) => {
  //CURSOR ANIMATION

  const interactedMenu = e.target.closest('.interactable');
  const interactingMenu = interactedMenu !== null;
  cursorAnimate(e, interactingMenu ? 'interactable' : '');

  //HEADER CLIP PATH ANIMATION

  const interactedHeader = e.target.closest('.header__intro');
  const interactingHeader = interactedHeader !== null;
  headerClipAnimate(e, interactingHeader);
  if (interactingHeader) {
    cursorAnimate(e, 'header');
  }

  //PROJECT HOVER ANIMATION

  const interactedProject = e.target.closest('.projects__project');
  const interactingProjectTitle =
    e.target.closest('.projects__project  h1') !== null;

  const interactingProjectGithub = e.target.closest('.github__site') !== null;
  const interactingProjectLink = e.target.closest('.live__site') !== null;
  const interactingProject = interactedProject !== null;
  if (interactingProject) {
    if (
      !interactingProjectTitle &&
      !interactingProjectGithub &&
      !interactingProjectLink
    ) {
      cursorLinkIcon.classList.add('visible');
    } else {
      cursorLinkIcon.classList.remove('visible');
    }
    cursorAnimate(e, 'project');
  } else {
    cursorLinkIcon.classList.remove('visible');
  }
};
