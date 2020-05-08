const router = require('express').Router();
const uuid = require('uuid')

//get list of all orders
router.get('/', async (req, res) => {
    var sql = "SELECT * FROM ?";
    var table = ["orders_table"];

    var query = mysql.format(sql, table);
    mysqlConnection.query(query, (err, rows) => {
        if (err) {
            res.json({"Error": true, "Message": "Error executing MySQL query"});
        } else {
            res.json(rows);
        }
    });
});

//get a list of a customer's orders
router.get('/customer_id', async (req, res) => {
    var customer_id = req.params.customer_id;
    var sql = "SELECT * FROM ? WHERE ? = ?";
    var table = ["orders_table", "customer_id", customer_id];

    var query = mysql.format(sql, table);
    mysqlConnection.query(query, (err, rows) => {
        if (err) {
            res.json({"Error": true, "Message": "Error executing MySQL query"});
        } else {
            res.json(rows);
        }
    });
});

//get order by id
router.get('/:order_id', async (req, res) => {
    var order_id = req.params.order_id;
    var sql = "SELECT * FROM ? WHERE ? = ?";
    var table = ["orders_table", "order_id", order_id];

    var query = mysql.format(sql, table);
    mysqlConnection.query(query, (err, rows) => {
        if (err) {
            res.json({"Error": true, "Message": "Error executing MySQL query"});
        } else {
            res.json(rows);
        }
    });
});

//add new order
router.post('/', async (req, res) => {
    var date = new Date();
    var order_id = uuid.v4();
    var customer_id = req.body.customer_id;
    var employee_id = req.body.employee_id;
    var status = req.body.status;
    var delivery_address_id = req.body.delivery_address_id;
    var created_at = date;
    var modified_at = date;
    var status_id = 1;

    var sql = "INSERT INTO ? (?, ?, ?, ?, ?, ?, ?, ?)"

    var table = ["orders_table", order_id, customer_id, employee_id, status, delivery_address_id, created_at, modified_at, status_id];

    var query = mysql.format(sql, table);
    mysqlConnection.query(query, (err, rows) => {
        if (err) {
            res.json({"Error": true, "Message": "Error executing MySQL query"});
        } else {
            res.json({
                order_id: order_id,
                message:"insert successful"
            });
        }
    });
});

//update existing order
router.patch('/:order_id', async (req, res) => {

    var status = req.body.status;
    var delivery_address_id = req.body.delivery_address_id;
    var modified_at = date;
    var status_id = req.body.status_id;

    var order_id = req.params.order_id;
    var sql = "UPDATE ? SET ? = ? AND ? = ? AND ? = ? AND ? = ? WHERE ? = ?";

    var table = ["orders_table", "status", status, "delivery_address_id", delivery_address_id, "modified_at", modified_at, "status_id", status_id, "order_id", order_id];

    var query = mysql.format(sql, table);
    mysqlConnection.query(query, (err, rows) => {
        if (err) {
            res.json({"Error": true, "Message": "Error executing MySQL query"});
        } else {
            res.json({
                order_id: order_id,
                message:"update successful"
            });
        }
    });
});

//delete order
router.delete('/:order_id', async (req, res) => {
    var order_id = req.params.order_id;
    var sql = "DELETE FROM ? WHERE id ? = ?";
    var table = ["orders_table", "id", order_id];

    var query = mysql.format(sql, table);
    mysqlConnection.query(query, (err, rows) => {
        if (err) {
            res.json({"Error": true, "Message": "Error executing MySQL query"});
        } else {
            res.json({
                order_id: order_id,
                message: "delete successful"
            });
        }
    });
});

module.exports = router;