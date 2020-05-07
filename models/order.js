module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("orders_table", {
        id: {
            type: Sequelize.String,
            required: true
        },
        customer_id: {
            type: Sequelize.String,
            required: true
        },
        employee_id: {
            type: Sequelize.String,
            required: true
        },
        status: {
            type: Sequelize.INT,
            required: true
        },
        delivery_address_id: {
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
    return Order;
}