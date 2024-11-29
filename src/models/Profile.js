module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profession: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    balance: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    type: {
      type: DataTypes.ENUM('client', 'contractor', 'admin'),
      allowNull: false,
    },
  }, {
    tableName: 'profiles',
    timestamps: false,
  });

  Profile.associate = (models) => {
    Profile.hasMany(models.Contract, {
      foreignKey: 'clientId',
      as: 'clientContracts',
    });

    Profile.hasMany(models.Contract, {
      foreignKey: 'contractorId',
      as: 'contractorContracts',
    });

    Profile.hasMany(models.Deposit, {
      foreignKey: 'clientId',
      as: 'deposits',
    });
  };

  return Profile;
};
