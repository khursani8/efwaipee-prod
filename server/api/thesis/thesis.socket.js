/**
 * Broadcast updates to client when the model changes
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = register;

var _thesis = require('./thesis.events');

var _thesis2 = _interopRequireDefault(_thesis);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Model events to emit
var events = ['save', 'remove'];

function register(socket) {
  // Bind model events to socket events
  for (var i = 0, eventsLength = events.length; i < eventsLength; i++) {
    var event = events[i];
    var listener = createListener('thesis:' + event, socket);

    _thesis2.default.on(event, listener);
    socket.on('disconnect', removeListener(event, listener));
  }
}

function createListener(event, socket) {
  return function (doc) {
    socket.emit(event, doc);
  };
}

function removeListener(event, listener) {
  return function () {
    _thesis2.default.removeListener(event, listener);
  };
}
//# sourceMappingURL=thesis.socket.js.map
