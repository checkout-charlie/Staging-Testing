# Staging-Testing

This tests the core functionality of staging.sparwelt.de.

To use it you need to have both the cypress and cypress-file-upload packages installed in the project.

Login credentials have to be be manually entered in your cypress.json file.
just add this after the projectID:
```javascript
  "env": {
    "admin" : your admin name,
    "admin_password" : your admin password,
    "user" : your username,
    "user_password" : "your user password
  }
```
