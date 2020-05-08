const router = require('express').Router();
const bcrypt = require('bcrypt');
const uuid = require('uuid');

router.post('/register', (req, res) => {
    var date = new Date();

    var id = uuid.v4();
    var fname = req.body.first_name;
    var lname = req.body.last_name;
    var email = req.body.email;
    var pass = req.body.password;
    var phone_number = req.body.phone_number;
    var created_at = date;
    var modified_at = date;
    var status_id = 1;

    bcrypt.hash(pass, 10, (err, hashed_password) => {
        var sql = "SELECT email FROM ?? WHERE ??=?";

        var table = ["users_table", "email", email];

        var query = mysql.format(sql, table);

        connection.query(query, function (err, rows) {
            if (err) {
                res.json({"Error": true, "Message": "Error executing MySQL query"});
            } else {

                if (rows.length == 0) {
                    var sql = "INSERT INTO users_table(`id`,`first_name`,`last_name`,`email`,`password`, `phone_number`, `created_at`, `modified_at`, `status_id`) " +
                        "VALUES ('','" + id + "','" + fname + "','" + lname + "','" + email + "','" + hashed_password + +"','" +
                        phone_number + "','" + created_at + "','" + modified_at + "','" + status_id + "')";
                    var query = db.query(sql, function (err, result) {
                        if (err) {
                            res.json({"Error": true, "Message": "Error executing MySQL query"});
                        } else {
                            res.json({"Error": false, "Message": "Success"});
                        }
                    });
                } else {
                    res.json({"Error": false, "Message": "Email Id already registered"});
                }
            }
        });

    });
});

router.post('/login', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    var sql = "SELECT * FROM ?? WHERE ??=? AND ??=?";

    let hash = bcrypt.hashSync(password, 10);

    var table = ["users_table", "password", hash, "email", email];

    var query = mysql.format(sql, table);

    connection.query(query, (err, rows) => {
        if (err) {
            res.json({"Error": true, "Message": "Error executing MySQL query"});
        } else {

            if (rows.length == 1) {
                var token = jwt.sign({id: rows[0].id}, config.secret, {
                    expiresIn: 86400 //expires in 24 hours.
                });

                //return the token in response.

                res.status(200).send({auth: true, accessToken: token});
            } else {
                res.json({"Error": true, "Message": "Wrong email/password combination"});
            }
        }
    });
});

module.exports = router;