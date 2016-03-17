# Tabs (CSS-only)

*Author*: [oriol.torrent@unic.com](mailto:oriol.torrent@unic.com?subject=Pattern Library: Tabs)

## Description

This is a CSS-only (aka JS-free, so no need for unit tests) fully accessible tabs module.

The module works using **input radios and labels** to manage the active tab, therefore it is absolutely important to keep the sort order from inputs, labels and panels respecitively in the implementation.

The drawback of a CSS only implementation is the maximum number of allowed tabs (10 by default), which on the other hand it is something pretty easy to configure in the first line of the SCSS file.

### Configuration

The module expects at least 2 objects as data:

- **idName**: _String_. This should be a unique ID in the whole page, and it is used to generate IDs and bind together inputs, labels and panels. 
- **tabs**: _Array_. This Array will include 1 or more _Objects_, one for each panel of the tabs module, Each object contains: a **title**, a **checked** status, and a content (either **content** or **partial** and **partialData**) options:
	- **title**: _String_: This is the text that will be displayed in the tab of the panel.
	- **checked**: _Boolean_: This attribute sets one of the tabs as active and it is the one that will be displayed on page load. If there's no tab with a checked attribute given, the first tab is the checked one.
	- **content**: _String_: This is the content that will be showed in the tab panel.
	- **partial**: _String_: This is the partial template to be used as panel content. If "partial" is defined, it takes precedence over "content".
	- **partialData**: _Variable_ or _Require_: this is a reference to the *.data.js* exported object needed to compile the partial template.

There's another optional object that the template can accept:

- **variation**: _String_. This can contain 1 or more of the following class names that apply some visual variations in the module:
	- **var_centered**: Displays the tabs centered in the available width of the module.
	- **var_expanded**: Displays the tabs using the whole available width of the module. This one has precedence over _var_centered_.
	- **var_var_animated**: Adds CSS-based fade-out/fade-in transition effect when selecting a new tab. This one can be applied together with the previous classes.
	
Example of data that can be passed to the tabs template:

```js
var tab4 = requireNew('./tabs_panels_content_example/tab4.data.js');
var data = {
	idName: 'recipies',
	variation: 'var_centered var_animated',
	tabs: [
		{
			title: 'My tab 1',
			content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.'
		}, {
			title: 'A name for tab 2',
			content: 'Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
		}, {
			title: 'The best tab 3',
			content: 'At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
		}, {
			title: 'A last tab 4',
			partial: 'demo/modules/tabs/tabs_panels_content_example/tab4',
			partialData: tab4
		}
	]
};
```

Don't forget to **configure in tabs.scss the maximum number of tabs** that such a component can have in your project. Decreasing the number will make your css smaller, a quick win ;).

### Styles

The SCSS file has 4 parts, each properly marked at its begining with a block comment:

- Configuration
- Functionality
- Variations
- Styling

The module example has already some styles. Some of them can easily be removed: the sizing and the grey background color, and they are all placed in the "_Styling_" area, at the very bottom of the file.

Others, however are part of the "_Functionality_" part: the background colors for the different states that a tab can have. They are however configurable as variables in the "_Configuration_" area. If you need to add more styles (like text color), then you'll need to edit the "Functionality" area.

### Accessibility

To make this module accessible, the corresponding aria and role tabs have been provided in the markup. Moreover, it has been made so that it works exactly in the same way than the tabs example provided in the **tab panel** example from the "Open AJAX Alliance": [Tab Panel: ARIA CSS Selectors](http://oaa-accessibility.org/example/36/), where Access for all is usually referring to as good examples for accessible components.

The benefit of the current module in comparison the to the module in the example is that this one is not using a single line of JS to reach the same functionality, at least tested in VoiceOver under OSX 10.10.5.



## Integration

1. Copy the HTML
1. Adapt the number of tabs in the SCSS
1. Adapt the styling for active (checked), focus and hover state
1. Adapt or remove the styling section at the bottom of the SCSS file
