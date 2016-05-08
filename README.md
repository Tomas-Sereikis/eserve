## eServe

eServe is a express server with simple API for static files serving and http proxing.
The problem that eServe is solving is a simple API based library that mounts static files and HTTP proxies onto express app and serves them.

### Example

Install eServe

`npm install eserve --save`


Your index.js or some other file for serving and proxing.

```javascript
const eserve = require('eserve');

// serve build files
eserve.statics('build');
// serve proxy api
eserve.proxy('/api/fixer', 'http://api.fixer.io/latest');
// start server on 3000 port and localhost
eserve.start(3000, 'localhost');
```