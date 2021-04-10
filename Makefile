run:
	node Kilogram/app.js
lint:
	node_modules/.bin/stylelint static/css/*.css
	node_modules/.bin/eslint *.js

