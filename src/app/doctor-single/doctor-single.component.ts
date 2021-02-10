import {Component, Inject, OnInit, Renderer2} from '@angular/core';
import {DoctorsService} from '../doctors.service';
import {ActivatedRoute} from '@angular/router';
import {catchError, finalize} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AuthService} from '../register/auth.service';

@Component({
  selector: 'app-doctor-single',
  templateUrl: './doctor-single.component.html',
  styleUrls: ['./doctor-single.component.css']
})
export class DoctorSingleComponent implements OnInit {

  id;

  data;
  comments = [];
  stars;

  constructor(private doctorsService: DoctorsService, private router: ActivatedRoute, private renderer: Renderer2,
              public dialog: MatDialog) {
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
      this.data = res['user'];
      this.comments = res['comments'];
      console.log(this.comments);
      this.data.week_days = JSON.parse(this.data.week_days);

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

  addComment() {
    const dialogRef = this.dialog.open(CommentDialog, {
      width: '250px',
      data: {id: this.data.id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
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
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    let token = localStorage.getItem('token');
    this.authService.getUsers().subscribe(res => {
      console.log(res);
      this.patient = res.find((x) => x.api_token == token);
      console.log(this.patient);
    });
  }

  patient: string;
  comment: string = '';

  onSubmit(): void {
    console.log(this.comment);
    this.doctorsService.postComment({
      comment: this.comment,
      doctor_id: this.data.id,
      patient_id: this.patient['id'],
      rating: 1

    }).subscribe(res => {
      console.log(res);
      this.dialogRef.close();

    });
  }
}
