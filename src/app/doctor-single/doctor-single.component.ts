import {Component, OnInit, Renderer2} from '@angular/core';
import {DoctorsService} from '../doctors.service';
import {ActivatedRoute} from '@angular/router';
import {catchError, finalize} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Component({
  selector: 'app-doctor-single',
  templateUrl: './doctor-single.component.html',
  styleUrls: ['./doctor-single.component.css']
})
export class DoctorSingleComponent implements OnInit {

  id;

  data;
  stars;

  constructor(private doctorsService: DoctorsService, private router: ActivatedRoute, private renderer: Renderer2) {
    this.id = router.snapshot.paramMap.get('id'); // get doctor id from route
  }

  ngOnInit(): void {
    this.doctorsService.getDoctorById(this.id).pipe( //get doctor detail by id
      catchError((err) => {
        console.log(err);
        window.alert(err.message);
        return throwError('');
      }),
      finalize(() => {
      })).subscribe(res => {
      console.log(res);
      this.data = res;
      this.stars = Array(this.data.stars).fill(1).map((i) => i);
    });
  }

  // tab config
  isDetail: boolean = true;

  isWeekDays: boolean = false;

  showTab(num) {
    if (num == 0) {
      this.isDetail = true;
      this.isWeekDays = false;
      this.renderer.addClass(document.getElementById('info_tab'), 'actv');
      this.renderer.removeClass(document.getElementById('info_tab'), 'non_actv');
      this.renderer.removeClass(document.getElementById('week_tab'), 'actv');
    }
    if (num == 1) {
      this.isDetail = false;
      this.isWeekDays = true;
      this.renderer.addClass(document.getElementById('week_tab'), 'actv');
      this.renderer.removeClass(document.getElementById('week_tab'), 'non_actv');
      this.renderer.removeClass(document.getElementById('info_tab'), 'actv');
    }

  }

}
