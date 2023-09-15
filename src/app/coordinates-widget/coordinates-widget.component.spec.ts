import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinatesWidgetComponent } from './coordinates-widget.component';

describe('CoordinatesWidgetComponent', () => {
  let component: CoordinatesWidgetComponent;
  let fixture: ComponentFixture<CoordinatesWidgetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoordinatesWidgetComponent]
    });
    fixture = TestBed.createComponent(CoordinatesWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
