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
import { ApplicationComponent } from './application/application.component';


// Angular application routing:
const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomepageComponent},
  {path: 'login', component: LoginComponent},
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
    ApplicationComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
