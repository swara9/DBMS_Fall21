import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellBtnRendererComponent } from './sell-btn-renderer.component';

describe('SellBtnRendererComponent', () => {
  let component: SellBtnRendererComponent;
  let fixture: ComponentFixture<SellBtnRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellBtnRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellBtnRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
