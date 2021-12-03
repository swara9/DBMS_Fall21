import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyBtnRendererComponent } from './buy-btn-renderer.component';

describe('BuyBtnRendererComponent', () => {
  let component: BuyBtnRendererComponent;
  let fixture: ComponentFixture<BuyBtnRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyBtnRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyBtnRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
