const router = require('express').Router();


//get list of all orders
router.get('/', (req, res) => {

});

//get a list of a customer's orders
router.get('/customer_id', (req, res) => {

});

//get order by id
router.get('/:order_id', (req, res) => {

});

//add new order
router.post('/', (req, res) => {

});

//update existing order
router.patch('/:order_id', (req, res) => {

});

//delete order
router.delete('/:order_id', (req, res) => {

});

module.exports = router;