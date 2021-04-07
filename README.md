# Kilogram messenger
## Table of contents
[Project Structure](#project-structure)

## Project Structure
```bash
├── Kilogram                # Express.js app
│   └── app.js              # App entry point
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