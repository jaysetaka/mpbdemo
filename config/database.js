if (process.env.NODE_ENV === "production") {
  module.exports = {
    mongoURI: "mongodb://jabu:meditech18@ds229732.mlab.com:29732/demoapp"
  };
} else {
  module.exports = {
    mongoURI: "mongodb://jabu:meditech18@ds229732.mlab.com:29732/demoapp"
  };
}
