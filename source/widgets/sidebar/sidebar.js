/*!
 * Sidebar
 *
 * @author Unic AG
 * @copyright Unic AG
 *
 * //@requires ../../../node_modules/some/dependency.js
 */

;(function($, undefined) {
	'use strict';

	var name = 'sidebar',
			$body = $('body'),
		events = {
			// eventname: 'eventname.estatico.' + name
		},
		defaults = {
			domSelectors: {
				object: '[data-' + name + '="object"]',
				content: '[data-' + name + '="content"]',
				title: '[data-' + name + '="title"]',
				trigger: '[data-' + name + '="trigger"]',
				hider: '[data-' + name + '="hider"]'
			},
			stateClasses: {
				isFixed: 'is_fixed',
				isVisible: 'is_visible',
				isExpanded: 'is_expanded'
			},
			metrics: {
				objectPush: 30
			}
		},
		data = {
			objects: null,
			trigger: null,
			hider: null
		},
		dataParams = {
			objectIndex: name + '-object-index'
		},
		elements = {
			$content: $('.page_content')
		},
		scrollMagic = {
			controller: new ScrollMagic.Controller({addIndicators: true}),
			scenes: {
				fixedScene: null,
				undoScenes: {}
			}
		},
		nextElementToFix = 0,
		activeObj = null;

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
			data: data
		});
	}

	Widget.prototype = $.extend(true, {}, estatico.helpers.SuperClass.prototype, Widget.prototype);

	/**
	 * Initialize Widget, bind events.
	 * @method
	 * @public
	 */
	Widget.prototype.init = function() {
		// Only initialize when minimum medium screen size

		if (window.estatico.mq.query({from: 'medium'})) {
			data.objects = this.$element.find(this.options.domSelectors.object).toArray();
			data.trigger = this.$element.find(this.options.domSelectors.trigger)[0];
			data.hider = this.$element.find(this.options.domSelectors.hider)[0];

			this._setObjectIndex();

			this._setSidebarMinHeight();
			this._setupInitialScene();

			// Check for initial scroll position
			if ($body.scrollTop() > this.$element.offset().top) {
				setTimeout(function() {
					this._correctBodyScroll();
				}.bind(this), 5);
			}
		}
	};

	// //// GETTER AND SETTERS OF ELEMENTS ///// //

	/**
	 * Sets the min height of the sidebar according to the body
	 */
	Widget.prototype._setSidebarMinHeight = function() {
		this.$element.css({
			'min-height': elements.$content.outerHeight()
		});
	};

	/**
	 * Sets the hider to visible
	 * @private
   */
	Widget.prototype._setHiderVisible = function() {
		this._updateHider();

		$(data.hider).addClass(this.options.stateClasses.isVisible);
	};

	Widget.prototype._setHiderInvisible = function() {
		$(data.hider).removeClass(this.options.stateClasses.isVisible);
	};

	/**
	 * Updates hiders position and metrics
	 * @private
	 */
	Widget.prototype._updateHider = function() {
		var $element = $(data.objects[0]);

		$(data.hider).css({
			'left': $element.offset().left,
			'width': $element.width() + 5
		});
	};

	// ////// ACTUAL FIXATION AND UNFIXATION ////// //

	Widget.prototype._doFixation = function() {
		var $object = this._getObj(nextElementToFix),
				titleHeight = $object.getTitleHeight();

		if (!$(data.hider).hasClass(this.options.stateClasses.isVisible)) {
			this._setHiderVisible();
		}

		$object.addClass(this.options.stateClasses.isFixed);
		$object.setTitlePositionAndMetrics(this._calcTopOffset());
		$object.css({
			'padding-top': titleHeight
		});

		this._setupUndoFixScene();

		activeObj = null;

		if (nextElementToFix !== data.objects.length - 1) {
			nextElementToFix++;

			this._repositionFixedScene();
		}
	};

	Widget.prototype._undoFixation = function($object) {
		var objectIndex = parseInt($object.data(dataParams.objectIndex));

		if (objectIndex === 0) {
			this._setHiderInvisible();
		}

		$object.removeClass(this.options.stateClasses.isFixed);
		$object.removeTitlePositionAndMetrics();
		$object.css({
			'padding-top': 0
		});

		this._removeUndoScene(objectIndex);

		nextElementToFix = objectIndex;

		this._repositionFixedScene();
	};

	// ///// SCROLL MAGIC METHODS ///// //

	/**
	 * Sets up the initial scene for scroll magic
	 */
	Widget.prototype._setupInitialScene = function() {
		scrollMagic.scenes.fixedScene = new ScrollMagic.Scene({
			triggerElement: data.trigger,
			offset: 0,
			triggerHook: 0
		}).addTo(scrollMagic.controller);

		this._listenDoFixScene();
	};

	/**
	 * Sets the undo scene
	 * @private
   */
	Widget.prototype._setupUndoFixScene = function() {
		var titlesHeight = this._getCombTitlesHeight();

		scrollMagic.scenes.undoScenes[nextElementToFix] = new ScrollMagic.Scene({
			triggerElement: activeObj[0],
			offset: -1 * defaults.metrics.objectPush - titlesHeight,
			triggerHook: 0
		}).addTo(scrollMagic.controller);

		this._listenUndoFixScene();
	};

	/**
	 * Adds the fixed scene event
	 * @private
	 */
	Widget.prototype._listenDoFixScene = function() {
		scrollMagic.scenes.fixedScene.on('enter.' + this.uuid, function() {
			this._doFixation();
		}.bind(this));
	};

	/**
	 * Listening for the undo fix scene event on leave
	 * @private
   */
	Widget.prototype._listenUndoFixScene = function() {
		var objectToUnfix = activeObj,
				scene = scrollMagic.scenes.undoScenes[nextElementToFix];

		scene.on('leave', function() {
			this._undoFixation(objectToUnfix);
		}.bind(this));
	};

	/**
	 * Repositioning the fixed scene trigger to the next element
	 * @private
   */
	Widget.prototype._repositionFixedScene = function() {
		if (nextElementToFix === 0) {
			$(data.trigger).css({
				'top': -1 * defaults.metrics.objectPush
			});
		} else {
			var titlesHeight = this._getCombTitlesHeight(),
					$objectToTrigger = $(data.objects[nextElementToFix]),
					toTriggerPosition = $objectToTrigger.position().top;

			$(data.trigger).css({
				'top': toTriggerPosition - titlesHeight - defaults.metrics.objectPush
			});
		}
	};

	/**
	 * Remove the now unecessary undo scene, there's nothing to undo
	 * @param objIndex
	 * @private
   */
	Widget.prototype._removeUndoScene = function(objIndex) {
		var scene = scrollMagic.scenes.undoScenes[objIndex];

		scene.destroy();

		delete scrollMagic.scenes.undoScenes[objIndex];
	};

	// ////// CALCULATION METHODS /////// ///

	/**
	 * Calcs the top offset element for the fixed title
	 * @returns {number}
	 * @private
   */
	Widget.prototype._calcTopOffset = function() {
		if (nextElementToFix === 0) {
			return this.options.metrics.objectPush;
		} else {
			var titlesHeight = this._getCombTitlesHeight();

			titlesHeight += this.options.metrics.objectPush;

			return titlesHeight;
		}
	};

	// ////// USEFUL METHODS /////// //

	/**
	 * Returns the jquery dom of the object to use and saves it as active object
	 * @param index of the object (first = 0)
	 * @returns {*|HTMLElement}
   */
	Widget.prototype._getObj = function(index) {
		var $obj = $(data.objects[index]);

		activeObj = $obj;

		return $obj;
	};

	/**
	 * Sets an data element to the object so we can identify the object asking for the data object
	 */
	Widget.prototype._setObjectIndex = function() {
		data.objects.forEach(function(object, index) {
			$(object).data(dataParams.objectIndex, index);
		});
	};

	/**
	 * get the combined height of all titles, before the set next element to fix
	 * @returns {number}
	 * @private
   */
	Widget.prototype._getCombTitlesHeight = function() {
		var titlesHeight = 0;

		for (var i = 0; i < nextElementToFix; i++) {
			titlesHeight += $(data.objects[i]).getTitleHeight() - 1;
		}

		return titlesHeight;
	};

	// //// BODY METHODS ///// //

	Widget.prototype._correctBodyScroll = function() {
		$(this.options.domSelectors.object).map(function(index, object) {
			var $nextObject = $(data.objects[index + 1]),
					thisObjectBottomPosition = $(object).getTitlePosition() + $(object).getTitleHeight(),
					nextObjectOffsetTop = 0,
					thisHasFixed = $(object).hasClass(this.options.stateClasses.isFixed),
					nextHasNotFixed = false;

			if ($nextObject.length > 0) {
				nextObjectOffsetTop = $nextObject.offset().top;
				nextHasNotFixed = !$nextObject.hasClass(this.options.stateClasses.isFixed);

				if (thisHasFixed && nextHasNotFixed) {
					nextObjectOffsetTop = $nextObject.offset().top;

					if (thisObjectBottomPosition >= nextObjectOffsetTop) {
						nextElementToFix = index + 1;

						this._doFixation();
					}
				}
			}

		}.bind(this));
	};

	/**
	 * Unbind events, remove data, custom teardown
	 * @method
	 * @public
	 */
	Widget.prototype.destroy = function() {
		// Unbind events, remove data
		estatico.helpers.SuperClass.prototype.destroy.apply(this);

		// Custom teardown (removing added DOM elements etc.)
		// If there is no need for a custom teardown, this method can be removed
	};

	// Make the plugin available through jQuery (and the global project namespace)
	estatico.helpers.SuperClass.register(Widget, name, {
		initEvents: ['ready', 'ajaxload'],
		events: events
	});

	// ////// EXTENDING JQUERY FOR CODE NICENESS AND TO HAVE QUICK ACCESS ////// //

	$.fn.extend({
		getTitleHeight: function() {
			return $(this).find(defaults.domSelectors.title).outerHeight();
		},

		setTitlePositionAndMetrics: function(top) {
			var $parent = $(this);

			$parent.find(defaults.domSelectors.title).css({
				'left': $parent.offset().left,
				'top': top,
				'width': $parent.outerWidth()
			});
		},

		removeTitlePositionAndMetrics: function() {
			$(this).find(defaults.domSelectors.title).removeAttr('style');
		},

		getTitlePosition: function() {
			return $(this).find(defaults.domSelectors.title).offset().top;
		}
	});

})(jQuery);
