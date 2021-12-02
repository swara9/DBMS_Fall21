import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpService } from '../../services/http-service.service';

@Component({
  selector: 'app-trade-modal',
  templateUrl: './trade-modal.component.html',
  styleUrls: ['./trade-modal.component.css']
})
export class TradeModalComponent implements OnInit {

  data:any;
  
  constructor(
    private dialogRef: MatDialogRef<TradeModalComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private http: HttpService
    ) { 
      this.data = data;
    }

  ngOnInit(): void {
    console.log("from trade modal "+ this.data.symbol)

  }

  close() {
    this.dialogRef.close();
  }
}
