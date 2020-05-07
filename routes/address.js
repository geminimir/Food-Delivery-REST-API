const router = require('express').Router();


//get list of all addresses
router.get('/', (req, res) => {

});

//get list of addresses by user_id
router.get('/:customer_id', (req, res) => {

});

//get address by id
router.get('/:address_id', (req, res) => {

});

//add new address
router.post('/', (req, res) => {

});

//update existing address
router.patch('/:address_id', (req, res) => {

});

//delete address
router.delete('/:address_id', (req, res) => {

});

module.exports = router;