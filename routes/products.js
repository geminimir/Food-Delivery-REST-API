const router = require('express').Router();
const uuid = require('uuid');

//get list of all products
router.get('/', async (req, res) => {
    var sql = "SELECT * FROM ?";
    var table = ["products_table"];

    var query = mysql.format(sql, table);

    mysqlConnection.query(query, (err, rows) => {
        if (err) {
            res.json({"Error": true, "Message": "Error executing MySQL query"});
        } else {
            res.json(rows);
        }
    });
});

//get product by id
router.get('/:product_id', async (req, res) => {

    var product_id = req.params.product_id;
    var sql = "SELECT * FROM ? WHERE ?=?";
    var table = ["products_table", "id", product_id];

    var query = mysql.format(sql, table);

    mysqlConnection.query(query, (err, rows) => {
        if (err) {
            res.json({"Error": true, "Message": "Error executing MySQL query"});
        } else {
            res.json(rows);
        }
    });
});

//add new product
router.post('/', async (req, res) => {
    var date = new Date();

    var product_id = uuid.v4();
    var product_name = req.body.product_name;
    var product_description = req.body.product_description;
    var category_id = req.body.category_id;
    var price = req.body.price;
    var created_at = date;
    var modified_at = date;
    var status_id = 1;

    var query = "INSERT INTO products_table(`id`,`product_name`,`product_description`,`category_id`,`price`, `created_at`, `modified_at`, `status_id`) " +
        "VALUES ('','" + product_id + "','" + product_name + "','" + product_description + "','" + category_id + "','" + price + +"','" +
        created_at + "','" + modified_at + "','" + status_id + "')";

    mysqlConnection.query(query, (err, rows) => {
        if (err) {
            res.json({"Error": true, "Message": "Error executing MySQL query"});
        } else {
            res.json({
                product_id: product_id,
                product_name: product_name,
                message: "insert successful"
            });
        }
    });
});

//update existing product
router.patch('/:product_id', async (req, res) => {

    var date = new Date();
    var product_id=  req.params.product_id;
    var product_name = req.body.product_name;
    var product_description = req.body.product_description;
    var category_id = req.body.category_id;
    var price = req.body.price;
    var modified_at = date;
    var status_id = req.body.status_id;

    var sql = "UPDATE ? SET ? = ? AND ? = ? AND ? = ? AND ? =  ? AND ? = ? AND  ? = ?" +
        "WHERE ? = ?";

    var table = ["products_table", "product_name", product_name, "product_description", product_description, "category_id", category_id, "price", price,
    "modified_at", modified_at, "status_id", status_id, "id", product_id];

    var query = mysql.format(sql, table);

    mysqlConnection.query(query, (err, rows) => {
        if (err) {
            res.json({"Error": true, "Message": "Error executing MySQL query"});
        } else {
            res.json({
                product_id: product_id,
                product_name: product_name,
                message: "update successful"
            });
        }
    });
});

//get rating mark of a product
router.get('/:product_id', async (req, res) => {
    var product_id = req.params.product_id;
    var sql = "SELECT ? FROM ? WHERE ? = ?";
    var table = ["rating", "reviews_table", "product_id", product_id];

    var query = mysql.format(sql, table);
    mysqlConnection.query(query, (err, rows) => {
        if (err) {
            res.json({"Error": true, "Message": "Error executing MySQL query"});
        } else {
            res.json({
                product_id: product_id,
                rating: rows,
                number_of_reviews: rows.length
            });
        }
    });
});

//delete product
router.delete('/:product_id', async (req, res) => {
    var product_id = req.params.product_id;

    var sql = "DELETE FROM ? WHERE ? = ?";

    var table = ["products_table", "id", product_id];
    var query = mysql.format(sql, table);

    mysqlConnection.query(query, (err, rows) => {
        if (err) {
            res.json({"Error": true, "Message": "Error executing MySQL query"});
        } else {
            res.json({
                product_id: product_id,
                message: "deleted"
            });
        }
    });
});

//update product's status
router.patch('/:product_id', async (req, res) => {
    var product_id = req.params.product_id;
    var status_id = req.body.status_id;
    var modified_at = new Date();

    var sql = "UPDATE ? SET ? = ? AND ? = ? WHERE ? = ?";
    var table = ["products_table", "status_id", status_id, "modified_at", modified_at, "id", product_id];

    var query = mysql.format(sql, table);
    mysqlConnection.query(query, (err, rows) => {
        if (err) {
            res.json({"Error": true, "Message": "Error executing MySQL query"});
        } else {
            res.json({
                product_id: product_id,
                message:"update successful"
            });
        }
    });
});

module.exports = router;