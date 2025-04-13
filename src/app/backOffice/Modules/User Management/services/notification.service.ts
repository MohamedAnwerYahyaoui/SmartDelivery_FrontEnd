import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  

  showSuccess(message: string): void {
    this.showNotification(message, 'bg-green-500');
  }

  showError(message: string): void {
    this.showNotification(message, 'bg-red-500');
  }

  private showNotification(message: string, bgColor: string): void {
    // Create the notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-16 right-4 p-4 text-white rounded-md shadow-lg ${bgColor}`;
    notification.textContent = message;
  
    // Find the <main> element
    const mainElement = document.querySelector('main#main');
  
    if (mainElement) {
      // Append the notification to the <main> element
      mainElement.appendChild(notification);
  
      // Remove notification after 3 seconds
      setTimeout(() => {
        mainElement.removeChild(notification);
      }, 3000);
    } else {
      console.error('Could not find <main id="main"> element');
    }
  }
  
}