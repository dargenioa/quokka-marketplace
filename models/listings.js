module.exports = function (sequelize, DataTypes) {
  const Listing = sequelize.define(
    "Listing",
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
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
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
      },
    },
    {
      freezeTableName: true,
    }
  );

  Listing.associate = function (models) {
    // We're saying that a listing should belong to a User
    // A listing can't be created without a User due to the foreign key constraint
    Listing.belongsTo(models.User, {
      foreignKey: "UserId",
    });
    Listing.hasMany(models.cartItem, {
      foreignKey: "ListingId",
      onDelete: "cascade",
    });
  };

  return Listing;
};
