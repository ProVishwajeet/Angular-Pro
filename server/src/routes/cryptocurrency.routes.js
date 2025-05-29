const express = require('express');
const router = express.Router();
const CryptocurrencyController = require('../controllers/cryptocurrency.controller');

// Get all cryptocurrencies
router.get('/', CryptocurrencyController.getAllCryptocurrencies);

// Get a cryptocurrency by ID
router.get('/:id', CryptocurrencyController.getCryptocurrencyById);

// Create a new cryptocurrency
router.post('/', CryptocurrencyController.createCryptocurrency);

// Update a cryptocurrency
router.put('/:id', CryptocurrencyController.updateCryptocurrency);

// Delete a cryptocurrency
router.delete('/:id', CryptocurrencyController.deleteCryptocurrency);

module.exports = router;
