import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  getSpec() {
    return this.http.get(environment.endPoint + '/specialty');
  }

  postRegister(data) {
    return this.http.post(environment.endPoint + '/signup', data);
  }

  postLogin(data) {
    return this.http.post(environment.endPoint + '/login', data);
  }
}
