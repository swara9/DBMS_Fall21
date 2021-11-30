import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Router } from '@angular/router';

@Component({
    selector: 'chart-btn-renderer',
    template: `
      <button class="btnchart" (click)="btnClickedHandler()">Click me!</button>
    `,
  })
  export class ChartBtnRenderer implements ICellRendererAngularComp{
    private params: any;

    constructor(private router: Router){ }

    agInit(params: any): void {
      this.params = params;
    }
  
    btnClickedHandler() {
      //this.params.clicked(this.params.value);
      const navigationDetails: string[] = ['/chart'];
      if(this.params.length) {
        navigationDetails.push(this.params);
      }
      this.router.navigate(navigationDetails);
    }
    refresh(params?: any): boolean {
        return true;
      }
  }