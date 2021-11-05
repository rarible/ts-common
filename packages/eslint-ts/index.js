/* eslint-disable unicorn/no-keyword-prefix */
var restrictedGlobals = require("confusing-browser-globals")

module.exports = {
	root: true,
	parser: "@typescript-eslint/parser",
	plugins: [
		"unicorn",
		"jest",
		"import",
		"@typescript-eslint",
	],
	env: {
		browser: true,
		commonjs: true,
		es6: true,
		jest: true,
		node: true,
	},
	rules: {
		"array-callback-return": "warn",
		"default-case": [
			"warn",
			{
				commentPattern: "^no default$",
			},
		],
		"dot-location": ["warn", "property"],
		"eqeqeq": ["warn", "smart"],
		"new-parens": "warn",
		"no-array-constructor": "warn",
		"no-caller": "warn",
		"no-cond-assign": ["warn", "except-parens"],
		"no-const-assign": "warn",
		"no-control-regex": "warn",
		"no-delete-var": "warn",
		"no-dupe-args": "warn",
		"no-dupe-class-members": "warn",
		"no-dupe-keys": "warn",
		"no-duplicate-case": "warn",
		"no-empty-character-class": "warn",
		"no-empty-pattern": "warn",
		"no-eval": "warn",
		"no-ex-assign": "warn",
		"no-extend-native": "warn",
		"no-extra-bind": "warn",
		"no-extra-label": "warn",
		"no-fallthrough": "warn",
		"no-func-assign": "warn",
		"no-implied-eval": "warn",
		"no-invalid-regexp": "warn",
		"no-iterator": "warn",
		"no-label-var": "warn",
		"no-labels": [
			"warn",
			{
				allowLoop: true,
				allowSwitch: false,
			},
		],
		"no-lone-blocks": "warn",
		"no-loop-func": "warn",
		"no-mixed-operators": [
			"warn",
			{
				groups: [
					["&", "|", "^", "~", "<<", ">>", ">>>"],
					["==", "!=", "===", "!==", ">", ">=", "<", "<="],
					["&&", "||"],
					["in", "instanceof"],
				],
				allowSamePrecedence: false,
			},
		],
		"no-multi-str": "warn",
		"no-native-reassign": "warn",
		"no-negated-in-lhs": "warn",
		"no-new-func": "warn",
		"no-new-object": "warn",
		"no-new-symbol": "warn",
		"no-new-wrappers": "warn",
		"no-obj-calls": "warn",
		"no-octal": "warn",
		"no-octal-escape": "warn",
		"no-regex-spaces": "warn",
		"no-restricted-syntax": ["warn", "WithStatement"],
		"no-script-url": "warn",
		"no-self-assign": "warn",
		"no-self-compare": "warn",
		"no-sequences": "warn",
		"no-shadow-restricted-names": "warn",
		"no-sparse-arrays": "warn",
		"no-template-curly-in-string": "warn",
		"no-this-before-super": "warn",
		"no-throw-literal": "warn",
		"no-undef": "error",
		"no-restricted-globals": ["error"].concat(restrictedGlobals),
		"no-unreachable": "warn",
		"no-unused-expressions": [
			"error",
			{
				allowShortCircuit: true,
				allowTernary: true,
				allowTaggedTemplates: true,
			},
		],
		"no-unused-labels": "warn",
		"no-unused-vars": "off",
		"no-use-before-define": "off",
		"no-useless-computed-key": "warn",
		"no-useless-concat": "warn",
		"no-useless-constructor": "off",
		"no-useless-escape": "warn",
		"no-useless-rename": [
			"warn",
			{
				ignoreDestructuring: false,
				ignoreImport: false,
				ignoreExport: false,
			},
		],
		"no-with": "warn",
		"no-whitespace-before-property": "warn",
		"require-yield": "warn",
		"rest-spread-spacing": ["warn", "never"],
		"strict": ["warn", "never"],
		"unicode-bom": ["warn", "never"],
		"use-isnan": "warn",
		"valid-typeof": "warn",

		/* General options */
		"eol-last": "off",
		"getter-return": "warn",
		"array-bracket-spacing": ["error", "never"],
		"max-len": [
			"error",
			{
				code: 120,
				tabWidth: 2,
				ignorePattern: "^import.*$",
				ignoreUrls: true,
				ignoreComments: false,
				ignoreRegExpLiterals: true,
				ignoreStrings: true,
				ignoreTemplateLiterals: true,
			},
		],
		"no-trailing-spaces": [
			"error",
			{
				skipBlankLines: false,
				ignoreComments: false,
			},
		],
		"object-property-newline": [
			"error",
			{
				allowAllPropertiesOnSameLine: true,
			},
		],
		"semi-style": ["error", "last"],
		"semi-spacing": [
			"error", {
				before: false,
				after: true,
			},
		],
		"brace-style": [
			"error",
			"1tbs",
			{
				allowSingleLine: true,
			},
		],
		"block-spacing": ["error", "always"],
		"key-spacing": [
			"error",
			{
				beforeColon: false,
				afterColon: true,
			},
		],
		camelcase: [
			"error",
			{
				properties: "never",
				ignoreDestructuring: false,
			},
		],
		"no-plusplus": [
			"error",
			{
				allowForLoopAfterthoughts: true,
			},
		],
		"comma-dangle": [
			"error",
			"always-multiline",
		],
		"comma-style": [
			"error", "last",
			{
				exceptions: {
					ArrayExpression: false,
					ArrayPattern: false,
					ArrowFunctionExpression: false,
					CallExpression: false,
					FunctionDeclaration: false,
					FunctionExpression: false,
					ImportDeclaration: false,
					ObjectExpression: false,
					ObjectPattern: false,
					VariableDeclaration: false,
					NewExpression: false,
				},
			},
		],
		"new-cap": [
			"error",
			{
				newIsCap: true,
				newIsCapExceptions: [],
				capIsNew: false,
				capIsNewExceptions: ["Immutable.Map", "Immutable.Set", "Immutable.List"],
			},
		],
		"no-multi-assign": ["error"],
		"no-multiple-empty-lines": [
			"error",
			{
				max: 2,
				maxBOF: 1,
				maxEOF: 0,
			},
		],
		"no-nested-ternary": "error",

		/** Typescript extension */
		"@typescript-eslint/no-unused-vars": "warn",
		"@typescript-eslint/no-use-before-define": "off",
		"@typescript-eslint/quotes": [
			"error",
			"double",
			{
				avoidEscape: true,
			},
		],
		"@typescript-eslint/semi": ["error", "never"],
		"@typescript-eslint/indent": [
			"error",
			"tab",
			{
				SwitchCase: 1,
			},
		],
		"@typescript-eslint/comma-spacing": [
			"error",
			{
				before: false,
				after: true,
			},
		],
		"@typescript-eslint/consistent-type-imports": [
			"error",
			{
				prefer: "type-imports",
				disallowTypeAnnotations: false,
			},
		],

		/* Import options */
		"import/no-default-export": "error",
		"import/first": "error",
		"import/no-amd": "error",
		"import/no-anonymous-default-export": "warn",
		"import/no-webpack-loader-syntax": "error",
		"import/order": [
			"error",
			{
				groups: ["builtin", "external", "parent", "sibling", "index"],
			},
		],

		/* Unicorn options */
		"unicorn/filename-case": [
			"error",
			{
				case: "kebabCase",
			},
		],
		"unicorn/error-message": "error",
		"unicorn/custom-error-definition": "error",
		"unicorn/new-for-builtins": "error",
		"unicorn/no-abusive-eslint-disable": "error",
		"unicorn/no-empty-file": "error",
		"unicorn/no-instanceof-array": "error",
		"unicorn/no-keyword-prefix": "error",
	},
}
