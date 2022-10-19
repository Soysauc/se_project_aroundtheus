const presets = [
  [
    "@babel/env",
    {
      // which preset to use
      targets: "defaults, not IE 11, not dead",
​
      // use browser polyfills from target property
      // by default babel uses core-js library pollyfills
      useBuiltIns: "entry",
    },
  ],
];
​
module.exports = { presets };