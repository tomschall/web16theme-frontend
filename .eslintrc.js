var OFF = 0, WARN = 1, ERROR = 2;

module.exports = exports = {
	"env": {
		"browser": true,
		"node": true,
	},

	"extends": "eslint:recommended",

	"rules": {
		"no-extra-parens": OFF, // Extra parentheses make associativity more obvious and therefore are welcome
		"no-unexpected-multiline": ERROR,
		"valid-jsdoc": OFF, // Documentation tends to stale and you should provide it if and only if your code is not self-documenting

		// Best Practices
		"block-scoped-var": WARN,
		"consistent-return": ERROR, // TODO: fix code and enable rule
		"curly": ERROR,
		"default-case": WARN,
		"dot-location": [ WARN, "property" ],
		"dot-notation": WARN,
		"eqeqeq": [ ERROR, "smart" ],
		"guard-for-in": WARN,
		"no-alert": ERROR,
		"no-caller": ERROR,
		"no-case-declarations": WARN,
		"no-div-regex": WARN,
		"no-else-return": WARN,
		"no-labels": WARN,
		"no-console": WARN,
		"no-empty-pattern": WARN,
		"no-eq-null": WARN,
		"no-eval": ERROR,
		"no-extend-native": ERROR,
		//"no-extra-bind": WARN, // TODO: fix code and enable rule
		"no-floating-decimal": WARN, // TODO: fix code and enable rule
		// "no-implicit-coercion": [ WARN, { // TODO: fix code and enable rule
		// 	"boolean": true,
		// 	"number": true,
		// 	"string": true
		// }],
		"no-implied-eval": ERROR,
		"no-iterator": ERROR,
		"no-labels": WARN,
		"no-lone-blocks": WARN,
		"no-loop-func": ERROR,
		//"no-magic-numbers": WARN, // TODO: fix code and enable rule
		"no-multi-spaces": ERROR,
		"no-multi-str": WARN,
		"no-native-reassign": ERROR,
		"no-new-func": ERROR,
		"no-new-wrappers": ERROR,
		"no-new": ERROR,
		"no-octal-escape": ERROR,
		"no-process-env": WARN,
		"no-proto": ERROR,
		"no-redeclare": ERROR,
		"no-return-assign": ERROR,
		"no-script-url": ERROR,
		"no-self-compare": ERROR,
		//"no-throw-literal": ERROR, // TODO: fix code and enable rule
		"no-unused-expressions": ERROR,
		"no-useless-call": ERROR,
		"no-useless-concat": ERROR,
		"no-void": WARN,

		// Produce warnings when something is commented as TODO or FIXME
		"no-warning-comments": [ WARN, {
			"terms": [ "TODO", "FIXME" ],
			"location": "start"
		}],
		"no-with": WARN,
		//"radix": WARN, // TODO: fix code and enable rule
		"yoda": ERROR,

		// Variables
		"no-catch-shadow": WARN,
		"no-delete-var": ERROR,
		"no-label-var": ERROR,
		// "no-shadow-restricted-names": ERROR, TODO: fix code and enable rule
		// "no-shadow": WARN, // TODO: fix code and enable rule
		"no-undef-init": OFF,
		"no-undef": ERROR,
		"no-undefined": OFF,
		"no-unused-vars": OFF, // TODO: fix code and enable rule
		// Disallow hoisting - let & const don't allow hoisting anyhow
		"no-use-before-define": ERROR,

		// Stylistic - everything here is a warning because of style.
		"array-bracket-spacing": OFF,
		"block-spacing": [ WARN, "always" ],
		"brace-style": [ WARN, "1tbs", { "allowSingleLine": false } ],
		"comma-spacing": [ WARN, { "before": false, "after": true } ],
		"comma-style": [ WARN, "last" ],
		"computed-property-spacing": [ WARN, "never" ],
		"consistent-this": [ WARN, "self" ],
		"eol-last": WARN,
		"id-length": [ WARN, { "min": 1, "max": 32 } ],
		//"indent": [ WARN, 4 ], // TODO: fix code and enable rule
		"jsx-quotes": [ WARN, "prefer-double" ],
		"linebreak-style": [ WARN, "unix" ],
		"lines-around-comment": [ WARN, { "beforeBlockComment": true } ],
		"max-depth": [ WARN, 8 ],
		"max-len": [ WARN, 180 ],
		"max-nested-callbacks": [ WARN, 8 ],
		"max-params": [ WARN, 8 ],
		// "new-cap": WARN, // TODO: fix code and enable rule
		"new-parens": WARN,
		"no-array-constructor": WARN,
		"no-bitwise": OFF,
		"no-continue": OFF,
		"no-inline-comments": OFF,
		//"no-lonely-if": WARN, // TODO: fix code and enable rule
		"no-mixed-spaces-and-tabs": OFF, //WARN,
		"no-multiple-empty-lines": WARN,
		"no-negated-condition": OFF,
		"no-nested-ternary": WARN,
		"no-new-object": WARN,
		"no-plusplus": OFF,
		"no-spaced-func": WARN,
		"no-ternary": OFF,
		"no-trailing-spaces": WARN,
		"no-unneeded-ternary": WARN,
		"one-var": OFF,
		// "operator-assignment": [ WARN, "never" ], // TODO: fix code and enable rule
		"operator-linebreak": [ WARN, "after" ],
		"quote-props": OFF,
		"quotes": [ WARN, "single" ],
		// "require-jsdoc": [ WARN, {
		// 	"require": {
		// 		"FunctionDeclaration": true,
		// 		"MethodDefinition": true,
		// 		"ClassDeclaration": false
		// 	}
		// }],
		"semi-spacing": [ WARN, { "before": false, "after": true }],
		"semi": [ ERROR, "always" ],
		"sort-vars": OFF,
		"space-before-blocks": [ WARN, "always" ],
		"space-before-function-paren": [ WARN, "never" ],
		"keyword-spacing": [ WARN, {"before": true} ],
		"space-in-parens": [ WARN, "never" ],
		"space-infix-ops": [ WARN, { "int32Hint": true } ],
		"space-unary-ops": ERROR,
		"no-extra-semi": OFF // TODO: fix code and enable rule
	},

	"globals": {
		"jQuery": true,
		"estatico": true,
		"ScrollMagic": true,
		"_": true,
		"module": true,
		"Handlebars": true,
		"Base64": true
	}
};
