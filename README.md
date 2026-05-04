# Simple Full-Stack Login Demo

This app uses Node.js, Express, vanilla HTML/CSS/JavaScript, and a JSON file for persistent storage.

The public page is a login submission form. Submitted passwords can be reviewed from the admin dashboard.

Saved submissions are stored in:

```text
data/submissions.json
```

## Folder Structure

```text
public/
  index.html
  admin.html
  styles.css
  login.js
  admin.js
server/
  server.js
data/
  submissions.json
package.json
```

## Run Locally

Quick open:

```text
open-site.bat
open-admin.bat
```

```bash
npm install
npm start
```

Open:

```text
http://localhost:3000
```

Admin dashboard:

```text
http://localhost:3000/admin
```

## API Endpoints

```text
POST /login
```

Receives a username and password, hashes the password, and saves the login submission.

```text
POST /demo-submit
```

Receives public form submissions and saves them so they can be displayed in the admin dashboard.

```text
GET /admin
```

When opened in a browser, serves the admin page. When requested by JavaScript with `Accept: application/json`, returns the stored login submissions.

```text
POST /admin/logout
```

Returns a simple logout response.

```text
DELETE /admin
```

Deletes all saved login submissions.
