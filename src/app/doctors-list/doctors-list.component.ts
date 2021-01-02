import {Component, OnInit} from '@angular/core';
import {DoctorsService} from '../doctors.service';

@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.css']
})
export class DoctorsListComponent implements OnInit {

  constructor(public doctorsService: DoctorsService) {
  }

  doctors;

  ngOnInit(): void {
    this.doctorsService.getDoctors().subscribe(res => {
      this.doctors = res;
      console.log(this.doctors);
    });
  }

}
