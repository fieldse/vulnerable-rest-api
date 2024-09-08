# Vulnerable REST API

## Summary

This is an **intentionally vulnerable** REST API for an HTML form handler. This API will be vulnerable to SQL injection and possibly IDOR vulnerable.

Written in Node.js with Express framework.

## Purpose

This provides an intentionally vulnerable API for a form handler, to allow penetration testers to experiment with SQL injection and IDOR attacks.

This provides a simple login/logout function with unencrypted passwords, as well as a contact form message handler.

Login authorization is stored to cookie with user ID and email.

No tokens, no validation beyond initial password check, no password encryption. :-)

## Installation

1. You'll need to install Node.js on your web server.
2. You'll need a MySQL database running on the same host (or elsewhere). By default, it expects a MySQL database server running on localhost at port `3306`. Can set the DB_HOST environment variable to change this.

After that, install the project:

```
npm install
```

## Usage

1. Install the project.
2. Start your MySQL server.
3. Start the API server.

```
npm start
```

This start an API running on port 3000 on your webserver. Frontend code (AKA your website with the login page) will need to make an AJAX request to the REST API endpoints.

4. Initialize and seed your database.

There is a MySQL script in `/sql` directory, which is to initialize your database and insert seed users and passwords. You can adjust this manually, and run it directly in the MySQL console or by running `npm run db:seed`

_TODO_: set up `seed` script.

## API Documentation

These are the API endpoints:

- `POST /login` - Accepts `username` and `password` in request body. Returns `{"success": true, "userId": [int] }` on login success, and sets a cookie.
- `POST /logout` - Clears the login cookie.
- `POST /contact` - Accepts `email`, `name`, and `message` parameters in request body. Stores to
- `POST /password-reset` - Accepts `userId` and `password` parameters in request body. Expects current user to be authenticated.
- `GET  /users` - Returns list of users.
- `GET  /users/1` - Returns single user by ID.

## Configuration

1. Edit seed users
   You can edit your `seed-db.sql` script as needed to edit the default users and passwords.

2. Change database URI
   If you want to host your database elsewhere, change it in `.env`.

## Hints

1. Explore how the authorization data is stored on the client after login.
2. Experiment with SQL injection.
3. Try direct reference of things you shouldn't be able to access.

## License

Do what you like. Credit me if you use this.

## Maintainer

Matt Fields

- [hello@mattfields.dev](mailto:hello@mattfields.dev)
- Github: [fieldse][https://github.com/fieldse]
