module.exports = (sequelize, Sequelize) => {
    const Employee = sequelize.define("employees_table", {
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
        user_permissions: {
            type: Sequelize.INT,
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
    return Employee;
}