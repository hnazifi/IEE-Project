import {Component, OnInit} from '@angular/core';
import {DoctorsService} from '../doctors.service';

@Component({
  selector: 'app-specialities',
  templateUrl: './specialities.component.html',
  styleUrls: ['./specialities.component.css']
})
export class SpecialitiesComponent implements OnInit {

  constructor(private doctorsService: DoctorsService) {
  }

  specs = [];


  ngOnInit(): void {
    this.doctorsService.getSpec().subscribe(res => {
      console.log(res);
      this.specs = res;
    });
  }

}
