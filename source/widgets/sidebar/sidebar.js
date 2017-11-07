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
				isFixed: 'is_fixed', // When an element gets fixed
				isVisible: 'is_visible', // For the hider to define if visible or not
				isRequested: 'is_requested', // Added when Content is requested to be pulled down
				isPushed: 'is_pushed', // Added when element has to be pushed
				isPulledDown: 'is_pulled-down', // When the content actually will be pulled down,
				hideHider: 'hide_hider'
			},
			metrics: {
				objectPush: 30,
				contentPaddingTop: 17,
				pageBottomGutter: 80
			},
			animationSpeed: 250
		},
		data = {
			objects: null,
			triggers: null,
			hider: null
		},
		dataParams = {
			objectIndex: name + '-object-index',
			initialTop: name + '-initial-top'
		},
		elements = {
			$layout: $('.layout_content')
		},
		scrollMagic = {
			controller: new ScrollMagic.Controller({addIndicators: false}),
			scenes: {
				fixedScenes: {},
				undoScenes: {},
				bleedScenes: {
					beginScenes: {},
					leaveScenes: {}
				}
			}
		},
		nextElementToFix = 0,
		activeObj = null,
		hasExtended = false,
		extendedObj = null,
		doingAnimation = false,
		formerLayoutHeight = 0,
		sidebarIsInitialized = false,
		oldWidth = 0;

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
		this.checkPositionOfSidebar();

		// Only initialize when minimum medium screen size
		if (window.estatico.mq.query({from: 'subnav'})) {
			if ($body.scrollTop() > this.$element.offset().top) {
				setTimeout(function() {
					this._correctBodyScroll();

					this._initSidebar();
				}.bind(this), 5);
			} else {
				this._initSidebar();
			}
		}

		var oldWidth = $(window).width();

		$(window).on('resize.' + this.uuid, function() {
			if (oldWidth !== $(window).width()) {
				this._handleResize();

				this._updateHider();
			}
		}.bind(this));
	};

	Widget.prototype.checkPositionOfSidebar = function() {
		var sidebarTopPosition = this.$element.offset().top,
				subnavBottomPosition = 0,
				margin = sidebarTopPosition - subnavBottomPosition;

		if ($('.widg_subnav').length > 0) {
			subnavBottomPosition = $('.widg_subnav').offset().top + $('.widg_subnav').outerHeight(true);
			margin = sidebarTopPosition - subnavBottomPosition;
		}

		if (margin < 40) {
			var additionalPush = Math.round(40 - margin),
					currentMarginTop = parseInt(this.$element.css('marginTop'));

			this.$element.css({
				'margin-top': currentMarginTop + additionalPush
			});
		}
	};

	Widget.prototype._initSidebar = function() {
		data.objects = this.$element.find(this.options.domSelectors.object).toArray();
		data.triggers = this.$element.find(this.options.domSelectors.trigger).toArray();
		data.hider = this.$element.find(this.options.domSelectors.hider)[0];

		this._setObjectIndex();
		this._setupInitialScenes();
		this._setupBleedScenes();

		sidebarIsInitialized = true;
	};

	// //// GETTER AND SETTERS OF ELEMENTS ///// //

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

		this._bindFixedClickEvent($object);
		this._setupUndoFixScene();

		activeObj = null;

		if (nextElementToFix !== data.objects.length - 1) {
			nextElementToFix++;

			this._repositionFixedScene();
		}
	};

	Widget.prototype._undoFixation = function($object) {
		var objectIndex = parseInt($object.data(dataParams.objectIndex));

		$object.find(this.options.domSelectors.content).removeAttr('style');

		$object
				.removeClass(this.options.stateClasses.isFixed)
				.removeClass(this.options.stateClasses.isRequested)
				.removeClass(this.options.stateClasses.isPushed)
				.removeClass(this.options.stateClasses.isPulledDown);

		$object.removeTitlePositionAndMetrics();
		$object.css({
			'padding-top': 0
		});

		this._removeUndoScene(objectIndex);
		this._unbindFixedClickEvent($object);

		nextElementToFix = objectIndex;

		this._repositionFixedScene(objectIndex);

		if ($('.widg_sidebar__object.is_fixed').length === 0) {
			nextElementToFix = 0;

			this._setHiderInvisible();

			this._repositionFixedScene();
		}
	};

	// //////// CONTENT DISPLAYING ///////// //

	/**
	 * Requests the content to be displayed, checks if already has some extended
	 * @param $object
	 * @private
   */
	Widget.prototype._requestContent = function($object) {
		// While requesting the content avoid everything new clicks on that
		doingAnimation = true;

		if (hasExtended) {
			this._hideContent(extendedObj);

			setTimeout(function() {
				this._showContent($object);
			}.bind(this), this.options.animationSpeed + 1);
		} else {
			this._showContent($object);
		}
	};

	/**
	 * Shows the content
	 * @param $object
	 * @private
   */
	Widget.prototype._showContent = function($object) {
		var contentHeight = $object.getContentHeight(),
				contentOffsetBottom = $object.getContentOffsetBottom(),
				titleOffsetBottom = $object.getTitleOffsetBottom(),
				initialContentTop = 0,
				combTitlesHeight = this._getCombTitlesHeight(data.objects.length) + 60,
				maxHeightForContent = $(window).outerHeight() - combTitlesHeight;

		if (contentHeight > maxHeightForContent) {
			contentHeight = maxHeightForContent;

			$object.find(this.options.domSelectors.content).css('max-height', maxHeightForContent);
		}

		this._addPushToObjects(contentHeight, parseInt($object.data(dataParams.objectIndex)));

		if (contentOffsetBottom > titleOffsetBottom) {
			initialContentTop = $object[0].getBoundingClientRect().top;
		} else {
			initialContentTop = (titleOffsetBottom - $(window).scrollTop()) - contentHeight;
		}

		$object.data(dataParams.initialTop, initialContentTop).setContentPositionAndMetrics(initialContentTop);
		$object.addClass(this.options.stateClasses.isRequested);

		// Now we have set everything so we can actuall move the content to the correct position (finally)
		this._moveContentIn($object);

		hasExtended = true;
		extendedObj = $object;

		this._checkSidebarHeight(contentHeight);

		// After all functions have dissolved we can allow content requesting again
		setTimeout(function() {
			doingAnimation = false;
		}, this.options.animationSpeed);
	};

	/**
	 * Move Content in
	 * @param $object
	 * @private
   */
	Widget.prototype._moveContentIn = function($object) {
		var pullDown = $object.getTitleOffsetBottom() - $(window).scrollTop();

		$object.addClass(this.options.stateClasses.isPulledDown);

		$object.setContentPositionAndMetrics(pullDown);
	};

	/**
	 * Add push to the objects following, if fixed all, not fixed only the first
	 * @param push
	 * @param requestedOrderNumber
	 * @private
   */
	Widget.prototype._addPushToObjects = function(push, requestedOrderNumber) {
		var unfixedCounter = 0;

		for (var i = requestedOrderNumber + 1; i < data.objects.length; i++) {
			var $object = $(data.objects[i]),
					$requestedObject = $(data.objects[requestedOrderNumber]);

			$object.addClass(this.options.stateClasses.isPushed);

			if ($object.hasClass(this.options.stateClasses.isFixed)) {
				var calcedTop = parseInt($object.find(this.options.domSelectors.title).css('top'), 10) + push;

				$object.setTitleTop(calcedTop);

				// Repositioning the undo scene
				this._repositionUndoScene(i, push);
			} else if (unfixedCounter === 0) {
				this._pushTrigger($requestedObject.getContentHeight(), i);

				$requestedObject.css({
					'padding-top': $requestedObject.getTitleHeight() + $requestedObject.getContentHeight()
				});

				unfixedCounter++;
			}
		}
	};

	/**
	 * Hides the content of the object actin
	 * @param $object
	 * @private
   */
	Widget.prototype._hideContent = function($object) {
		var initialTop = $object.data(dataParams.initialTop),
				titleHeight = $object.getTitleHeight(),
				contentHeight = $object.getContentHeight(),
				objIndex = parseInt($object.data(dataParams.objectIndex));

		doingAnimation = true;

		$object.setContentPositionAndMetrics(initialTop).css({
			'padding-top': titleHeight
		});

		this._repositionFixedScene(objIndex);

		this.$element.find('.' + this.options.stateClasses.isPushed).map(function(index, mappedObject) {
			this._calcIfFixed($(mappedObject), contentHeight);

			setTimeout(function() {
				$(mappedObject).removeClass(this.options.stateClasses.isPushed);
			}.bind(this), this.options.animationSpeed);
		}.bind(this));

		$object.removeClass(this.options.stateClasses.isRequested);

		setTimeout(function() {
			$object.removeClass(this.options.stateClasses.isPulledDown);

			$object.find(this.options.domSelectors.content).removeAttr('style');

			this._checkSidebarHeight();

			doingAnimation = false;
		}.bind(this), this.options.animationSpeed);
	};

	// ///// SCROLL MAGIC METHODS ///// //

	/**
	 *
	 * @private
   */
	Widget.prototype._setupInitialScenes = function() {
		for (var i = 0; i < data.objects.length; i++) {
			scrollMagic.scenes.fixedScenes[i] = new ScrollMagic.Scene({
				triggerElement: data.triggers[i],
				triggerHook: 0,
				offset: 0
			}).addTo(scrollMagic.controller);

			this._repositionFixedScene(i);

			this._listenDoFixScene(i);
		}
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
	Widget.prototype._listenDoFixScene = function(objIndex) {
		scrollMagic.scenes.fixedScenes[objIndex].on('enter.' + this.uuid, function() {
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
	Widget.prototype._repositionFixedScene = function(objIndex) {
		if (typeof objIndex === typeof undefined) {
			objIndex = nextElementToFix;
		}

		if (objIndex === 0) {
			$(data.triggers[objIndex]).css({
				'top': -1 * defaults.metrics.objectPush
			});
		} else {
			var titlesHeight = this._getCombTitlesHeight(),
					$objectToTrigger = $(data.objects[objIndex]),
					toTriggerPosition = $objectToTrigger.position().top;

			$(data.triggers[objIndex]).css({
				'top': toTriggerPosition - titlesHeight - defaults.metrics.objectPush
			});
		}
	};

	/**
	 * Pushing the trigger to a new value
	 * @param push the distance to push
	 * @param objIndex for which trigger
	 * @private
   */
	Widget.prototype._pushTrigger = function(push, objIndex) {
		var titlesHeight = this._getCombTitlesHeight(objIndex),
				$objectToTrigger = $(data.objects[nextElementToFix]),
				toTriggerPosition = $objectToTrigger.position().top;

		$(data.triggers[objIndex]).css({
			'top': toTriggerPosition - titlesHeight - push - defaults.metrics.objectPush
		});
	};

	/**
	 * Repositioning an undo scene, with getting the push
	 * @param objIndex
	 * @param push
	 * @private
   */
	Widget.prototype._repositionUndoScene = function(objIndex, push) {
		var undoScene = scrollMagic.scenes.undoScenes[objIndex],
				currentOffset = undoScene.offset(),
				newOffset = currentOffset - push;

		undoScene.offset(newOffset);
	};

	/**
	 * Remove the now unecessary undo scene, there's nothing to undo
	 * @param objIndex
	 * @private
   */
	Widget.prototype._removeUndoScene = function(objIndex) {
		var scene = scrollMagic.scenes.undoScenes[objIndex];

		if (typeof scene !== typeof undefined) {
			scene.destroy();
		}

		delete scrollMagic.scenes.undoScenes[objIndex];
	};

	/**
	 * Setting up the bleed scenes, a scene to hide the hider when over an bleed element like location slider
	 * @private
	 */
	Widget.prototype._setupBleedScenes = function() {
		$('.content__element___bleed').map(function(index, element) {
			scrollMagic.scenes.bleedScenes.beginScenes[index] = new ScrollMagic.Scene({
				triggerElement: element,
				offset: 0,
				triggerHook: 0
			}).addTo(scrollMagic.controller);

			this._listenBleedBeginScene(scrollMagic.scenes.bleedScenes.beginScenes[index]);

			scrollMagic.scenes.bleedScenes.leaveScenes[index] = new ScrollMagic.Scene({
				triggerElement: element,
				offset: $(element).outerHeight(),
				triggerHook: 0
			}).addTo(scrollMagic.controller);

			this._listenBleedLeaveScene(scrollMagic.scenes.bleedScenes.leaveScenes[index]);
		}.bind(this));
	};

	/**
	 * Listeners for the scene at the beginning of the bleed element
	 * @param scene
	 * @private
	 */
	Widget.prototype._listenBleedBeginScene = function(scene) {
		scene.on('enter.' + this.uuid, function() {
			this.$element.addClass(this.options.stateClasses.hideHider);
		}.bind(this));

		scene.on('leave.' + this.uuid, function() {
			this.$element.removeClass(this.options.stateClasses.hideHider);
		}.bind(this));
	};

	/**
	 * Listeners for the scene at the end of the bleed element
	 * @param scene
	 * @private
	 */
	Widget.prototype._listenBleedLeaveScene = function(scene) {
		scene.on('enter.' + this.uuid, function() {
			this.$element.removeClass(this.options.stateClasses.hideHider);
		}.bind(this));

		scene.on('leave.' + this.uuid, function() {
			this.$element.addClass(this.options.stateClasses.hideHider);
		}.bind(this));
	};

	// /////// EVENT METHODS /////// //

	/**
	 * Add Fixed Click Event
	 * @param $object sidebar_object
	 * @private
   */
	Widget.prototype._bindFixedClickEvent = function($object) {
		var $title = $object.find(this.options.domSelectors.title);

		$title.on('click.' + this.uuid, function() {
			if (!doingAnimation) {
				if ($object.hasClass(this.options.stateClasses.isPulledDown)) {
					this._hideContent($object);
				} else {
					this._requestContent($object);
				}
			}
		}.bind(this));
	};

	/**
	 * Unbind the fixed clicked event
	 * @param $object
	 * @private
   */
	Widget.prototype._unbindFixedClickEvent = function($object) {
		var $title = $object.find(this.options.domSelectors.title);

		$title.unbind('click.' + this.uuid);
	};

	// ////// CALCULATION METHODS /////// ///

	/**
	 * Calcs the top offset element for the fixed title
	 * @returns {number}
	 * @private
   */
	Widget.prototype._calcTopOffset = function(objIndex) {
		if (typeof objIndex === typeof undefined) {
			objIndex = nextElementToFix;
		}

		if (objIndex === 0) {
			return this.options.metrics.objectPush;
		}

		var titlesHeight = this._getCombTitlesHeight(objIndex);
		titlesHeight += this.options.metrics.objectPush;
		return titlesHeight;
	};

	Widget.prototype._calcIfFixed = function($object, modifierHeight) {
		var top = parseInt($object.find(this.options.domSelectors.title).css('top')) - modifierHeight + 1,
				objectOffsetTop = $object.offset().top,
				objectTitleOffsetTop = $object.getTitleOffsetTop() - modifierHeight - $object.getTitleHeight();

		if (objectOffsetTop <= objectTitleOffsetTop) {
			$object.setTitlePositionAndMetrics(top);
		} else {
			this._undoFixation($object);
		}

		// Wait till triggering the repositioning of the fixed scene
		setTimeout(function() {
			this._repositionFixedScene($object.data(dataParams.objectIndex));
		}.bind(this), this.options.animationSpeed + 5);
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
	Widget.prototype._getCombTitlesHeight = function(objIndex) {
		var titlesHeight = 0;

		if (typeof objIndex === typeof undefined) {
			objIndex = nextElementToFix;
		}

		for (var i = 0; i < objIndex; i++) {
			titlesHeight += $(data.objects[i]).getTitleHeight() - 1;

			if ($(data.objects[i]).hasClass(this.options.stateClasses.isPulledDown)) {
				titlesHeight += $(data.objects[i]).getContentHeight() - 1;
			}
		}

		return titlesHeight;
	};

	/**
	 * Resets the object to basic element
	 * @param $object
	 * @private
   */
	Widget.prototype._resetEverything = function($object) {
		$object.removeAttr('style').removeClass(this.options.stateClasses.isFixed).find(this.options.domSelectors.content)
				.removeAttr('style');
	};

	// //// BODY AND LAYOUT METHODS ///// //

	/**
	 * Corrects the body scroll
	 * @private
   */
	Widget.prototype._correctBodyScroll = function() {
		$(this.options.domSelectors.object).map(function(index, object) {
			this._resetEverything($(object));
		}.bind(this));
	};

	/**
	 * Checks the sidebarheight
	 * @param contentHeight of the new content displayed, so we know before animation what will be the new offset
	 * @private
   */
	Widget.prototype._checkSidebarHeight = function(contentHeight) {
		var $lastObject = $(data.objects[data.objects.length - 1]),
				bottomOffset = 0,
				bottomOffsetSidebar = elements.$layout.offset().top + elements.$layout.outerHeight(),
				differenceOffset = 0;

		if ($lastObject.hasClass(this.options.stateClasses.isPulledDown)) {
			bottomOffset = $lastObject.getContentOffsetBottom() + contentHeight;
		} else {
			bottomOffset = $lastObject.getTitleOffsetBottom() + contentHeight;
		}

		if (bottomOffset > bottomOffsetSidebar) {
			differenceOffset = bottomOffset - bottomOffsetSidebar + this.options.metrics.pageBottomGutter;

			formerLayoutHeight = elements.$layout.height();

			elements.$layout.css('min-height', differenceOffset + elements.$layout.height());

		} else {
			if (formerLayoutHeight !== 0) {
				elements.$layout.css('min-height', formerLayoutHeight);
			}
		}

	};

	// ////// HANDLING THE RESIZE ////// //

	/**
	 * Handling the resize event
	 * @private
   */
	Widget.prototype._handleResize = function() {
		this.checkPositionOfSidebar();

		if (!sidebarIsInitialized) {
			this._initSidebar();
		}

		if (hasExtended) {
			this._hideContent(extendedObj);

			setTimeout(function() {
				this._repositionAll();
			}.bind(this), this.options.animationSpeed + 1);
		} else {
			this._repositionAll();
		}

		oldWidth = $(window).width();

	};

	// /////// RESET FUNCTIONS /////// //

	/**
	 * Reposition all elements
	 * @private
   */
	Widget.prototype._repositionAll = function() {
		for (var i = 0; i < data.objects.length; i++) {
			var $object = $(data.objects[i]);

			$object.setTitlePositionAndMetrics(this._calcTopOffset(i));
		}
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

			return $parent;
		},

		setTitleTop: function(top) {
			$(this).find(defaults.domSelectors.title).css({
				'top': top
			});

			return $(this);
		},

		removeTitlePositionAndMetrics: function() {
			$(this).find(defaults.domSelectors.title).removeAttr('style');
		},

		getTitleOffsetTop: function() {
			return $(this).find(defaults.domSelectors.title).offset().top;
		},

		getTitleOffsetBottom: function() {
			return $(this).find(defaults.domSelectors.title).offset().top + $(this).find(defaults.domSelectors.title).outerHeight();
		},

		getContentHeight: function() {
			return $(this).find(defaults.domSelectors.content).outerHeight();
		},

		setContentPositionAndMetrics: function(top) {
			var $parent = $(this);

			$parent.find(defaults.domSelectors.content).css({
				'left': $parent.offset().left,
				'top': top,
				'width': $parent.outerWidth()
			});

			return $(this);
		},

		getContentOffsetTop: function() {
			return $(this).find(defaults.domSelectors.content).offset().top;
		},

		getContentOffsetBottom: function() {
			return $(this).find(defaults.domSelectors.content).offset().top + $(this).find(defaults.domSelectors.content).outerHeight();
		}
	});

})(jQuery);
