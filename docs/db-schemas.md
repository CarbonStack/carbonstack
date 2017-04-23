# DB Schemas

## User

name             | type     | description
---------------- | -------- | ---------------------
`name`           | `String` | Displaying user name
`emails[]`       | `Object` | User e-mails(hidden)
`emails[].value` | `String` | E-mail address
`githubId`       | `Object` | Github id
`githubName`     | `String` | Github user name
`photos[]`       | `Object` | Profile images
`photos[].value` | `String` | URLs of profile image

## Rendezvous

Some kind of category for issues

Due to the singular and plural form of Rendezvous are same, we usally use `rv` and `rvs` to distinguish a single instance from an array of instances.

name          | type     | description
------------- | -------- | ---------------------------------
`uniqueName`  | `String` | name for URI, must be lower case
`name`        | `String` | Displaying name
`description` | `String` | brief description of a rendezvous

## Subscription

name   | type       | description
------ | ---------- | -------------------
`rv`   | `ObjectId` | rv to be subscribed
`user` | `ObjectId` | user to subscribe

## Issue

name      | type               | description
--------- | ------------------ | -----------------------------------------
`title`   | `String`           | title
`content` | `String`           | content
`type`    | `String:link,note` | type of issue
`link`    | `String`           | link URL
`image`   | `String`           | image URL
`writer`  | `ObjectId`         | an user who write the issue
`number`  | `Number`           | issue number like github, must be integer
`rv`      | `ObjectId`         | rendezvous where the issue written in

## Comment

name      | type       | description
--------- | ---------- | -------------------------------
`content` | `String`   | content
`writer`  | `ObjectId` | an user who write the comment
`issue`   | `ObjectId` | post where the issue written in
