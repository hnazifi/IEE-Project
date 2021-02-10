import {Component, OnInit} from '@angular/core';
import {AuthService} from '../register/auth.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {
    this.registerForm = formBuilder.group({
      id: '',
      api_token: '',
      username: '',
      name: '',
      password: '',
      specialty_id: 1,
      nezam: '',
      online_pay: '',
      experience_years: '',
      address: '',
      phone: '',
      // image: '',
      // imageSource: '',
      // week_days: this.formBuilder.array([this.createDay()])
    });
  }

  createDay() {

  }

  registerForm: FormGroup;

  user: any;
  type: any;

  ngOnInit(): void {
    let token = localStorage.getItem('token');
    this.authService.getUsers().subscribe(res => {
      let users = res;
      this.user = res.find((x) => x.api_token == token);
      this.registerForm.patchValue(this.user);
      console.log(this.user);
      if (this.user.role == 1) {
        console.log('ss');
        this.type = 'doctor';
      } else {
        this.type = 'patient';
      }
      console.log(this.user);
    });

  }

  submit() {
    this.authService.putUser(this.registerForm.value).subscribe(res => {
      console.log(res);
      this.router.navigate(['/'])
    });
  }
}
