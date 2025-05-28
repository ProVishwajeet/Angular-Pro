import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SnackbarService } from '../../../services/snackbar.service';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit, OnDestroy {
  message: string = '';
  isVisible: boolean = false;
  private subscription: Subscription = new Subscription();
  
  constructor(private snackbarService: SnackbarService) { }
  
  ngOnInit(): void {
    this.subscription.add(
      this.snackbarService.snackbarVisible$.subscribe(visible => {
        this.isVisible = visible;
      })
    );
    
    this.subscription.add(
      this.snackbarService.snackbarMessage$.subscribe(message => {
        this.message = message;
      })
    );
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  close(): void {
    this.snackbarService.hideSnackbar();
  }
}
