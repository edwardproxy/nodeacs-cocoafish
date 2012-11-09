NODE.ACS
(M)VC framework demo.

https://github.com/visionmedia/express/wiki/Migrating-from-2.x-to-3.x

This app is using express-partials(https://github.com/publicclass/express-partials) for view system.

Things to do,
  - dynamic flash message
  - current user setting // oauth trouble
  - user auth
  - custom fields
  - geo coords

optional
  - better chats
  - styles
  - ajax object search on textfields


Routes
  defined in config.json under routes array.
  { "path": "/login", "method": "get", "callback": "application#login" }
  path: url path.
  method: only works for get & post by default(I believe).
  callback: <controller>#<function>

  * to select all
  { "path": "*", "method": "get", "callback": "application#page_not_found" }
