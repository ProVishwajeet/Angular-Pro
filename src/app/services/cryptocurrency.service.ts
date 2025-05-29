import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Cryptocurrency } from '../models/cryptocurrency.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CryptocurrencyService {
  private apiUrl = `${environment.apiUrl}/cryptocurrencies`;

  constructor(private http: HttpClient) { }

  getCryptocurrencies(): Observable<Cryptocurrency[]> {
    // For development purposes, use mock data directly to avoid database setup issues
    console.log('Using mock cryptocurrency data');
    return this.getMockCryptocurrencies();
    
    // Uncomment this when database is properly set up
    /*
    return this.http.get<Cryptocurrency[]>(this.apiUrl)
      .pipe(
        catchError((error) => {
          console.error('API connection error:', error);
          console.log('Falling back to mock data');
          return this.getMockCryptocurrencies();
        })
      );
    */
  }

  getCryptocurrencyById(id: number): Observable<Cryptocurrency> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Cryptocurrency>(url)
      .pipe(
        catchError(this.handleError<Cryptocurrency>(`getCryptocurrency id=${id}`))
      );
  }

  // For development/testing purposes, use mock data if API is not available
  getMockCryptocurrencies(): Observable<Cryptocurrency[]> {
    // Generate dynamic chart data based on price changes
    const generateChartData = (baseValue: number, percentChange: number): number[] => {
      const points = 20;
      const result = [];
      let currentValue = baseValue * 0.9; // Start slightly below
      
      for (let i = 0; i < points; i++) {
        // Create more volatility at the beginning, then trend toward final value
        const volatility = Math.max(0.5, (points - i) / points) * 3;
        const randomFactor = (Math.random() - 0.5) * volatility;
        
        // For negative percent change, trend downward, otherwise trend upward
        const trendFactor = percentChange >= 0 ? 
          (i / points) * Math.abs(percentChange) / 100 : 
          -(i / points) * Math.abs(percentChange) / 100;
        
        currentValue = currentValue * (1 + randomFactor / 100 + trendFactor);
        result.push(currentValue);
      }
      
      return result;
    };

    const mockData: Cryptocurrency[] = [
      {
        id: 1,
        name: 'Bitcoin',
        symbol: 'BTC',
        price: 721882,
        percentChange: -4.66,
        marketCap: 13984762345600,
        volume24h: 1234567890,
        circulatingSupply: 19000000,
        chartData: generateChartData(721882, -4.66)
      },
      {
        id: 2,
        name: 'Ethereum',
        symbol: 'ETH',
        price: 22370,
        percentChange: 0.45,
        marketCap: 2698765432100,
        volume24h: 987654321,
        circulatingSupply: 120000000,
        chartData: generateChartData(22370, 0.45)
      },
      {
        id: 3,
        name: 'NEM',
        symbol: 'XEM',
        price: 10.604,
        percentChange: -0.07,
        marketCap: 95432167800,
        volume24h: 543216789,
        circulatingSupply: 9000000000,
        chartData: generateChartData(10.604, -0.07)
      },
      {
        id: 4,
        name: 'Ripple',
        symbol: 'XRP',
        price: 50.839,
        percentChange: 0.66,
        marketCap: 508390000000,
        volume24h: 321654987,
        circulatingSupply: 10000000000,
        chartData: generateChartData(50.839, 0.66)
      },
      {
        id: 5,
        name: 'Cardano',
        symbol: 'ADA',
        price: 42.75,
        percentChange: 1.24,
        marketCap: 149625000000,
        volume24h: 287654321,
        circulatingSupply: 3500000000,
        chartData: generateChartData(42.75, 1.24)
      }
    ];

    return of(mockData);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      
      // For development purposes, use mock data if API fails
      if (operation === 'getCryptocurrencies') {
        console.log('Falling back to mock data');
        return this.getMockCryptocurrencies() as Observable<any>;
      }
      
      // Let the app keep running by returning an empty result
      return of(result as T);
    };
  }
}
