"use strict";
const Beer = require("./beer");

async function init() {
  await Beer.sync();
}
init();
module.exports = {
  Beer
};
