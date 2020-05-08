const router = require('express').Router();
const uuid = require("uuid");

//get list of all addresses
router.get('/', async (req, res) => {
    var sql = "SELECT * FROM ?";
    var table = ["addresses_table"];

    var query = mysql.format(sql, table);
    mysqlConnection.query(query, (err, rows) => {
        if (err) {
            res.json({"Error": true, "Message": "Error executing MySQL query"});
        } else {
            res.json(rows);
        }
    });
});

//get list of addresses of a user by user_id
router.get('/:customer_id', async (req, res) => {
    var customer_id = req.params.customer_id;
    var sql = "SELECT * FROM ? WHERE ? = ?";
    var table = ["addresses_table", "customer_id", customer_id];

    var query = mysql.format(sql, table);
    mysqlConnection.query(query, (err, rows) => {
        if (err) {
            res.json({"Error": true, "Message": "Error executing MySQL query"});
        } else {
            res.json(rows);
        }
    });
});

//get address by id
router.get('/:address_id', (req, res) => {
    var address_id = req.params.address_id;
    var sql = "SELECT * FROM ? WHERE ?=?";
    var table = ["addresses_table", "id", address_id];

    var query = mysql.format(sql, table);

    mysqlConnection.query(query, (err, rows) => {
        if (err) {
            res.json({"Error": true, "Message": "Error executing MySQL query"});
        } else {
            res.json(rows);
        }
    });
});

//add new address
router.post('/', (req, res) => {
    var date = new Date();
    var address_id = uuid.v4();
    var customer_id = req.body.customer_id;
    var street_number = req.body.street_number;
    var street_name = req.body.street_name;
    var province = req.body.province;
    var city = req.body.city;
    var created_at = date;
    var modified_at = date;
    var status_id = 1;

    var sql = "INSERT INTO ? (?, ?, ?, ?, ?, ?, ?, ?)"

    var table = ["addresses_table", address_id, customer_id, street_number, street_name, province, city, created_at, modified_at, status_id];

    var query = mysql.format(sql, table);
    mysqlConnection.query(query, (err, rows) => {
        if (err) {
            res.json({"Error": true, "Message": "Error executing MySQL query"});
        } else {
            res.json({
                address_id: address_id,
                message:"insert successful"
            });
        }
    });
});

//update address's status
router.patch('/:address_id', async (req, res) => {
    var address_id = req.params.employee_id;
    var status_id = req.body.status_id;
    var modified_at = new Date();

    var sql = "UPDATE ? SET ? = ? AND ? = ? WHERE ? = ?";
    var table = ["addresses_table", "status_id", status_id, "modified_at", modified_at, "id", address_id];

    var query = mysql.format(sql, table);
    mysqlConnection.query(query, (err, rows) => {
        if (err) {
            res.json({"Error": true, "Message": "Error executing MySQL query"});
        } else {
            res.json({
                address_id: address_id,
                message:"update successful"
            });
        }
    });
});

//delete address
router.delete('/:address_id', (req, res) => {
    var address_id = req.params.address_id;

    var sql = "DELETE FROM ? WHERE ? = ?";

    var table = ["addresses_table", "id", address_id];
    var query = mysql.format(sql, table);

    mysqlConnection.query(query, (err, rows) => {
        if (err) {
            res.json({"Error": true, "Message": "Error executing MySQL query"});
        } else {
            res.json({
                address_id: address_id,
                message: "deleted"
            });
        }
    });
});

module.exports = router;