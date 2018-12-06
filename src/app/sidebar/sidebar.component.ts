import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit {
  route: any;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.router.events.subscribe((val) => {
      this.route = this.location.path();
    });
  }

  closeMenu() {
    document.getElementById('sidebar').classList.remove('opened');
  }

  navTo(slug) {
    this.router.navigate(['', slug])
    this.closeMenu()
  }

}
