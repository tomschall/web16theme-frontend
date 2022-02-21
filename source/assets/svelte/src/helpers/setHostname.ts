export const setHostname = (cb: any) => {
  if (window.location.hostname === 'webteam.pages.fhnw.ch')
    cb('www.dev.fhnw.ch');
  else cb(window.location.hostname);
};
