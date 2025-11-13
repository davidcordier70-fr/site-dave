const { readFileSync } = require("fs");

const key = readFileSync("./keys/jwtRS256.key", { encoding: "utf8" });
const keyPub = readFileSync("./keys/jwtRS256.key.pub", {
  encoding: "utf-16le",
});


module.exports = {
  key,
  keyPub,
};
