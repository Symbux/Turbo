/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable sonarjs/no-duplicate-string */

module.exports = {
	root: true,
	env: {
		node: true,
		browser: true,
		es6: true,
		es2021: true,
		es2022: true,
		es2023: true,
		commonjs: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:security/recommended',
		'plugin:no-unsanitized/DOM',
		'plugin:xss/recommended',
		'plugin:sonarjs/recommended',
	],
	plugins: [
		'@typescript-eslint/eslint-plugin',
		'eslint-plugin-no-unsanitized',
		'eslint-plugin-node',
		'eslint-plugin-security',
		'eslint-plugin-sonarjs',
		'eslint-plugin-xss',
	],
	parserOptions: {
		ecmaVersion: 2023,
		parser: require.resolve('@typescript-eslint/parser'),
	},
	rules: {
		/* --------------------------------------------------
			Standard Rules
		-------------------------------------------------- */
		indent: 0,
		semi: ['error', 'always'],
		quotes: ['error', 'single'],
		'no-console': 0,
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-use-before-define': 0,
		'no-useless-constructor': 0,
		'scss/vendorPrefix': 0,
		'func-call-spacing': 0,
		'no-new': 0,
		'array-bracket-spacing': 0,
		'prefer-promise-reject-errors': 0,
		'padded-blocks': 0,
		'n/no-callback-literal': 0,
		'no-tabs': 0,
		'no-useless-return': 0,
		'operator-linebreak': ['error', 'before'],
		'keyword-spacing': [
			'error', {
				overrides: {
					catch: {
						before: true,
						after: false,
					},
				},
			},
		],
		'no-trailing-spaces': ['error', {
			ignoreComments: true,
			skipBlankLines: false,
		}],
		'space-before-function-paren': ['error', {
			anonymous: 'never',
			named: 'never',
			asyncArrow: 'always',
		}],
		'comma-dangle': ['error', {
			arrays: 'always-multiline',
			objects: 'always-multiline',
			imports: 'always-multiline',
			exports: 'always-multiline',
			functions: 'always-multiline',
		}],

		/* --------------------------------------------------
			TypeScript Rules
		-------------------------------------------------- */
		'@typescript-eslint/indent': ['error', 'tab'],
		'@typescript-eslint/no-explicit-any': 0,
		'@typescript-eslint/explicit-member-accessibility': ['error'],
		'@typescript-eslint/interface-name-prefix': 0,
		'@typescript-eslint/camelcase': 0,
		'@typescript-eslint/no-useless-constructor': ['error'],
		'@typescript-eslint/explicit-module-boundary-types': 0,
		'@typescript-eslint/consistent-type-imports': ['error', {
			'prefer': 'no-type-imports', // Needed for decorators.
		}],
		'@typescript-eslint/ban-ts-comment': ['error', {
			'ts-expect-error': 'allow-with-description',
			'ts-ignore': 'allow-with-description',
			'ts-nocheck': 'allow-with-description',
			'ts-check': 'allow-with-description',
			minimumDescriptionLength: 25,
		}],
		'@typescript-eslint/naming-convention': ['error',
			{
				selector: 'default',
				format: ['PascalCase', 'camelCase', 'snake_case', 'UPPER_CASE'],
				leadingUnderscore: 'forbid',
			},
			{
				selector: 'function',
				format: ['PascalCase', 'camelCase'],
				leadingUnderscore: 'forbid',
			},
			{
				selector: 'variable',
				format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
				leadingUnderscore: 'allow',
			},
			{
				selector: 'memberLike',
				format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
				leadingUnderscore: 'allow',
			},
			{
				selector: 'interface',
				format: ['PascalCase'],
				custom: {
					regex: '^I[A-Z]',
					match: true,
				},
			},
		],

		/* --------------------------------------------------
			Security Rules
		-------------------------------------------------- */
		'security/detect-object-injection': 0,
		'security/detect-non-literal-regexp': 0,
		'security/detect-non-literal-fs-filename': 0,
		'no-unsanitized/method': 0,
		'sonarjs/no-collapsible-if': 0,
		'xss/no-location-href-assign': 0,
		'xss/no-mixed-html': 0,
		'sonarjs/no-nested-template-literals': 0,
		'sonarjs/no-duplicate-string': ['error', {
			threshold: 5,
		}],
		'sonarjs/cognitive-complexity': ['error', 250],
		'sonarjs/prefer-single-boolean-return': 0,
	},
};
