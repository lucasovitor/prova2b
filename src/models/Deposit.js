module.exports = (sequelize, DataTypes) => {
  const Deposit = sequelize.define('Deposit', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    clientId: { type: DataTypes.INTEGER, allowNull: false },
    operationDate: { type: DataTypes.DATE, allowNull: false },
    depositValue: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  });

  Deposit.associate = (models) => {
    Deposit.belongsTo(models.Profile, { foreignKey: 'clientId', as: 'client' });
  };

  return Deposit;
};
