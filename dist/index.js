"use strict";

var _express = _interopRequireDefault(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

var app = (0, _express.default)();
var PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("Servidor escuchando sobre el puerto", PORT);
});