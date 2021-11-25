import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-chart-modal',
  templateUrl: './chart-modal.component.html',
  styleUrls: ['./chart-modal.component.css']
})

export class ChartModalComponent implements OnInit {

  message: string;
  
  constructor(
    private dialogRef: MatDialogRef<ChartModalComponent>,
    @Inject(MAT_DIALOG_DATA) data: any) { 
      this.message = data.message;
    }

  ngOnInit(): void {
  }

  
  close() {
    this.dialogRef.close();
}

}
