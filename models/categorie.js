module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define("categories_table", {
        id: {
            type: Sequelize.String,
            required: true
        },
        category_name: {
            type: Sequelize.String,
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
    return Category;
}