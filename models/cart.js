module.exports = function (sequelize, DataTypes) {
    const Cart = sequelize.define("Cart", {
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
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
        purchased: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        url: {
            type: DataTypes.STRING,
        }
    },
        {
            freezeTableName: true

        }
    );

    return Cart;
};