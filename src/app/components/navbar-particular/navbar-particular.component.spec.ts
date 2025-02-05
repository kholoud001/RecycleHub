import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarParticularComponent } from './navbar-particular.component';

describe('NavbarParticularComponent', () => {
  let component: NavbarParticularComponent;
  let fixture: ComponentFixture<NavbarParticularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarParticularComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarParticularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
