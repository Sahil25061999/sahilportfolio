const navKeyCode = {
  ArrowUp: 1,
  ArrowDown: 1,
  ArrowRight: 1,
  ArrowLeft: 1,
  ' ': 1,
  PageUp: 1,
  PageDown: 1,
  Home: 1,
  End: 1,
};
const supportsPassive = { passive: false };

//for checking passive support

try {
  window.addEventListener(
    'test',
    null,
    Object.defineProperty(supportsPassive, 'passive', {
      get: function () {
        return true;
      },
    })
  );
} catch (e) {}

const checkPassive = supportsPassive['passive'] ? { passive: false } : false;

///////////////////////////////

function preventingDefault(e) {
  e.preventDefault();
}

function preventingDefaultForKey(e) {
  if (navKeyCode[e.key]) {
    preventingDefault(e);
  }
}

export const disableScroll = () => {
  window.addEventListener('keypress', preventingDefaultForKey, false);
  window.addEventListener('wheel', preventingDefault, checkPassive);
  window.addEventListener('touchmove', preventingDefault, checkPassive);
};

export const enableScroll = () => {
  window.removeEventListener('keypress', preventingDefaultForKey, false);
  window.removeEventListener('wheel', preventingDefault, checkPassive);
  window.removeEventListener('touchmove', preventingDefault, checkPassive);
};
