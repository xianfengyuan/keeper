const convict = require("convict");
const dotenv = require("dotenv");

dotenv.config();

const config = convict({
  server_name: {
    doc: "The REST API server name.",
    format: String,
    default: "localhost",
    env: "SERVER_NAME"
  },
});

config.validate({ allowed: "strict" });

module.exports = () => {
  return { code: "module.exports = " + JSON.stringify(config.getProperties()) };
};