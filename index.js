//Exercise 4.3-4-7

//Status: added jester and node to .eslintrc.js

const app = require("./app");
const http = require("http");
const config = require("./utils/config");

const server = http.createServer(app);

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
