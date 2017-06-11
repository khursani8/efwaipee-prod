'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _thesis = require('./thesis.events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ThesisSchema = new _mongoose2.default.Schema({
    name: String,
    studentId: String,
    studentName: String,
    examinerName: String,
    examinerId: String,
    examinerPhone: String,
    checkpoint: {
        type: Number,
        default: 1,
        max: 4
    }
});

(0, _thesis.registerEvents)(ThesisSchema);
exports.default = _mongoose2.default.model('Thesis', ThesisSchema);
//# sourceMappingURL=thesis.model.js.map
