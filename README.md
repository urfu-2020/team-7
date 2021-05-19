# Kilogram messenger
## Table of contents
[Project Structure](#project-structure) \
[Main commands](#main-commands) \
[Linter Usage](#linter-usage)

## Project Structure
```bash
├── Kilogram                # Express.js app
│   └── app.js              # App entry point
│   └── routes.js           # App routing resolver
│   └── api                 # Express route controllers for all the endpoints of the app
│   └── config              # Environment variables and configuration related stuff
│   └── jobs                # Jobs definitions for agenda.js
│   └── loaders             # Split the startup process into modules
│   └── models              # Database models
│   └── services            # All the business logic is here
│   └── subsribers          # Event handlers for async task
├── README.md               # README file
├── static                  # Folder for static files (css, js, images and etc)
└── templates               # Folder for html templates
```
## Main commands
#### App running
We are using npm scripts to run our app, so...
> To run application in **debug** mode use
>```bash
>npm run startd
>```
> To run application in **production** mode use
>```bash
>npm run start
>```
> To run linters use
>```bash
>npm run lint
>```

## Linter Usage
#### stylelint
To print stylelint errors, use:
```bash
npx stylelint "**/*.css"
```
To integrate stylelint in Webstorm:
> 1. Go to Preference → Languages and Frameworks → Style Sheets → Stylelint
> 2. Check enable checkbox

#### eslint
To print eslint problems, use:
```bash
npx eslint .
```
To fix eslint problems, use:
```bash
npx eslint --fix .
```
To integrate eslint in Webstorm:
> 1. Go to Preferences → Languages & Frameworks → JavaScript → Code Quality Tools → ESLint
> 2. Check Automatic ESLint configuration
> 3. Check Run eslint --fix on save
