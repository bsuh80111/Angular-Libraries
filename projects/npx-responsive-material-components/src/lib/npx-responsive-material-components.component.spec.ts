import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NpxResponsiveMaterialComponentsComponent } from './npx-responsive-material-components.component';

describe('NpxResponsiveMaterialComponentsComponent', () => {
  let component: NpxResponsiveMaterialComponentsComponent;
  let fixture: ComponentFixture<NpxResponsiveMaterialComponentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NpxResponsiveMaterialComponentsComponent]
    });
    fixture = TestBed.createComponent(NpxResponsiveMaterialComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
