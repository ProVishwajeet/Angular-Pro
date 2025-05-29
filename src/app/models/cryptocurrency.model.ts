export interface Cryptocurrency {
  id: number;
  name: string;
  symbol: string;
  price: number;
  percentChange: number;
  marketCap: number;
  volume24h: number;
  circulatingSupply: number;
  chartData: number[];
}
