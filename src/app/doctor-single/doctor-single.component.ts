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

  constructor(private doctorsService: DoctorsService, private router: ActivatedRoute) {
    this.id = router.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.doctorsService.getDoctorById(this.id).pipe(
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

}
