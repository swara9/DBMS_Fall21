import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-buy-btn-renderer',
  templateUrl: './buy-btn-renderer.component.html',
  styleUrls: ['./buy-btn-renderer.component.css']
})
export class BuyBtnRendererComponent implements ICellRendererAngularComp{
  private params: any;

  constructor(){ }

  agInit(params: any): void {
    this.params = params;
  }

  btnClickedHandler() {
    console.log("buy works!")
  }

  refresh(params?: any): boolean {
      return true;
    }

}
