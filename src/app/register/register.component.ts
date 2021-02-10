import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from './auth.service';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  type: string;
  header: string;
  specs: any;

  weekDays = ['شنبه', 'یک شنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنج شنبه', 'جمعه'];
  weekControl = new FormControl();

  registerForm: FormGroup;

  constructor(private route: ActivatedRoute, private service: AuthService, private formBuilder: FormBuilder, private router: Router) {
    this.type = this.route.snapshot.paramMap.get('type');

    if (this.type == 'doctor') {
      this.header = 'دکتر';
    }
    if (this.type == 'patient') {
      this.header = 'بیمار';
    }

    this.registerForm = formBuilder.group({
      username: '',
      name: '',
      password: '',
      spec: '',
      number: '',
      online_pay: '',
      experience_years: '',
      address: '',
      phone: '',
      image: '',
      imageSource: '',
      week_days: this.formBuilder.array([this.createDay()])
    });
  }

  createDay(): FormControl {
    return this.formBuilder.control('');
  }

  ngOnInit(): void {

    this.week = <FormArray> this.registerForm.controls['week_days'] as FormArray;
    for (let i = 0; i < 6; i++) {
      this.weeks.push(this.createDay());
    }

    this.service.getSpec().subscribe(res => {
      console.log(res);
      this.specs = res;
    });
  }

  week: FormArray;

  get weeks(): FormArray {
    return this.registerForm.get('week_days') as FormArray;
  }

  submit() {
    const formData = new FormData();
    formData.append('image', this.registerForm.get('imageSource').value);
    formData.append('username', this.registerForm.get('username').value);
    formData.append('name', this.registerForm.get('name').value);
    formData.append('password', this.registerForm.get('password').value);
    formData.append('spec', this.registerForm.get('spec').value);
    formData.append('number', this.registerForm.get('number').value);
    formData.append('address', this.registerForm.get('address').value);
    formData.append('experience_years', this.registerForm.get('experience_years').value);
    formData.append('phone', this.registerForm.get('phone').value);
    formData.append('online_pay', this.registerForm.get('online_pay').value);
    if (this.type == 'doctor') {
      formData.append('role', String(1));
    }
    if (this.type == 'patient') {
      formData.append('role', String(0));
    }

    console.log(this.weekControl.value);

    if (this.type == 'doctor') {
      for (let i = 0; i < 14; i++) {
        console.log(this.weekControl.value);
        if (this.weekControl.value.find((x) => x == 'شنبه')) {
          this.week.at(0).patchValue(true);
        } else {
          this.week.at(0).patchValue(false);

        }
        if (this.weekControl.value.find((x) => x == 'یک شنبه')) {
          this.week.at(1).patchValue(true);
        } else {
          this.week.at(1).patchValue(false);

        }

        if (this.weekControl.value.find((x) => x == this.weekDays[2])) {
          this.week.at(2).patchValue(true);
        } else {
          this.week.at(2).patchValue(false);

        }

        if (this.weekControl.value.find((x) => x == this.weekDays[3])) {
          this.week.at(3).patchValue(true);
        } else {
          this.week.at(3).patchValue(false);

        }

        if (this.weekControl.value.find((x) => x == this.weekDays[4])) {
          this.week.at(4).patchValue(true);
        } else {
          this.week.at(4).patchValue(false);

        }

        if (this.weekControl.value.find((x) => x == this.weekDays[5])) {
          this.week.at(5).patchValue(true);
        } else {
          this.week.at(5).patchValue(false);

        }

        if (this.weekControl.value.find((x) => x == this.weekDays[6])) {
          this.week.at(6).patchValue(true);
        } else {
          this.week.at(6).patchValue(false);
          break;
        }
      }


      for (let i = 0; i < this.registerForm.get('week_days').value.length; i++) {
        formData.append('week_days[]', this.weeks.at(i).value);
      }
    }


    this.service.postRegister(formData).pipe(catchError((err) => {
      console.log(err);
      window.alert('خطا');
      return throwError('');
    })).subscribe(res => {
      console.log(res);
      localStorage.setItem('token', res['api_token'])
      this.router.navigate(['/'])

    });

  }

  onFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.registerForm.patchValue({
        imageSource: file
      });
    }
  }
}
