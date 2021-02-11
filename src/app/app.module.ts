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
import {CommentDialog, DoctorSingleComponent} from './doctor-single/doctor-single.component';
import {CrystalLightboxModule} from '@crystalui/angular-lightbox';
import {RegisterComponent} from './register/register.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatOptionModule} from '@angular/material/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {ProfileComponent} from './profile/profile.component';
import {MatDialogModule} from '@angular/material/dialog';
import {JalaliPipe} from './jalali.pipe';
import {MatSliderModule} from '@angular/material/slider';
import { JalaliDatePipe } from './jalali-date.pipe';


// Angular application routing:
const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  //home page component
  {path: 'home', component: HomepageComponent},
  //login page component
  {path: 'login', component: LoginComponent},
  //register
  {path: 'register/:type', component: RegisterComponent},
  //specialities component
  {path: 'specialities', component: SpecialitiesComponent},
  //doctors page component
  {path: 'doctors', component: DoctorsListComponent},

  {path: 'doctors/query/:text', component: DoctorsListComponent},

  {path: 'doctors/spec/:type/:id', component: DoctorsListComponent},


  //doctor page by id
  {path: 'doctor/:id', component: DoctorSingleComponent},
  {path: 'profile', component: ProfileComponent}
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
    DoctorSingleComponent,
    RegisterComponent,
    ProfileComponent,
    JalaliPipe,
    CommentDialog,
    JalaliDatePipe,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    CrystalLightboxModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSliderModule,
    MatOptionModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
