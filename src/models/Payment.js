module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('Payment', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    jobId: { type: DataTypes.INTEGER, allowNull: false },
    operationDate: { type: DataTypes.DATE, allowNull: false },
    paymentValue: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  });


  Payment.associate = (models) => {
    Payment.belongsTo(models.Job, { foreignKey: 'jobId', as: 'job' });
  };

  return Payment;
};
