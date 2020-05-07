module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("users_table", {
        id: {
            type: Sequelize.String,
            required: true
        },
        product_name: {
            type: Sequelize.String,
            required: true
        },
        product_description: {
            type: Sequelize.String,
            required: true
        },
        category_id: {
            type: Sequelize.String,
            required: true
        },
        price: {
            type: Sequelize.float,
            required: true
        },
        rating: {
            type: Sequelize.float,
            required: true
        },
        image_url: {
            type: Sequelize.String,
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