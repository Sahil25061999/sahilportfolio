const navKeyCode = {
  ArrowUp: 1,
  ArrowDown: 01,
  ArrowRight: 01,
  ArrowLeft: 01,
  ' ': 01,
  PageUp: 01,
  PageDown: 01,
  Home: 01,
  End: 01,
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
  window.addEventListener('keydown', preventingDefaultForKey, false);
  window.addEventListener('wheel', preventingDefault, checkPassive);
  window.addEventListener('touchmove', preventingDefault, checkPassive);
};

export const enableScroll = () => {
  window.removeEventListener('keydown', preventingDefaultForKey, false);
  window.removeEventListener('wheel', preventingDefault, checkPassive);
  window.addEventListener('touchmove', preventingDefault, checkPassive);
};
