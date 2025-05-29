const db = require('../config/db.config');

// Cryptocurrency model
const Cryptocurrency = {
  // Get all cryptocurrencies
  findAll: async () => {
    try {
      const result = await db.query(
        'SELECT * FROM cryptocurrencies ORDER BY market_cap DESC'
      );
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  // Get a cryptocurrency by ID
  findById: async (id) => {
    try {
      const result = await db.query(
        'SELECT * FROM cryptocurrencies WHERE id = $1',
        [id]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Create a new cryptocurrency
  create: async (cryptocurrency) => {
    const { name, symbol, price, percent_change, market_cap, volume_24h, circulating_supply } = cryptocurrency;
    try {
      const result = await db.query(
        'INSERT INTO cryptocurrencies (name, symbol, price, percent_change, market_cap, volume_24h, circulating_supply) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [name, symbol, price, percent_change, market_cap, volume_24h, circulating_supply]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Update a cryptocurrency
  update: async (id, cryptocurrency) => {
    const { name, symbol, price, percent_change, market_cap, volume_24h, circulating_supply } = cryptocurrency;
    try {
      const result = await db.query(
        'UPDATE cryptocurrencies SET name = $1, symbol = $2, price = $3, percent_change = $4, market_cap = $5, volume_24h = $6, circulating_supply = $7 WHERE id = $8 RETURNING *',
        [name, symbol, price, percent_change, market_cap, volume_24h, circulating_supply, id]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Delete a cryptocurrency
  delete: async (id) => {
    try {
      const result = await db.query(
        'DELETE FROM cryptocurrencies WHERE id = $1 RETURNING *',
        [id]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
};

module.exports = Cryptocurrency;
