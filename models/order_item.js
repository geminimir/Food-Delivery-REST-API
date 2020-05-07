module.exports = (sequelize, Sequelize) => {
    const OrderItem = sequelize.define("users_table", {
        id: {
            type: Sequelize.String,
            required: true
        },
        order_id: {
            type: Sequelize.String,
            required: true
        },
        product_id: {
            type: Sequelize.String,
            required: true
        },
        quantity: {
            type: Sequelize.INT,
            required: true
        },
        created_at: {
            type: Sequelize.timestamp,
            required: true
        },
        modified_at: {
            type: Sequelize.timestamp,
            required: true
        },
        status_id: {
            type: Sequelize.INT,
            required: true
        }
    });
    return OrderItem;
}