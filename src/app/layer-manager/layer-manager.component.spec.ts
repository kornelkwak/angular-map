import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayerManagerComponent } from './layer-manager.component';

describe('LayerManagerComponent', () => {
  let component: LayerManagerComponent;
  let fixture: ComponentFixture<LayerManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LayerManagerComponent]
    });
    fixture = TestBed.createComponent(LayerManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
