module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("users_table", {
        id: {
            type: Sequelize.String,
            required: true
        },
        order_id: {
            type: Sequelize.String,
            required: true
        },
        amount: {
            type: Sequelize.float,
            required: true
        },
        transfer_on: {
            type: Sequelize.timestamp,
            required: true
        },
        payment_type: {
            type: Sequelize.float,
            required: true
        },
        payment_status: {
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
    return Product;
}