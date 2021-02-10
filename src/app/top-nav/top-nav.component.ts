import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {

  constructor() {
  }

  hasToken = false;

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.hasToken = true;
    }
  }

  signOut() {
    if (this.hasToken == true) {
      localStorage.clear();
      setTimeout(() => {
        this.hasToken = false;
      });
    }
  }
}
