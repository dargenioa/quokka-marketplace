module.exports = function (sequelize, DataTypes) {
  let Listing = sequelize.define("Listing", {
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
    photo: {
        //make this DataTypes.STRING  ?
      type: DataTypes.BLOB("long"),
    },
    url: {
        type: DataTypes.STRING,
    }
  });
  return Listing;
};
