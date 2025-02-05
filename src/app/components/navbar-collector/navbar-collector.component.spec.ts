import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarCollectorComponent } from './navbar-collector.component';

describe('NavbarCollectorComponent', () => {
  let component: NavbarCollectorComponent;
  let fixture: ComponentFixture<NavbarCollectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarCollectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarCollectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
