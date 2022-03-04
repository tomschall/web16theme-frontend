/**
 * Returns true if the device is an iOS device (iPad, iPhone, or iPod).
 * @returns The function isIOS() is returning true or false.
 */
export const isIOS = () => {
  var iOS = /(iPad|iPhone|iPod)/g.test(navigator.userAgent);
  return iOS;
};

/**
   * If the user is on an iOS device, remove the viewport meta tag and add a new one with the content
  viewport-fit=cover.
   * @returns None
   */
export const switchMetaTag = () => {
  var iOS = isIOS();
  if (iOS === true) {
    document.querySelector("[name='viewport']").remove();
    const meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1.0, viewport-fit=cover';
    document.getElementsByTagName('head')[0].appendChild(meta);
  }
};

export const setAppHeight = () => {
  const appHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty('--app-height', `${window.innerHeight}px`);
  };
  window.addEventListener('resize', appHeight);
  appHeight();
};

export const setHostname = () => {
  if (window.location.hostname === 'webteam.pages.fhnw.ch')
    return 'www.dev.fhnw.ch';
  else return window.location.hostname;
};
