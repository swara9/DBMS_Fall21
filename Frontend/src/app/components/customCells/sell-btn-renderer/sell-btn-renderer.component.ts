import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-sell-btn-renderer',
  templateUrl: './sell-btn-renderer.component.html',
  styleUrls: ['./sell-btn-renderer.component.css']
})
export class SellBtnRendererComponent implements ICellRendererAngularComp{
  private params: any;

  constructor(){ }

  agInit(params: any): void {
    this.params = params;
  }

  btnClickedHandler() {
    console.log("Sell Works!")
  }
  
  refresh(params?: any): boolean {
      return true;
    }
}