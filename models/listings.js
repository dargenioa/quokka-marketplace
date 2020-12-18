module.exports = function (sequelize, DataTypes) {
  const Listing = sequelize.define("Listing", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 255],
      },
    },
    description: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      validate: {
        len: [1, 255],
      },
    },
    purchased: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    url: {
      type: DataTypes.STRING,
    }
  },
  {
    freezeTableName: true

  }
  );

  Listing.associate = function (models) {
    // We're saying that a listing should belong to a User
    // A Post can't be created without a User due to the foreign key constraint
    Listing.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Listing;
};
