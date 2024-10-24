const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: ["aws-sdk"], // Add "aws-sdk" to the transpileDependencies array
});


module.exports = {
  pages: {
    index: {
      entry: "src/views/Login/main.js",
      template: "public/index.html",
      title: "Landing Page",
      filename: "index.html",
      chunks: ["chunk-vendors", "chunk-common", "index"],
    },
    registration: {
      entry: "src/views/Registration/registration.js",
      template: "public/registration.html",
      title: "Registration Page",
      filename: "registration.html",
      chunks: ["chunk-vendors", "chunk-common", "registration"],
    },
    home: {
      entry: "src/views/Home/home.js",
      template: "public/home.html",
      title: "Home Page",
      filename: "home.html",
      chunks: ["chunk-vendors", "chunk-common", "home"],
    },
    businessHome: {
      entry: "src/views/Business/businessHome.js",
      template: "public/businessHome.html",
      title: "BusinessHome Page",
      filename: "businessHome.html",
      chunks: ["chunk-vendors", "chunk-common", "businessHome"],
    },
    
  },
  devServer: {
    allowedHosts: "all"
  }
};
