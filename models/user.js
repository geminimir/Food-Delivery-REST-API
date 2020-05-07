module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users_table", {
        id: {
            type: Sequelize.String,
            required: true
        },
        first_name: {
            type: Sequelize.String,
            required: true
        },
        last_name: {
            type: Sequelize.String,
            required: true
        },
        email: {
            type: Sequelize.String,
            required: true
        },
        password: {
            type: Sequelize.String,
            required: true
        },
        phone_number: {
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
    return User;
}