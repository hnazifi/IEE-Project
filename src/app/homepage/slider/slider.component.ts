import {Component, OnInit} from '@angular/core';
import {DoctorsService} from '../../doctors.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  constructor(private doctorService: DoctorsService, private router: Router) {
  }

  text;
  ids = []

  ngOnInit(): void {
  }

  onSearch() {
    this.doctorService.search(this.text).subscribe(res => {
      console.log(res);

      if (res.length > 1){
        for (let i = 0 ; i < res.length; i++){
           this.ids.push(res[i].id)
        }
        console.log(this.ids);
        this.router.navigate(['/doctors/query', this.text ])
      }
      else this.router.navigate(['/doctor/', res[0].id])
    });
  }
}
