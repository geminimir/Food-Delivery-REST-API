const router = require('express').Router();
const uuid = require('uuid');

//get list of all reviews
router.get('/', async (req, res) => {
    var sql = "SELECT * FROM ?";
    var table = ["reviews_table"];

    var query = mysql.format(sql, table);
    mysqlConnection.query(query, (err, rows) => {
        if (err) {
            res.json({"Error": true, "Message": "Error executing MySQL query"});
        } else {
            res.json(rows);
        }
    });
});

//get a list of a product's reviews
router.get('/:product_id', async (req, res) => {
    var product_id = req.params.product_id;
    var sql = "SELECT * FROM ? WHERE ? = ?";
    var table = ["reviews_table", "product_id", product_id];

    var query = mysql.format(sql, table);
    mysqlConnection.query(query, (err, rows) => {
        if (err) {
            res.json({"Error": true, "Message": "Error executing MySQL query"});
        } else {
            res.json(rows);
        }
    });
});

//get review by id
router.get('/:review_id', async (req, res) => {
    var review_id = req.params.review_id;
    var sql = "SELECT * FROM ? WHERE ? = ?";
    var table = ["reviews_table", "review_id", review_id];

    var query = mysql.format(sql, table);
    mysqlConnection.query(query, (err, rows) => {
        if (err) {
            res.json({"Error": true, "Message": "Error executing MySQL query"});
        } else {
            res.json(rows);
        }
    });
});

//add new review to a product
router.post('/', async (req, res) => {
    var date = new Date();

    const review_id = uuid.v4();
    const review_description = req.body.description;
    const customer_id = req.body.customer_id;
    const rating = req.body.rating;
    const product_id = req.body.product_id;
    const created_at = date;
    const modified_at = date;
    const status_id = 1;

    var sql = "INSERT INTO ? VALUES(?, ?, ?, ?, ?, ?, ?, ?);"
    var table = ["reviews_table", review_id, review_description, customer_id, rating, product_id, created_at, modified_at, status_id];

    var query = mysql.format(sql, table);
    mysqlConnection.query(query, (err, rows) => {
        if (err) {
            res.json({"Error": true, "Message": "Error executing MySQL query"});
        } else {
            res.json({
                review_id: review_id,
                message: "insert successful"
            });
        }
    });
});

//delete review
router.delete('/:review_id', async (req, res) => {
    var review_id = req.params.review_id;

    var sql = "DELETE FROM ? WHERE id ? = ?";
    var table = ["reviews_table", "id", review_id];

    var query = mysql.format(sql, table);
    mysqlConnection.query(query, (err, rows) => {
        if (err) {
            res.json({"Error": true, "Message": "Error executing MySQL query"});
        } else {
            res.json({
                review_id: review_id,
                message: "delete successful"
            });
        }
    });
});

module.exports = router;