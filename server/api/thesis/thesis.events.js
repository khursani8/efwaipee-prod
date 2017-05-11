/**
 * Thesis model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerEvents = undefined;

var _events = require('events');

var ThesisEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
ThesisEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Thesis) {
  for (var e in events) {
    var event = events[e];
    Thesis.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function (doc) {
    ThesisEvents.emit(event + ':' + doc._id, doc);
    ThesisEvents.emit(event, doc);
  };
}

exports.registerEvents = registerEvents;
exports.default = ThesisEvents;
//# sourceMappingURL=thesis.events.js.map
