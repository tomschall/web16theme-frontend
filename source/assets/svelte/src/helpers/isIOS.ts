/**
 * Returns true if the device is an iOS device (iPad, iPhone, or iPod).
 * @returns The function isIOS() is returning true or false.
 */
export const isIOS = () => {
  var iOS = /(iPad|iPhone|iPod)/g.test(navigator.userAgent);
  return iOS;
};
