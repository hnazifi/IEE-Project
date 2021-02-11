import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {

  constructor(public http: HttpClient) {
  }

  getDoctors() {
    return this.http.get<any[]>(environment.endPoint + '/user');
  }

  getDoctorById(id) {
    return this.http.get(environment.endPoint + '/user/' + id);
  }

  postComment(data) {
    return this.http.post(environment.endPoint + '/comment/store', data, {
      observe: 'body'
    });
  }

  search(data) {
    return this.http.get<any[]>(environment.endPoint + '/user/search/' + data);
  }

  getSpec() {
    return this.http.get<any[]>(environment.endPoint + '/specialty');
  }

  getDoctorBySpec(id) {
    return this.http.get<any[]>(environment.endPoint + '/user/specialty/' + id);
  }

  getUserById(id) {
    return this.http.get(environment.endPoint + '/user/' + id);
  }

  getSpecById(id) {
    return this.http.get(environment.endPoint + '/specialty/' + id);
  }

  postReserve(doctor, patient, date) {
    return this.http.post(environment.endPoint + '/reserve/' + doctor + '/' + patient + '/' + date, {});
  }
}
