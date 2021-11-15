module.exports = {
	extends: "@rarible/ts",
	parser: "@typescript-eslint/parser",
	plugins: [
		"jsx-a11y",
		"react",
		"react-hooks",
	],
	settings: {
		react: {
			version: "detect",
		},
	},
	overrides: [
		{
			files: ["**/*.ts?(x)"],
			parser: "@typescript-eslint/parser",
			parserOptions: {
				ecmaVersion: 2018,
				sourceType: "module",
				ecmaFeatures: {
					jsx: true,
				},

				// typescript-eslint specific options
				warnOnUnsupportedTypeScriptVersion: true,
			},
			plugins: ["@typescript-eslint"],
			// If adding a typescript-eslint version of an existing ESLint rule,
			// make sure to disable the ESLint rule here.
			rules: {
				// TypeScript"s `noFallthroughCasesInSwitch` option is more robust (#6906)
				"default-case": "off",
				// "tsc" already handles this (https://github.com/typescript-eslint/typescript-eslint/issues/291)
				"no-dupe-class-members": "off",
				// "tsc" already handles this (https://github.com/typescript-eslint/typescript-eslint/issues/477)
				"no-undef": "off",

				// Add TypeScript specific rules (and turn off ESLint equivalents)
				"@typescript-eslint/consistent-type-assertions": "warn",
				"no-array-constructor": "off",
				"@typescript-eslint/no-array-constructor": "warn",
				"no-use-before-define": "off",
				"@typescript-eslint/no-use-before-define": [
					"warn",
					{
						functions: false,
						classes: false,
						variables: false,
						typedefs: false,
					},
				],
				"no-unused-expressions": "off",
				"@typescript-eslint/no-unused-expressions": [
					"error",
					{
						allowShortCircuit: true,
						allowTernary: true,
						allowTaggedTemplates: true,
					},
				],
				"no-unused-vars": "off",
				"@typescript-eslint/no-unused-vars": [
					"warn",
					{
						args: "none",
						ignoreRestSiblings: true,
					},
				],
				"no-useless-constructor": "off",
				"@typescript-eslint/no-useless-constructor": "warn",
			},
		},
	],
	rules: {
		/* React options */
		"react-hooks/exhaustive-deps": "warn",
		"react/prop-types": "off",

		// https://github.com/yannickcr/eslint-plugin-react/tree/master/docs/rules
		"react/forbid-foreign-prop-types": [
			"warn",
			{
				allowInPropTypes: true,
			},
		],
		"react/jsx-no-comment-textnodes": "warn",
		"react/jsx-no-duplicate-props": "warn",
		"react/jsx-no-target-blank": "warn",
		"react/jsx-no-undef": "error",
		"react/jsx-pascal-case": [
			"warn",
			{
				allowAllCaps: true,
				ignore: [],
			},
		],
		"react/no-danger-with-children": "warn",
		// Disabled because of undesirable warnings
		// See https://github.com/facebook/create-react-app/issues/5204 for
		// blockers until its re-enabled
		// "react/no-deprecated": "warn",
		"react/no-direct-mutation-state": "warn",
		"react/no-is-mounted": "warn",
		"react/no-typos": "error",
		"react/require-render-return": "error",
		"react/style-prop-object": "warn",

		// https://github.com/evcohen/eslint-plugin-jsx-a11y/tree/master/docs/rules
		"jsx-a11y/alt-text": "warn",
		"jsx-a11y/anchor-has-content": "warn",
		"jsx-a11y/anchor-is-valid": [
			"warn",
			{
				aspects: ["noHref", "invalidHref"],
			},
		],
		"jsx-a11y/aria-activedescendant-has-tabindex": "warn",
		"jsx-a11y/aria-props": "warn",
		"jsx-a11y/aria-proptypes": "warn",
		"jsx-a11y/aria-role": [
			"warn",
			{
				ignoreNonDOM: true,
			},
		],
		"jsx-a11y/aria-unsupported-elements": "warn",
		"jsx-a11y/heading-has-content": "warn",
		"jsx-a11y/iframe-has-title": "warn",
		"jsx-a11y/img-redundant-alt": "warn",
		"jsx-a11y/no-access-key": "warn",
		"jsx-a11y/no-distracting-elements": "warn",
		"jsx-a11y/no-redundant-roles": "warn",
		"jsx-a11y/role-has-required-aria-props": "warn",
		"jsx-a11y/role-supports-aria-props": "warn",
		"jsx-a11y/scope": "warn",

		// https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks
		"react-hooks/rules-of-hooks": "error",
	},
}
