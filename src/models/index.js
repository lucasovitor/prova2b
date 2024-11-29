const { Sequelize, DataTypes } = require('sequelize');
const config = require('../database/config/config');
const sequelize = new Sequelize(config.development);

const Profile = require('./Profile')(sequelize, DataTypes);
const Contract = require('./Contract')(sequelize, DataTypes);
const Job = require('./Job')(sequelize, DataTypes);
const Deposit = require('./Deposit')(sequelize, DataTypes);
const Payment = require('./Payment')(sequelize, DataTypes);

const models = { Profile, Contract, Job, Deposit, Payment };

Object.values(models).forEach((model) => {
  if (model.associate) model.associate(models);
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
