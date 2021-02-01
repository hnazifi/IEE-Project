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
    return this.http.get(environment.mainEndPoint + '/doctors');
  }

  getDoctorById(id){
    return this.http.get(environment.mainEndPoint + '/doctors/' + id)
  }
}
