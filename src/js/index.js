//LOCOMOTIVE SCROLL

import LocomotiveScroll from 'locomotive-scroll';

import './menu';
import './loading';

var scroll = new LocomotiveScroll({
  el: document.querySelector('[data-scroll-container]'),
  smooth: true,
  multiplier: 1,
});

// scroll.on('scroll', (instance) => {
//   let cursor = document.querySelector('.cursorContainer__cursor');
//   cursor.style.top = instance.scroll.y + 'px';
// });

// LOADING SCREEN

// CURSOR ANIMATE FUNCTION

const cursor = document.querySelector('.cursorContainer__cursor');
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
    e.target.closest('.projects__project > h1') !== null;
  const interactingProject = interactedProject !== null;
  if (interactingProject) {
    if (!interactingProjectTitle) {
      cursorLinkIcon.classList.add('visible');
    } else {
      cursorLinkIcon.classList.remove('visible');
    }
    cursorAnimate(e, 'project');
  } else {
    cursorLinkIcon.classList.remove('visible');
  }
};
