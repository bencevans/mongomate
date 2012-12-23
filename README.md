# MongoMate

![Demo Screenshot](http://cl.ly/image/3S2Q1I2a0T0A/Screen%20Shot%202012-12-23%20at%2018.17.03.png)

Standalone or [ExpressJS](http://expressjs.com) mountable MongoDB Explorer.

## Installtion

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
