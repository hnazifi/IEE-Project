import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HomepageComponent} from './homepage/homepage.component';
import {CommentsComponent} from './homepage/comments/comments.component';
import {CoronaComponent} from './homepage/corona/corona.component';
import {HomeFooterComponent} from './homepage/home-footer/home-footer.component';
import {SliderComponent} from './homepage/slider/slider.component';
import {SpecialityComponent} from './homepage/speciality/speciality.component';
import {TopNavComponent} from './top-nav/top-nav.component';
import {LoginComponent} from './login/login.component';
import {RouterModule, Routes} from '@angular/router';
import {ApplicationComponent} from './application/application.component';
import {SpecialitiesComponent} from './specialities/specialities.component';
import {CarouselComponent} from './specialities/carousel/carousel.component';
import {FooterComponent} from './footer/footer.component';
import {DoctorsListComponent} from './doctors-list/doctors-list.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { DoctorSingleComponent } from './doctor-single/doctor-single.component';


// Angular application routing:
const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  //home page component
  {path: 'home', component: HomepageComponent},
  //login page component
  {path: 'login', component: LoginComponent},
  //specialities component
  {path: 'specialities', component: SpecialitiesComponent},
  //doctors page component
  {path: 'doctors', component: DoctorsListComponent},
  //doctor page by id
  {path: 'doctor/:id', component: DoctorSingleComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    CommentsComponent,
    CoronaComponent,
    HomeFooterComponent,
    SliderComponent,
    SpecialityComponent,
    TopNavComponent,
    LoginComponent,
    ApplicationComponent,
    SpecialitiesComponent,
    CarouselComponent,
    FooterComponent,
    DoctorsListComponent,
    DoctorSingleComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
