import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorSingleComponent } from './doctor-single.component';

describe('DoctorSingleComponent', () => {
  let component: DoctorSingleComponent;
  let fixture: ComponentFixture<DoctorSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorSingleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
