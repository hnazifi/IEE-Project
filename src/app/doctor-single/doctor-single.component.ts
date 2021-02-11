import {Component, Inject, OnInit, Renderer2} from '@angular/core';
import {DoctorsService} from '../doctors.service';
import {ActivatedRoute, Router} from '@angular/router';
import {catchError, finalize} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AuthService} from '../register/auth.service';
import * as moment from 'jalali-moment';


@Component({
  selector: 'app-doctor-single',
  templateUrl: './doctor-single.component.html',
  styleUrls: ['./doctor-single.component.css']
})
export class DoctorSingleComponent implements OnInit {

  id;

  data;
  comments = [];
  days = [];
  stars = []

  firstTime;

  commenter: any[] = []

  constructor(private doctorsService: DoctorsService, private router: ActivatedRoute, private renderer: Renderer2,
              public dialog: MatDialog) {
    this.id = router.snapshot.paramMap.get('id'); // get doctor id from route
  }


  ngOnInit(): void {
    this.reload();
  }


  spec_name: string


  reload() {
    this.doctorsService.getDoctorById(this.id).pipe( //get doctor detail by id
      catchError((err) => {
        console.log(err);
        window.alert(err.message);
        return throwError('');
      }),
      finalize(() => {
      })).subscribe(res => {
      this.data = res['user'];
      this.doctorsService.getSpecById(this.data.specialty_id).subscribe(res => {
        console.log(res);
        this.spec_name = res[0].name
        console.log(this.spec_name);
      })
      this.comments = res['comments'];

      for (let i = 0 ; i < this.comments.length; i++){
        this.stars.push(Array(this.comments[i].rating).fill(1).map((i) => i));

        this.doctorsService.getUserById(this.comments[i].patient_id).subscribe(res => {
          this.commenter.push(res)
        })
      }

      for (let i in res['days']) {
        if (res['days'][i] == 1) {
          this.firstTime = moment(i, 'YYYY:MM:DD').locale('fa').format('YYYY/MM/DD');
          break;
        }
      }
      for (let i in res['days']) {
        this.days.push({date: moment(i, 'YYYY:MM:DD').locale('fa').format('YYYY/MM/DD'), valid: res['days'][i]});
      }
      console.log(this.days);

      console.log(this.firstTime);
      console.log(this.comments);
      this.data.week_days = JSON.parse(this.data.week_days);
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

  addComment() {
    const dialogRef = this.dialog.open(CommentDialog, {
      width: '550px',
      data: {id: this.data.id}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'added'){
        this.reload()
      }
    });
  }
}

@Component({
  selector: 'CommentDialog',
  templateUrl: 'comment.html',
})
export class CommentDialog {

  constructor(
    public dialogRef: MatDialogRef<CommentDialog>,
    private doctorsService: DoctorsService,
    private authService: AuthService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    let token = localStorage.getItem('token');
    this.authService.getUsers().subscribe(res => {
      console.log(res);
      this.patient = res.find((x) => x.api_token == token);
      console.log(this.patient);
    });
  }

  patient;
  comment: string = '';
  rating;

  onSubmit(): void {
    console.log(this.comment);
    if (!this.patient){
      this.dialogRef.close()
     this.router.navigate(['/login'])
    }
    else {
      this.doctorsService.postComment({
        comment: this.comment,
        doctor_id: this.data.id,
        patient_id: this.patient['id'],
        rating: this.rating
      }).subscribe(res => {
        console.log(res);
        this.dialogRef.close('added');
      });
    }

  }
}
