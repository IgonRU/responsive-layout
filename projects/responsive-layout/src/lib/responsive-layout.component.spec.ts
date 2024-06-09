import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IgonResponsiveLayoutComponent } from './responsive-layout.component';

describe('IgonResponsiveLayoutComponent', () => {
  let component: IgonResponsiveLayoutComponent;
  let fixture: ComponentFixture<IgonResponsiveLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IgonResponsiveLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IgonResponsiveLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
