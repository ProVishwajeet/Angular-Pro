import { Component, Input } from '@angular/core';
import { SnackbarService } from '../../services/snackbar.service';

interface MenuItem {
  name: string;
  icon: string;
  iconSrc: string;
  isActive?: boolean;
  hasSubmenu?: boolean;
  isSubmenuOpen?: boolean;
  submenuItems?: SubMenuItem[];
}

interface SubMenuItem {
  name: string;
  icon?: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  constructor(private snackbarService: SnackbarService) { }

  @Input() isOpen: boolean = true;
  
  menuItems: MenuItem[] = [
    { name: 'Dashboard', icon: 'home', iconSrc: 'Dashboard-icon.svg', isActive: true },
    { name: 'Exchange', icon: 'sync', iconSrc: 'Exchange.svg' },
    { 
      name: 'My Wallet', 
      icon: 'wallet', 
      iconSrc: 'My Wallet.svg',
      hasSubmenu: true, 
      isSubmenuOpen: false,
      submenuItems: [
        { name: 'Wallet Overview' },
        { name: 'Portfolio' },
        { name: 'Transaction History' },
        { name: 'Security Settings' },
        { name: 'Payment Methods' }
      ]
    },
    { name: 'Tradeview', icon: 'chart', iconSrc: 'Tradeview.svg' }
  ];
  
  serviceItems: MenuItem[] = [
    { 
      name: 'Transactions', 
      icon: 'bank',
      iconSrc: 'Transactions.svg',
      hasSubmenu: true,
      isSubmenuOpen: false,
      submenuItems: [
        { name: 'Buy & Sell Coin' },
        { name: 'Deposit Yen' },
        { name: 'Withdraw Yen' },
        { name: 'Send Coin' },
        { name: 'Receive Coin' },
        { name: 'Deposit Coin' }
      ]
    },
    { 
      name: 'Rewards', 
      icon: 'gift', 
      iconSrc: 'Rewards.svg',
      hasSubmenu: true,
      isSubmenuOpen: false,
      submenuItems: [
        { name: 'Earn Rewards' },
        { name: 'Referral Program' },
        { name: 'Staking Rewards' },
        { name: 'Claim Rewards' },
        { name: 'Reward History' }
      ]
    },
    { 
      name: 'Utility Plan', 
      icon: 'bulb', 
      iconSrc: 'Utility Plan.svg',
      hasSubmenu: true,
      isSubmenuOpen: false,
      submenuItems: [
        { name: 'Basic Plan' },
        { name: 'Premium Plan' },
        { name: 'Enterprise Plan' },
        { name: 'Plan Benefits' },
        { name: 'Upgrade Plan' }
      ]
    }
  ];
  
  accountItems: MenuItem[] = [
    { name: 'Notifications', icon: 'notification', iconSrc: 'Notifications.svg' },
    { name: 'Settings', icon: 'setting', iconSrc: 'Setting-white.svg' },
    { name: 'FAQ', icon: 'question', iconSrc: 'FAQs.svg' },
    { name: 'Log Out', icon: 'logout', iconSrc: 'Logout.svg' }
  ];
  
  toggleSubmenu(item: MenuItem): void {
    // Close all other open submenus first
    this.menuItems.forEach(menuItem => {
      if (menuItem !== item && menuItem.hasSubmenu) {
        menuItem.isSubmenuOpen = false;
      }
    });
    
    this.serviceItems.forEach(serviceItem => {
      if (serviceItem !== item && serviceItem.hasSubmenu) {
        serviceItem.isSubmenuOpen = false;
      }
    });
    
    // Toggle the clicked submenu
    item.isSubmenuOpen = !item.isSubmenuOpen;
    
    // Force change detection by triggering a state change
    setTimeout(() => {
      // This empty timeout forces Angular to re-render
    }, 0);
  }
  
  handleSubmenuItemClick(menuItem: string, submenuItem: string): void {
    this.snackbarService.showSnackbar(`${submenuItem} clicked`);
  }
}
