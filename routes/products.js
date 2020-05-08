const router = require('express').Router();
const uuid = require('uuid');

//get list of all products
router.get('/', (req, res) => {
    var query = "SELECT * FROM ??";
    var table = ["products_table"];

    query = mysql.format(query, table);

    connection.query(query, (err, rows) => {
        if (err) {
            res.json({"Error": true, "Message": "Error executing MySQL query"});
        } else {
            res.json(rows);
        }
    });
});

//get product by id
router.get('/:product_id', (req, res) => {

    var product_id = req.params.product_id;
    var sql = "SELECT * FROM ?? WHERE ??=??";
    var table = ["products_table", "id", product_id];

    query = mysql.format(sql, table);

    connection.query(query, (err, rows) => {
        if (err) {
            res.json({"Error": true, "Message": "Error executing MySQL query"});
        } else {
            res.json(rows);
        }
    });
});

//add new product
router.post('/', (req, res) => {
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

    connection.query(query, (err, rows) => {
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
router.patch('/:product_id', (req, res) => {

    var date = new Date();
    var product_id=  req.params.product_id;
    var product_name = req.body.product_name;
    var product_description = req.body.product_description;
    var category_id = req.body.category_id;
    var price = req.body.price;
    var modified_at = date;
    var status_id = req.body.status_id;

    var sql = "UPDATE ?? SET ?? = ?? AND ?? = ?? AND ?? = ?? AND ?? =  ?? AND ?? = ?? AND  ?? = ??" +
        "WHERE ?? = ??";

    var table = ["products_table", "product_name", product_name, "product_description", product_description, "category_id", category_id, "price", price,
    "modified_at", modified_at, "status_id", status_id, "product_id", product_id];

    query = mysql.format(sql, table);

    connection.query(query, (err, rows) => {
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
router.get('/:product_id', (req, res) => {
    var product_id = req.params.product_id;
    var sql = "SELECT ?? FROM ?? WHERE ?? = ??";
    var table = ["rating", "review_table", "product_id", product_id];

    query = mysql.format(sql, table);
    connection.query(query, (err, rows) => {
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
router.delete('/:product_id', (req, res) => {
    var product_id = req.params.product_id;

    var sql = "DELETE FROM ?? WHERE ?? = ??";

    var table = ["products_table", "product_id", product_id];

    connection.query(query, (err, rows) => {
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

module.exports = router;