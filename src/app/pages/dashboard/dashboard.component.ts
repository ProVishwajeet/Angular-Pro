import { Component, OnInit } from '@angular/core';
import { CryptocurrencyService } from '../../services/cryptocurrency.service';
import { Cryptocurrency } from '../../models/cryptocurrency.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  cryptocurrencies: Cryptocurrency[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private cryptocurrencyService: CryptocurrencyService) { }

  ngOnInit(): void {
    this.fetchCryptocurrencies();
  }

  fetchCryptocurrencies(): void {
    this.loading = true;
    this.cryptocurrencyService.getCryptocurrencies()
      .subscribe({
        next: (data: Cryptocurrency[]) => {
          this.cryptocurrencies = data;
          this.loading = false;
        },
        error: (err: any) => {
          this.error = 'Failed to load cryptocurrency data';
          this.loading = false;
          console.error('Error fetching cryptocurrencies:', err);
        }
      });
  }

  getArrowClass(percentChange: number): string {
    return percentChange >= 0 ? 'arrow-up' : 'arrow-down';
  }

  getPercentClass(percentChange: number): string {
    return percentChange >= 0 ? 'percent-up' : 'percent-down';
  }
  
  getAbsolutePercentChange(percentChange: number): string {
    return Math.abs(percentChange).toFixed(2);
  }
  
  // Check if we're using mock data
  isMockData(): boolean {
    if (!this.cryptocurrencies || this.cryptocurrencies.length === 0) {
      return false;
    }
    return this.cryptocurrencies.some(crypto => crypto.is_mock_data === true);
  }
  
  // Generate SVG path for the chart line
  generateChartPath(data?: number[]): string {
    // If data is provided, use the old method for crypto cards
    if (data && data.length > 0) {
      const width = 300;
      const height = 80;
      const padding = 5;
      
      // Find min and max to scale the data
      const min = Math.min(...data) * 0.95;
      const max = Math.max(...data) * 1.05;
      
      // Scale the data points to fit the SVG viewBox
      const xStep = (width - padding * 2) / (data.length - 1);
      const scaledData = data.map((value, index) => {
        const x = padding + index * xStep;
        const y = height - padding - ((value - min) / (max - min)) * (height - padding * 2);
        return { x, y };
      });
      
      // Generate the SVG path
      let path = `M${scaledData[0].x},${scaledData[0].y}`;
      for (let i = 1; i < scaledData.length; i++) {
        path += ` L${scaledData[i].x},${scaledData[i].y}`;
      }
      
      return path;
    } 
    // Otherwise use the new method for the main chart
    else {
      const points = this.generateChartPoints();
      let path = `M ${points[0].x} ${points[0].y}`;
      
      for (let i = 1; i < points.length; i++) {
        path += ` L ${points[i].x} ${points[i].y}`;
      }
      
      return path;
    }
  }
  
  // Generate SVG path for the chart area (filled area under the line)
  generateChartAreaPath(data?: number[]): string {
    // If data is provided, use the old method for crypto cards
    if (data && data.length > 0) {
      const width = 300;
      const height = 80;
      const padding = 5;
      
      // Find min and max to scale the data
      const min = Math.min(...data) * 0.95;
      const max = Math.max(...data) * 1.05;
      
      // Scale the data points to fit the SVG viewBox
      const xStep = (width - padding * 2) / (data.length - 1);
      const scaledData = data.map((value, index) => {
        const x = padding + index * xStep;
        const y = height - padding - ((value - min) / (max - min)) * (height - padding * 2);
        return { x, y };
      });
      
      // Generate the SVG path including the bottom line to create a closed shape
      let path = `M${scaledData[0].x},${scaledData[0].y}`;
      for (let i = 1; i < scaledData.length; i++) {
        path += ` L${scaledData[i].x},${scaledData[i].y}`;
      }
      
      // Add bottom line and close the path
      path += ` L${scaledData[scaledData.length - 1].x},${height - padding}`;
      path += ` L${scaledData[0].x},${height - padding}`;
      path += ' Z'; // Close the path
      
      return path;
    }
    // Otherwise use the new method for the main chart
    else {
      const points = this.generateChartPoints();
      let path = `M ${points[0].x} ${points[0].y}`;
      
      for (let i = 1; i < points.length; i++) {
        path += ` L ${points[i].x} ${points[i].y}`;
      }
      
      // Complete the path to create a closed shape for filling
      path += ` L ${points[points.length - 1].x} 300 L ${points[0].x} 300 Z`;
      
      return path;
    }
  }
  
  // Get chart line color based on percent change
  getChartColor(percentChange: number): string {
    return percentChange >= 0 ? '#00C9A7' : '#FF6B6B';
  }
  
  // Get chart gradient color based on percent change
  getChartGradient(percentChange: number): string {
    if (percentChange >= 0) {
      return '#00C9A7'; // Green for positive
    } else {
      return '#FF6B6B'; // Red for negative
    }
  }

  scrollLeft(): void {
    const container = document.querySelector('.crypto-cards-container');
    if (container) {
      // Calculate the width of one card plus gap
      const cardWidth = container.querySelector('.crypto-card')?.clientWidth || 0;
      const gap = 12; // Gap between cards in pixels
      const scrollAmount = cardWidth + gap;
      
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  }

  scrollRight(): void {
    const container = document.querySelector('.crypto-cards-container');
    if (container) {
      // Calculate the width of one card plus gap
      const cardWidth = container.querySelector('.crypto-card')?.clientWidth || 0;
      const gap = 12; // Gap between cards in pixels
      const scrollAmount = cardWidth + gap;
      
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }
  
  // Generate candlestick chart data
  generateCandlestickData(): any[] {
    // Sample candlestick data (open, high, low, close)
    const candlestickData = [
      { open: 721000, high: 723500, low: 720000, close: 721500 },
      { open: 721500, high: 724000, low: 720800, close: 722000 },
      { open: 722000, high: 725000, low: 721000, close: 723000 },
      { open: 723000, high: 725974, low: 722500, close: 721800 },
      { open: 721800, high: 722500, low: 720500, close: 720000 },
      { open: 720000, high: 721200, low: 718500, close: 719000 },
      { open: 719000, high: 720500, low: 718000, close: 719500 },
      { open: 719500, high: 721000, low: 718500, close: 720800 },
      { open: 720800, high: 722500, low: 720000, close: 721000 },
      { open: 721000, high: 723000, low: 720500, close: 722500 },
      { open: 722500, high: 724500, low: 722000, close: 723500 },
      { open: 723500, high: 726000, low: 723000, close: 725000 },
      { open: 725000, high: 725974, low: 724000, close: 724500 },
      { open: 724500, high: 725000, low: 723000, close: 722000 },
      { open: 722000, high: 722500, low: 720500, close: 721000 },
      { open: 721000, high: 722000, low: 719500, close: 720000 },
      { open: 720000, high: 721500, low: 719000, close: 720500 },
      { open: 720500, high: 722000, low: 720000, close: 721200 },
      { open: 721200, high: 722500, low: 720500, close: 721882 }
    ];
    
    // Scale values to fit in the chart
    const minValue = 718000;
    const maxValue = 726000;
    const chartHeight = 200;
    const yScale = (value: number) => {
      return 100 + ((maxValue - value) / (maxValue - minValue)) * chartHeight;
    };
    
    // Map data to SVG coordinates
    return candlestickData.map(candle => {
      const isUp = candle.close >= candle.open;
      return {
        openY: yScale(candle.open),
        highY: yScale(candle.high),
        lowY: yScale(candle.low),
        closeY: yScale(candle.close),
        color: isUp ? '#00C9A7' : '#FF6B6B',
      };
    });
  }
  
  // These methods have been consolidated with the ones above
  
  generateChartPoints() {
    try {
      const points = [];
      const basePrice = 720000;
      const numPoints = 100;
      
      // Create a more natural-looking chart with some randomness but overall trend
      let lastY = 200; // Start in the middle of the chart
      
      // Add first point
      points.push({ x: 0, y: lastY });
      
      // Generate the rest of the points with a smoother curve
      for (let i = 1; i < numPoints; i++) {
        // Create x coordinate (evenly spaced)
        const x = (i / (numPoints - 1)) * 800;
        
        // Create y coordinate with a smoother sine wave pattern
        // This creates the ups and downs visible in the screenshot
        const amplitude = 40; // Height of the wave
        const period = 20; // Length of each wave
        const offset = 200; // Vertical center position
        
        // Calculate y using a sine wave with some randomness
        let y = offset + amplitude * Math.sin(i / period * Math.PI);
        
        // Add a small amount of noise for realism
        const noise = Math.random() * 5 - 2.5;
        y += noise;
        
        // Keep within reasonable bounds
        y = Math.max(120, Math.min(y, 280));
        
        points.push({ x, y });
      }
      
      return points;
    } catch (error) {
      console.error('Error generating chart points:', error);
      // Return fallback points if there's an error
      return [
        { x: 0, y: 200 },
        { x: 200, y: 180 },
        { x: 400, y: 220 },
        { x: 600, y: 190 },
        { x: 800, y: 210 }
      ];
    }
  }
  
  // Keep this for compatibility with existing code if needed
  generateCandlestickDataCompat() {
    const data = [];
    const basePrice = 720000;
    
    for (let i = 0; i < 80; i++) {
      const open = basePrice + Math.random() * 10000 - 5000;
      const close = open + Math.random() * 4000 - 2000;
      const high = Math.max(open, close) + Math.random() * 2000;
      const low = Math.min(open, close) - Math.random() * 2000;
      
      // Convert price to Y coordinate (higher price = lower Y)
      const openY = 300 - ((open - 700000) / 30000) * 200;
      const closeY = 300 - ((close - 700000) / 30000) * 200;
      const highY = 300 - ((high - 700000) / 30000) * 200;
      const lowY = 300 - ((low - 700000) / 30000) * 200;
      
      data.push({
        open, close, high, low,
        openY, closeY, highY, lowY,
        color: close > open ? '#00C9A7' : '#FF6B6B'
      });
    }
    
    return data;
  }
  
  // Make Math available in the template
  get Math() {
    return Math;
  }
  
  // Format large numbers for market cap display
  formatLargeNumber(num: number): string {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(2) + 'B';
    } else if (num >= 1000000) {
      return (num / 1000000).toFixed(2) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(2) + 'K';
    } else {
      return num.toString();
    }
  }
}
