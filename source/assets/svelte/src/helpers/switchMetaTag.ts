import { isIOS } from './isIOS';

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
