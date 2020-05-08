module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("users_table", {
        id: {
            type: Sequelize.String,
            required: true
        },
        description: {
            type: Sequelize.String,
            required: true
        },
        customer_id: {
            type: Sequelize.String,
            required: true
        },
        rating: {
            type: Sequelize.INT,
            required: true
        },
        product_id: {
            type: Sequelize.float,
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