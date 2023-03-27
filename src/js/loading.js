import { disableScroll, enableScroll } from './disableScroll';
const tl = gsap.timeline();
var imgLoad = imagesLoaded('elem');

imgLoad.on('done', (instance) => {
  // tl.to('.preloader__rows__logo h1', {
  //   onStart: () => disableScroll(),
  //   'clip-path': 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)',
  //   duration: 2,
  //   ease: Power3.easeInOut,
  //   opacity: 0,
  //   yoyo: true,
  //   stagger: 0.4,
  // })
  //   .to('.preloader__rows', {
  //     scaleX: '0',
  //     duration: 1,
  //     stagger: {
  //       each: 0.35,
  //       from: 'random',
  //       ease: Power3.out,
  //     },
  //     ease: Power4.easeInOut,
  //   })
  //   .to(
  //     '.preloader',
  //     {
  //       scaleX: '0',
  //       duration: 1,
  //     },
  //     '-=1'
  //   )
  //   .to(
  //     '.navbar__logo,.navbar__list ,.header__intro,.header__intro__subtext',
  //     {
  //       onEnd: () => enableScroll(),
  //       x: 0,
  //       // 'clip-path': 'polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)',
  //       'clip-path': 'polygon(100% -22.5%, -2.2% -20%, 0% 137.5%, 100% 140%)',
  //       duration: 0.5,
  //       stagger: {
  //         each: 0.15,
  //         from: 'random',
  //       },

  //       ease: Power4.easeInOut,
  //     },
  //     '-=.8'
  //   );

  tl.to('.preloader', {
    // onStart: () => disableScroll(),
    // onEnd: () => enableScroll(),
    duration: 1.5,
  })
    .to(
      '.preloader',
      {
        duration: 1.5,
        // opacity: 0,
        scale: 150,
      },
      '-=.5'
    )
    .to('.preloader', { duration: 0.2, opacity: 0 }, '-=.4')
    .to('.preloader', { duration: 0, display: 'none ' })
    .to(
      '.header__intro,.header__intro__subtext,.navbar__logo,.navbar__list > li ',

      { duration: 0.2, opacity: 1, scale: 1 },
      '-=.2'
    );
});
