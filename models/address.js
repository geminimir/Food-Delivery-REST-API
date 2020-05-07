module.exports = (sequelize, Sequelize) => {
    const Address = sequelize.define("addresses_table", {
        id: {
            type: Sequelize.String,
            required: true
        },
        customer_id: {
            type: Sequelize.String,
            required: true
        },
        street_number: {
            type: Sequelize.String,
            required: true
        },
        street_name: {
            type: Sequelize.String,
            required: true
        },
        province: {
            type: Sequelize.String,
            required: true
        },
        city: {
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
    return Address;
}