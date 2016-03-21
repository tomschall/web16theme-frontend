# Cookie confirmation

*Author*: [florian.suesstrunk@unic.com](mailto:florian.suesstrunk@unic.com?subject=Pattern Library: Cookie confirmation)

## Description

Shows the element it was initialized on until it is hidden by clicking the accept button. The state is saved in a cookie.

## Events

### Resetting cookie confirmation

When resetting, the element will be visible again after reloading the page.

```javascript
$(document).trigger(estatico.modules.cookieconfirmation.events.reset);
```
