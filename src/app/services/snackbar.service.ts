import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private snackbarVisibleSubject = new BehaviorSubject<boolean>(false);
  private snackbarMessageSubject = new BehaviorSubject<string>('');
  
  public snackbarVisible$: Observable<boolean> = this.snackbarVisibleSubject.asObservable();
  public snackbarMessage$: Observable<string> = this.snackbarMessageSubject.asObservable();
  
  constructor() { }
  
  showSnackbar(message: string, duration: number = 3000): void {
    this.snackbarMessageSubject.next(message);
    this.snackbarVisibleSubject.next(true);
    
    setTimeout(() => {
      this.snackbarVisibleSubject.next(false);
    }, duration);
  }
  
  hideSnackbar(): void {
    this.snackbarVisibleSubject.next(false);
  }
}
