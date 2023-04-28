import { Component } from '@angular/core';

@Component({
  selector: 'main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
  host: {
    class: 'full',
  },
})
export class MainHeaderComponent {
  toggleMenu() {
    console.log('toggled');
  }
}
