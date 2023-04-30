import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
  host: {
    class: 'full',
  },
})
export class MainHeaderComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  isNavOpen: boolean = false;

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isNavOpen = false;
      }
    });
  }

  toggleMenu() {
    this.isNavOpen = !this.isNavOpen;
  }
}
