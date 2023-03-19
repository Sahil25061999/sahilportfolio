import { disableScroll, enableScroll } from './disableScroll';

const menu = document.querySelector('.menu'); //menu container
const menuList = document.querySelector('.menu__list'); //actual menu
const menuButton = document.querySelector('.navbar__menu__btn');

menuButton.addEventListener('click', () => {
  const menuText = document.querySelector('.menu__text');
  const tl = gsap.timeline();
  if (menu.dataset.open === 'false') {
    menu.dataset.open = 'true';
    menuOpen();

    tl.to(menuText, { y: '-2rem', duration: 0.2 });
    // .to(
    //   '.menu__text__open',
    //   {
    //     opacity: 0,
    //   },
    //   '-=.1'
    // );
    // gsap.to('.menu__text__close', { opacity: 1 });
  } else {
    menu.dataset.open = 'false';
    menuClose();

    tl.to(menuText, { y: '1', duration: 0.2 });
    // .to(
    //   '.menu__text__close',
    //   {
    //     opacity: 0,
    //   },
    //   '-=.1'
    // );
    // gsap.to('.menu__text__open', { opacity: 1 });
  }
});

menu.addEventListener('click', (e) => {
  if (menu.dataset.open === 'true') {
    menu.dataset.open = 'false';
    menuClose();
  }
});

menuList.addEventListener('click', (e) => {
  e.stopPropagation();
});

const menuOpen = () => {
  const tl = gsap.timeline();
  tl.to('.menu', { onStart: () => disableScroll(), opacity: 1, duration: 0.2 })
    .to('.menu__list__container', { x: 0, duration: 0.5, ease: Power4.inOut })
    .to(
      '.menu__list__container',
      {
        duration: 0.7,
        // scale: 1,
        'clip-path': 'circle(111.8% at 100% 50%)',
      },
      '-=.45'
    )
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
};

const menuClose = () => {
  const tl2 = gsap.timeline();
  tl2
    .to('.menu__list__container', {
      onStart: () => enableScroll(),
      // borderRadius: 0,
      duration: 0.5,
      // scale: 1,
      'clip-path': 'circle(50% at 95% 50%)',
    })
    .to('.menu__list__container', { x: 500, duration: 0.7 }, '-=.5')

    .to('.menu', { opacity: 0, duration: 0.1 }, '-=.32')
    .to(
      '.menu__list > li',
      {
        x: 100,
        duration: 0.5,
        stagger: 0.1,
      },
      '-=1'
    );
};
