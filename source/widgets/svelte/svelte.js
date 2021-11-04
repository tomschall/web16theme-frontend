/* eslint-disable space-before-function-paren */
/*!
 * Sidebar Events
 *
 * @author Unic AG
 * @copyright Unic AG
 *
 * //@requires ../../../node_modules/some/dependency.js
 */

(function ($, undefined) {
  'use strict';

  var name = 'edu_events',
    events = {
      // eventname: 'eventname.estatico.' + name
    },
    defaults = {
      domSelectors: {},
      stateClasses: {
        // isActive: 'is_active'
      },
    },
    data = {
      // items: ["Item 1", "Item 2"]
    };

  /**
   * Create an instance of the widget
   * @constructor
   * @param {object} element - The DOM element to bind the widget
   * @param {object} options - Options overwriting the defaults
   */
  function Widget(element, options) {
    this._helper = estatico.helpers.SuperClass;

    this._helper({
      name: name,
      element: element,
      defaults: defaults,
      options: options,
      events: events,
      data: data,
    });
  }

  Widget.prototype = $.extend(
    true,
    {},
    estatico.helpers.SuperClass.prototype,
    Widget.prototype
  );

  /**
   * Initialize Widget, bind events.
   * @method
   * @public
   */
  Widget.prototype.init = function () {
    console.log('triggered');
    // console.log('Widget "edu_events" initialized');
    (function () {
      var headID = document.getElementsByTagName('head')[0];
      var link = document.createElement('link');
      link.type = 'text/css';
      link.rel = 'stylesheet';

      //link.href = 'http://fonts.googleapis.com/css?family=Oswald&effect=neon';
      headID.appendChild(link);

      link.href = '../../assets/svelte/public/build/bundle.css';
    })();

    (function () {
      var headID = document.getElementsByTagName('head')[0];
      var link = document.createElement('link');
      link.type = 'text/css';
      link.rel = 'stylesheet';

      //link.href = 'http://fonts.googleapis.com/css?family=Oswald&effect=neon';
      headID.appendChild(link);

      link.href = '../../assets/svelte/public/global.css';
    })();

    (function () {
      var headID = document.getElementsByTagName('head')[0];
      var link = document.createElement('link');

      //link.href = 'http://fonts.googleapis.com/css?family=Oswald&effect=neon';
      headID.appendChild(link);

      link.href = '../../assets/svelte/public/build/bundle.js';
    })();
  };

  /**
   * Unbind events, remove data, custom teardown
   * @method
   * @public
   */
  Widget.prototype.destroy = function () {
    // Unbind events, remove data
    estatico.helpers.SuperClass.prototype.destroy.apply(this);

    // Custom teardown (removing added DOM elements etc.)
    // If there is no need for a custom teardown, this method can be removed
  };

  // Make the plugin available through jQuery (and the global project namespace)
  estatico.helpers.SuperClass.register(Widget, name, {
    initEvents: ['ready', 'ajaxload'],
    events: events,
  });
})(jQuery);
