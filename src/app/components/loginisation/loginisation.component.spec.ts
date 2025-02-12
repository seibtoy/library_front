import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginisationComponent } from './loginisation.component';

describe('RegistrationComponent', () => {
  let component: LoginisationComponent;
  let fixture: ComponentFixture<LoginisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginisationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
