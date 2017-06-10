'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _log = require('./log.events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LogSchema = new _mongoose2.default.Schema({
  thesisId: String,
  studentId: String,
  checkpoint: Number,
  time: Date
});

(0, _log.registerEvents)(LogSchema);
exports.default = _mongoose2.default.model('Log', LogSchema);
//# sourceMappingURL=log.model.js.map
