'use strict';
/*eslint no-process-env:0*/

// Development specific configuration
// ==================================

module.exports = {

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://sani:sani@ds061248.mlab.com:61248/cgs' || 'mongodb://localhost/efwaipee-dev'
  },

  // Seed database on startup
  seedDB: true

};
//# sourceMappingURL=development.js.map
