import { Component, OnInit } from '@angular/core';
import {DoctorsService} from '../../doctors.service';

@Component({
  selector: 'app-speciality',
  templateUrl: './speciality.component.html',
  styleUrls: ['./speciality.component.css']
})
export class SpecialityComponent implements OnInit {

  constructor(private doctorsService: DoctorsService) { }

  specs = []

  ngOnInit(): void {
    this.doctorsService.getSpec().subscribe(res => {
      console.log(res);
      this.specs = res
    })
  }

}
