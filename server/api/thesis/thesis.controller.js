/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/thesis              ->  index
 * POST    /api/thesis              ->  create
 * GET     /api/thesis/:id          ->  show
 * PUT     /api/thesis/:id          ->  upsert
 * PATCH   /api/thesis/:id          ->  patch
 * DELETE  /api/thesis/:id          ->  destroy
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.index = index;
exports.show = show;
exports.showStudent = showStudent;
exports.showThesis = showThesis;
exports.create = create;
exports.upsert = upsert;
exports.patch = patch;
exports.destroy = destroy;

var _fastJsonPatch = require('fast-json-patch');

var _fastJsonPatch2 = _interopRequireDefault(_fastJsonPatch);

var _thesis = require('./thesis.model');

var _thesis2 = _interopRequireDefault(_thesis);

var _log = require('../log/log.model');

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var accessKeyId = process.env.aKId;
var secretAccessKey = process.env.secret;

var AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1', accessKeyId: accessKeyId, secretAccessKey: secretAccessKey });
var sns = new AWS.SNS();

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {

  return function (entity) {
    var _this = this;

    patches.value = entity.checkpoint + 1;

    if (patches.value == 2) {
      //update all document to CGS SEND
      _thesis2.default.find({ 'studentId': entity.studentId }).exec().then(function (res1) {
        res1.forEach(function (el) {
          if (el.checkpoint < 3) {
            //kalau ada yg baru tak kan effect yg lama punya document
            try {
              _fastJsonPatch2.default.apply(el, [patches], /*validate*/true);
              _log2.default.create({ 'thesisId': el._id, 'checkpoint': el.checkpoint, time: new Date(), 'studentId': el.studentId });
              var params = {
                Message: 'Thesis from Universiti Teknologi Petronas have been sent to you.Please browse https://efwaipee.herokuapp.com/qrrecognizer and scan the QRcode inside the thesis',
                PhoneNumber: el.examinerPhone
              };
              sns.publish(params, function (err, data) {
                if (err) console.log(err, err.stack); // an error occurred
                else console.log(data); // successful response
              });
            } catch (err) {
              return _promise2.default.reject(err);
            }
            el.save();
          }
        }, _this);
      });
    }

    try {
      _fastJsonPatch2.default.apply(entity, [patches], /*validate*/true);
      _log2.default.create({ 'thesisId': entity._id, 'checkpoint': entity.checkpoint, time: new Date(), 'studentId': entity.studentId });
    } catch (err) {
      return _promise2.default.reject(err);
    }
    return entity.save();
  };
}

function removeEntity(res) {
  return function (entity) {
    if (entity) {

      return entity.remove().then(function () {
        _log2.default.find({
          'thesisId': entity._id
        }).remove().exec();
        res.status(204).end();
      });
    }
  };
}

function handleEntityNotFound(res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Thesiss
function index(req, res) {
  return _thesis2.default.find().exec().then(respondWithResult(res)).catch(handleError(res));
}

// Gets a single Thesis from the DB
function show(req, res) {
  return _thesis2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}

// Gets a single Thesis based on student Idfrom the DB
function showStudent(req, res) {
  return _thesis2.default.find({ "studentId": req.params.id }).exec().then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}

function showThesis(req, res) {
  // console.log("show Thesis",req.params.name);
  return _thesis2.default.find({ "name": { '$regex': req.params.name, '$options': 'i' } }).exec().then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}

// Creates a new Thesis in the DB
function create(req, res) {
  return _thesis2.default.create(req.body).then(function (el) {
    _log2.default.create({ 'thesisId': el._id, 'checkpoint': el.checkpoint, time: new Date(), 'studentId': el.studentId });
  }).then(respondWithResult(res, 201)).catch(handleError(res));
}

// Upserts the given Thesis in the DB at the specified ID
function upsert(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return _thesis2.default.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true }).exec().then(respondWithResult(res)).catch(handleError(res));
}

// Updates an existing Thesis in the DB
function patch(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }

  return _thesis2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(patchUpdates(req.body)).then(respondWithResult(res)).catch(handleError(res));
}

// Deletes a Thesis from the DB
function destroy(req, res) {
  return _thesis2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(removeEntity(res)).catch(handleError(res));
}
//# sourceMappingURL=thesis.controller.js.map
