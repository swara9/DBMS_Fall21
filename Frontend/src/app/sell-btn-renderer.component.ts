import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Router } from '@angular/router';

@Component({
    selector: 'sell-btn-renderer',
    template: `
      <button class="btnsell" (click)="btnClickedHandler()">Sell</button>
    `,
  })
  export class SellBtnRenderer implements ICellRendererAngularComp{
    private params: any;

    constructor(private router: Router){ }

    agInit(params: any): void {
      this.params = params;
    }
  
    btnClickedHandler() {
      //this.params.clicked(this.params.value);
      const navigationDetails: string[] = ['/trade'];
      if(this.params.length) {
        navigationDetails.push(this.params);
      }
      this.router.navigate(navigationDetails);
    }
    refresh(params?: any): boolean {
        return true;
      }
  }