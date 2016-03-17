## Description

This module is a JS/CSS **solution for [Browsers not supporting Flexbox](http://caniuse.com/#search=flexbox)** (IE10 and below).

Notice that this plugin **uses Modernizr**, both in the CSS and in the JS, to check for **flexbox support**. Therefor, to check how it works you to compare this page in a browser not supporting flexbox. If everything is properly implemented, you should see the same there than in a modern browser.

The JS part **checks the height from each item based on every row**, which is dynamically calculated based on the width of each item and the width of its container. This might lead to slight differences between browsers.

The JS also includes logic to set the height again **on resize**.

The CSS part includes 2 parts:
- Structure
- Styling

You may want to **remove the _Styling_ part** to adapt it to your needs, specially in each module.

You may also want to remove the _Structure_ part to move it to oder modules and leave only the JS. On the other hand, if you decide to keep the _Structure_ part, you will need at least to **update the max-width** from the ```[data-equalheight=item]```.

## Integration

- Add the ```data-init="equalheight"``` attribute to the element wrapping the items.
- Add the ```data-equalheight="item"``` attribute to the items on which the plugin should act. They should all be siblings, like the li's in a list.
- You'll need to adapt the width from the ```[data-equalheight=item]```, or you can remove it from the CSS of this module and place it inside every module of yours.
