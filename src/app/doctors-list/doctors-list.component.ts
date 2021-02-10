import {Component, OnInit, Renderer2} from '@angular/core';
import {DoctorsService} from '../doctors.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.css']
})
export class DoctorsListComponent implements OnInit {

  text: string;


  spec: any;
  hasSpec: boolean = false;
  isSearch: boolean = false;

  constructor(public doctorsService: DoctorsService, private renderer: Renderer2, private route: ActivatedRoute) {
    if (route.snapshot.paramMap.get('text')) {
      this.isSearch = true;
      this.text = route.snapshot.paramMap.get('text');
    }
    if (route.snapshot.paramMap.get('type') == 'spec') {
      this.hasSpec = true;
      this.spec = route.snapshot.paramMap.get('id');
    }

    console.log(this.text);

  }

  doctors;

  stars = [];


  ngOnInit(): void {
    if (this.text == undefined && this.hasSpec == false && this.isSearch == false) {
      console.log(this.text);
      this.doctorsService.getDoctors().subscribe(res => {
        this.doctors = res;
        console.log(this.doctors);
        this.renderer.addClass(document.getElementById('fav-sort-btn').parentElement, 'active');
        for (let i = 0; i < this.doctors.length; i++) {
          this.stars.push(Array(this.doctors[i].stars).fill(1).map((i) => i));
        }
      });
    }
    if (this.hasSpec == true) {
      this.doctorsService.getDoctorBySpec(this.spec).subscribe(res => {
        this.doctors = res;
        this.renderer.addClass(document.getElementById('fav-sort-btn').parentElement, 'active');
        for (let i = 0; i < this.doctors.length; i++) {
          this.stars.push(Array(this.doctors[i].stars).fill(1).map((i) => i));
        }
      });
    } if (this.isSearch == true) {
      this.doctorsService.search(this.text).subscribe(res => {
        this.doctors = res;
        this.renderer.addClass(document.getElementById('fav-sort-btn').parentElement, 'active');
        for (let i = 0; i < this.doctors.length; i++) {
          this.stars.push(Array(this.doctors[i].stars).fill(1).map((i) => i));
        }
      });
    }
  }

  sort(data, type) {
    if (type == 1) {
      this.renderer.addClass(document.getElementById('user-sort-btn').parentElement, 'active');
      this.renderer.removeClass(document.getElementById('fav-sort-btn').parentElement, 'active');
      data.sort(function(a, b) {
        return b.user_percent - a.user_percent;
      });
    }
    if (type == 0) {
      this.renderer.removeClass(document.getElementById('user-sort-btn').parentElement, 'active');
      this.renderer.addClass(document.getElementById('fav-sort-btn').parentElement, 'active');
      data.sort(function(a, b) {
        return a.id - b.id;
      });
    }
  }

}
