# MongoMate [![Build Status](https://travis-ci.org/bencevans/mongomate.png?branch=master)](https://travis-ci.org/bencevans/mongomate)

Standalone or [ExpressJS](http://expressjs.com) mountable MongoDB Explorer.

![Demo Screenshot](http://cl.ly/image/2m33210D3Z23/Screen%20Shot%202013-01-06%20at%2021.30.30.png)

## Installation

### Standalone

Install Globaly from NPM:

    npm install -g mongomate

Run:

    mongomate [mongodb uri] [admin username] [admin password]

If `[mongodb uri]` isn't provided it will default to localhost.

Example:

    mongomate mongodb://mongohost.com:2751 bencevans 

### Express Mounted

  
    npm install mongomate

```javascript
// mongoClient can be a mongodb server connection or a mongodb server (no db uri)
var mongoClient = 'mongodb://localhost';

// Create the MongoMate Instance
var mongomate = require('mongomate')(mongoClient);

// If you need authentication for the admin client replace the previous line with
var mongomate = require('mongomate')(mongoClient, {
    auth {
        username: 'ADMIN_USERNAME',
        username: 'ADMIN_PASSWORD',
    }
});

// Add this line in your app.configure(function() { ...
app.use('/mongomate', mongomate);
  ```
  
Now when you go to <http://yourapp/mongomate>, you'll get a MongoMate Interface

