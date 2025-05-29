import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() isSidebarOpen: boolean = true;
  @Output() toggleSidebar = new EventEmitter<void>();
  
  notificationCount: number = 2;

  constructor(private snackbarService: SnackbarService) {}

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

  showSnackbar(message: string): void {
    this.snackbarService.showSnackbar(message);
  }
}
