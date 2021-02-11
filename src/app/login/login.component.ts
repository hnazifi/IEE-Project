import {Component, OnInit} from '@angular/core';
import {AuthService} from '../register/auth.service';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

  username: string;
  password: string;

  onSubmit() {
    console.log(this.username);
    this.service.postLogin({
      username: this.username,
      password: this.password
    }).pipe(
      catchError((err) => {
        console.log(err);
        window.alert('خطا');
        return throwError('');
      })).subscribe(res => {
      localStorage.setItem('token', res['api_token']);
      console.log(res);
      this.router.navigate(['/']);
    });
  }
}
