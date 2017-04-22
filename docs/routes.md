# Routes

## Next

name                         | method | description
---------------------------- | ------ | -------------------------
/                            |        | Index page
/help                        |        | Help page
/login                       |        | Login page
/new                         |        | Create a new issue
/rv-req/new                  |        | Request a new RV
/rv/:rendezvous              |        | Show issues in rendezvous
/rv/:rendezvous/:issueNumber |        | Show specific issue
/rv/:rendezvous/wiki         |        | Wiki
/settings                    |        | settings page

## Express

name                               | method | description
---------------------------------- | ------ | -----------------------------------
/auth/github                       |        | authenticate via github
/auth/github/callback              |        | callback handler for authentication
/api/session                       | GET    | get session info
/api/session                       | GET    | invalidate session
/api/rendezvous                    | GET    | get rendezvouses
/api/rendezvous                    | POST   | create rendezvous
/api/rendezvous/:rendezvous        | GET    | show a rendezvouses
/api/rendezvous/:rendezvous        | PUT    | modify a rendezvouses
/api/rendezvous/:rendezvous/issues | GET    | show issue list
/api/rendezvous/:rendezvous/issues | PUT    | modify a rendezvouses
/api/temporary-files               | POST   | upload temporary files
/api/resources                     | GET    | show uploaded files(of S3)
