const Cryptocurrency = require('../models/cryptocurrency.model');

// Controller for cryptocurrency operations
const CryptocurrencyController = {
  // Get all cryptocurrencies
  getAllCryptocurrencies: async (req, res) => {
    try {
      const cryptocurrencies = await Cryptocurrency.findAll();
      
      // Transform database column names to camelCase for frontend
      const formattedCryptocurrencies = cryptocurrencies.map(crypto => ({
        id: crypto.id,
        name: crypto.name,
        symbol: crypto.symbol,
        price: crypto.price,
        percentChange: crypto.percent_change,
        marketCap: crypto.market_cap,
        volume24h: crypto.volume_24h,
        circulatingSupply: crypto.circulating_supply
      }));
      
      res.status(200).json(formattedCryptocurrencies);
    } catch (error) {
      console.error('Error fetching cryptocurrencies:', error);
      res.status(500).json({ message: 'Server error while fetching cryptocurrencies' });
    }
  },

  // Get a cryptocurrency by ID
  getCryptocurrencyById: async (req, res) => {
    try {
      const { id } = req.params;
      const cryptocurrency = await Cryptocurrency.findById(id);
      
      if (!cryptocurrency) {
        return res.status(404).json({ message: 'Cryptocurrency not found' });
      }
      
      // Transform database column names to camelCase for frontend
      const formattedCryptocurrency = {
        id: cryptocurrency.id,
        name: cryptocurrency.name,
        symbol: cryptocurrency.symbol,
        price: cryptocurrency.price,
        percentChange: cryptocurrency.percent_change,
        marketCap: cryptocurrency.market_cap,
        volume24h: cryptocurrency.volume_24h,
        circulatingSupply: cryptocurrency.circulating_supply
      };
      
      res.status(200).json(formattedCryptocurrency);
    } catch (error) {
      console.error(`Error fetching cryptocurrency with id ${req.params.id}:`, error);
      res.status(500).json({ message: 'Server error while fetching cryptocurrency' });
    }
  },

  // Create a new cryptocurrency
  createCryptocurrency: async (req, res) => {
    try {
      const { name, symbol, price, percentChange, marketCap, volume24h, circulatingSupply } = req.body;
      
      // Transform camelCase to snake_case for database
      const newCryptocurrency = await Cryptocurrency.create({
        name,
        symbol,
        price,
        percent_change: percentChange,
        market_cap: marketCap,
        volume_24h: volume24h,
        circulating_supply: circulatingSupply
      });
      
      // Transform database column names to camelCase for frontend
      const formattedCryptocurrency = {
        id: newCryptocurrency.id,
        name: newCryptocurrency.name,
        symbol: newCryptocurrency.symbol,
        price: newCryptocurrency.price,
        percentChange: newCryptocurrency.percent_change,
        marketCap: newCryptocurrency.market_cap,
        volume24h: newCryptocurrency.volume_24h,
        circulatingSupply: newCryptocurrency.circulating_supply
      };
      
      res.status(201).json(formattedCryptocurrency);
    } catch (error) {
      console.error('Error creating cryptocurrency:', error);
      res.status(500).json({ message: 'Server error while creating cryptocurrency' });
    }
  },

  // Update a cryptocurrency
  updateCryptocurrency: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, symbol, price, percentChange, marketCap, volume24h, circulatingSupply } = req.body;
      
      // Check if cryptocurrency exists
      const existingCryptocurrency = await Cryptocurrency.findById(id);
      if (!existingCryptocurrency) {
        return res.status(404).json({ message: 'Cryptocurrency not found' });
      }
      
      // Transform camelCase to snake_case for database
      const updatedCryptocurrency = await Cryptocurrency.update(id, {
        name,
        symbol,
        price,
        percent_change: percentChange,
        market_cap: marketCap,
        volume_24h: volume24h,
        circulating_supply: circulatingSupply
      });
      
      // Transform database column names to camelCase for frontend
      const formattedCryptocurrency = {
        id: updatedCryptocurrency.id,
        name: updatedCryptocurrency.name,
        symbol: updatedCryptocurrency.symbol,
        price: updatedCryptocurrency.price,
        percentChange: updatedCryptocurrency.percent_change,
        marketCap: updatedCryptocurrency.market_cap,
        volume24h: updatedCryptocurrency.volume_24h,
        circulatingSupply: updatedCryptocurrency.circulating_supply
      };
      
      res.status(200).json(formattedCryptocurrency);
    } catch (error) {
      console.error(`Error updating cryptocurrency with id ${req.params.id}:`, error);
      res.status(500).json({ message: 'Server error while updating cryptocurrency' });
    }
  },

  // Delete a cryptocurrency
  deleteCryptocurrency: async (req, res) => {
    try {
      const { id } = req.params;
      
      // Check if cryptocurrency exists
      const existingCryptocurrency = await Cryptocurrency.findById(id);
      if (!existingCryptocurrency) {
        return res.status(404).json({ message: 'Cryptocurrency not found' });
      }
      
      await Cryptocurrency.delete(id);
      res.status(200).json({ message: 'Cryptocurrency deleted successfully' });
    } catch (error) {
      console.error(`Error deleting cryptocurrency with id ${req.params.id}:`, error);
      res.status(500).json({ message: 'Server error while deleting cryptocurrency' });
    }
  }
};

module.exports = CryptocurrencyController;
