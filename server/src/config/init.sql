-- Drop the table if it exists
DROP TABLE IF EXISTS cryptocurrencies;

-- Create cryptocurrencies table
CREATE TABLE cryptocurrencies (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  symbol VARCHAR(20) NOT NULL,
  price DECIMAL(18, 3) NOT NULL,
  percent_change DECIMAL(10, 2) NOT NULL,
  market_cap BIGINT NOT NULL,
  volume_24h BIGINT NOT NULL,
  circulating_supply BIGINT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO cryptocurrencies (name, symbol, price, percent_change, market_cap, volume_24h, circulating_supply)
VALUES
  ('Bitcoin', 'BTC', 721882, -4.66, 13984762345600, 1234567890, 19000000),
  ('Ethereum', 'ETH', 22370, 0.45, 2698765432100, 987654321, 120000000),
  ('NEM', 'XEM', 10.604, -0.07, 95432167800, 543216789, 9000000000),
  ('Ripple', 'XRP', 50.839, 0.66, 508390000000, 321654987, 10000000000);
