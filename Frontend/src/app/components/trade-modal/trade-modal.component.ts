import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpService } from '../../services/http-service.service';

@Component({
  selector: 'app-trade-modal',
  templateUrl: './trade-modal.component.html',
  styleUrls: ['./trade-modal.component.css']
})
export class TradeModalComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<TradeModalComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private http: HttpService
    ) { }

  ngOnInit(): void {
  }

}
