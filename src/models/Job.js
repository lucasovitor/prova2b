module.exports = (sequelize, DataTypes) => {
  const Job = sequelize.define('Job', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    contractId: { type: DataTypes.INTEGER, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: true },
    operationDate: { type: DataTypes.DATE, allowNull: false },
    paymentDate: { type: DataTypes.DATE, allowNull: true },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    paid: { type: DataTypes.BOOLEAN, allowNull: false },
  });

  Job.associate = (models) => {
    Job.belongsTo(models.Contract, { foreignKey: 'contractId', as: 'contract' });
  };

  return Job;
};
