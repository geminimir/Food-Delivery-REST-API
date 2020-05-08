const router = require('express').Router();
const bcrypt = require('bcrypt');
const uuid = require("uuid");

//get list of all employees
router.get('/', async (req, res) => {
    var sql = "SELECT * FROM ?";
    var table = ["employees_table"];

    var query = mysql.format(sql, table);
    mysqlConnection.query(query, (err, rows) => {
        if (err) {
            res.json({"Error": true, "Message": "Error executing MySQL query"});
        } else {
            res.json(rows);
        }
    });
});

//get employee by id
router.get('/:employee_id', async (req, res) => {
    var employee_id = req.params.employee_id;
    var sql = "SELECT * FROM ? WHERE ? = ?";
    var table = ["employees_table", "id", employee_id];

    var query = mysql.format(sql, table);
    mysqlConnection.query(query, (err, rows) => {
        if (err) {
            res.json({"Error": true, "Message": "Error executing MySQL query"});
        } else {
            res.json(rows);
        }
    });
});

//get list of employee's orders
router.get('/:employee_id', async (req, res) => {
    var employee_id = req.params.employee_id;
    var sql = "SELECT * FROM ? WHERE ? = ?";
    var table = ["orders_table", "employee_id", employee_id];

    var query = mysql.format(sql, table);
    mysqlConnection.query(query, (err, rows) => {
        if (err) {
            res.json({"Error": true, "Message": "Error executing MySQL query"});
        } else {
            res.json(rows);
        }
    });
});

//add new employee
router.post('/', async (req, res) => {
    var date = new Date();
    var employee_id = uuid.v4();
    var fname = req.body.first_name;
    var lname = req.body.last_name;
    var permissions = req.body.user_permissions;
    var password = req.body.password;
    var phone_number  = req.body.phone_number;
    var created_at = date;
    var modified_at = date;
    var status_id = 1;

    let hashedPassword = bcrypt.hashSync(password, 10);


    var sql = "INSERT INTO ? (?, ?, ?, ?, ?, ?, ?, ?)"

    var table = ["employees_table", employee_id, fname, lname, permissions, hashedPassword, phone_number, created_at, modified_at, status_id];

    var query = mysql.format(sql, table);
    mysqlConnection.query(query, (err, rows) => {
        if (err) {
            res.json({"Error": true, "Message": "Error executing MySQL query"});
        } else {
            res.json({
                employee_id: employee_id,
                message:"insert successful"
            });
        }
    });

});

//update employee's permissions
router.patch('/:employee_id', async (req, res) => {
    var employee_id = req.params.employee_id;
    var permissions = req.body.user_permissions;
    var modified_at = new Date();

    var sql = "UPDATE ? SET ? = ? AND ? = ? WHERE ? = ?";
    var table = ["employees_table", "user_permissions", permissions, "modified_at", modified_at, "id", employee_id];

    var query = mysql.format(sql, table);
    mysqlConnection.query(query, (err, rows) => {
        if (err) {
            res.json({"Error": true, "Message": "Error executing MySQL query"});
        } else {
            res.json({
                employee_id: employee_id,
                message:"update successful"
            });
        }
    });
});

//delete employee
router.delete('/:employee_id', async (req, res) => {
    var employee_id = req.params.employee_id;
    var sql = "DELETE FROM ? WHERE id ? = ?";
    var table = ["employees_table", "id", employee_id];

    var query = mysql.format(sql, table);
    mysqlConnection.query(query, (err, rows) => {
        if (err) {
            res.json({"Error": true, "Message": "Error executing MySQL query"});
        } else {
            res.json({
                employee_id: employee_id,
                message: "delete successful"
            });
        }
    });
});

//update employee's status
router.patch('/:employee_id', async (req, res) => {
    var employee_id = req.params.employee_id;
    var status_id = req.body.status_id;
    var modified_at = new Date();

    var sql = "UPDATE ? SET ? = ? AND ? = ? WHERE ? = ?";
    var table = ["employees_table", "status_id", status_id, "modified_at", modified_at, "id", employee_id];

    var query = mysql.format(sql, table);
    mysqlConnection.query(query, (err, rows) => {
        if (err) {
            res.json({"Error": true, "Message": "Error executing MySQL query"});
        } else {
            res.json({
                employee_id: employee_id,
                message:"update successful"
            });
        }
    });
});

module.exports = router;