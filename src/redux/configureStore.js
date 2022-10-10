// Use CommonJS require bellow so we can dynamically import during build time
if (process.env.NODE_ENV === "production") {
  module.exports = require("./configureStore.prod");
} else {
  module.exports = require("./configureStore.dev");
}

// dynamically import the appropiate file at builing time
// CommonJS was popularized by Node, has dif syntax for import/export
