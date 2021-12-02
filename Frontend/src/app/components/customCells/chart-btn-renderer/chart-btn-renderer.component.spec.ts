import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartBtnRendererComponent } from './chart-btn-renderer.component';

describe('ChartBtnRendererComponent', () => {
  let component: ChartBtnRendererComponent;
  let fixture: ComponentFixture<ChartBtnRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartBtnRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartBtnRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
