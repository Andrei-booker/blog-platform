module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'airbnb',
		'prettier',
		'plugin:jsx-a11y/recommended',
		'plugin:react/jsx-runtime',
	],
	overrides: [
		{
			env: {
				node: true,
			},
			files: ['.eslintrc.{js,cjs}'],
			parserOptions: {
				sourceType: 'script',
			},
		},
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	rules: {
		'default-param-last': 0,
		'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
		'jsx-a11y/label-has-associated-control': [
			2,
			{
				assert: 'htmlFor',
				depth: 3,
			},
		],
		'react/jsx-props-no-spreading': [
			2,
			{
				html: 'ignore',
				custom: 'enforce',
			},
		],
	},
};
