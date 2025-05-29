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
  
  // Generate SVG path for the chart line
  generateChartPath(data: number[] | undefined): string {
    if (!data || data.length === 0) return '';
    
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
  
  // Generate SVG path for the chart area (filled area under the line)
  generateChartAreaPath(data: number[] | undefined): string {
    if (!data || data.length === 0) return '';
    
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
}
