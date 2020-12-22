module.exports = function (sequelize, DataTypes) {
  const cartItem = sequelize.define(
    "cartItem",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 255],
        },
      },

      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 255],
        },
      },
      purchased: { type: DataTypes.BOOLEAN, defaultValue: false },
      url: {
        type: DataTypes.STRING,
      },
    },
    {
      freezeTableName: true,
    }
  );

  cartItem.associate = function (models) {
    cartItem.belongsTo(models.User, {
      foreignKey: "UserId",
    });

    cartItem.belongsTo(models.Listing, {
      foreignKey: "ListingId",
      onDelete: "cascade",
    });
  };

  return cartItem;
};
