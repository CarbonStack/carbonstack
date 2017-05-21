# Routes

## Next

name                        | method | description
--------------------------- | ------ | -------------------------
/                           |        | Index page
/help                       |        | Help page
/login                      |        | Login page
/new-group                  |        | Request a new RV
/g/:rendezvous              |        | Show issues in rendezvous
/g/:rendezvous/new          |        | Show issues in rendezvous
/g/:rendezvous/:issueNumber |        | Show specific issue
/g/:rendezvous/wiki         |        | Wiki
/settings                   |        | settings page

## Express

name                           | method | description
------------------------------ | ------ | -----------------------------------
/auth/github                   |        | authenticate via github
/auth/github/callback          |        | callback handler for authentication
/api/session                   | GET    | get session info
/api/session                   | GET    | invalidate session
/api/groups                    | GET    | get rendezvouses
/api/groups                    | POST   | create rendezvous
/api/groups/:rendezvous        | GET    | show a rendezvouses
/api/groups/:rendezvous        | PUT    | modify a rendezvouses
/api/groups/:rendezvous/issues | GET    | show issue list
/api/groups/:rendezvous/issues | PUT    | modify a rendezvouses
/api/temporary-files           | POST   | upload temporary files
/api/files                     | GET    | show uploaded files(of S3)
