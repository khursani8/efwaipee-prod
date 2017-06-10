/**
 * Log model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerEvents = undefined;

var _events = require('events');

var LogEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
LogEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Log) {
  for (var e in events) {
    var event = events[e];
    Log.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function (doc) {
    LogEvents.emit(event + ':' + doc._id, doc);
    LogEvents.emit(event, doc);
  };
}

exports.registerEvents = registerEvents;
exports.default = LogEvents;
//# sourceMappingURL=log.events.js.map
