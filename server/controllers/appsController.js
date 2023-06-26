const appsController = {
  getApps: (req, res, next) => {
    const tableName = 'application'
    const query = `SELECT * FROM ${tableName}`;

    return next();
  },

  addApp: (req, res, next) => {
    return next();
  },

  editApp: (req, res, next) => {
    return next();
  },

  deleteApp: (req, res, next) => {
    return next();
  },
};

module.exports = appsController;
